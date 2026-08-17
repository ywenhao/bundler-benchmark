import { spawn } from 'node:child_process'
import { createRequire } from 'node:module'
import { cpus, freemem, platform, release, totalmem } from 'node:os'
import { dirname, extname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { gzipSync } from 'node:zlib'
import { mkdir, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises'
import { performance } from 'node:perf_hooks'

const require = createRequire(import.meta.url)
const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const resultDir = join(rootDir, 'benchmark-results')
const textExtensions = new Set(['.ts', '.tsx', '.mjs', '.css', '.html', '.json', '.md'])

function readNumberArgument(name, fallback) {
  const direct = process.argv.find((argument) => argument.startsWith(`--${name}=`))
  if (direct) return Number(direct.slice(name.length + 3))
  const index = process.argv.indexOf(`--${name}`)
  if (index >= 0 && process.argv[index + 1]) return Number(process.argv[index + 1])
  return fallback
}

const runs = Math.max(1, readNumberArgument('runs', 5))
const warmups = Math.max(0, readNumberArgument('warmups', 1))
const timeoutMs = Math.max(10_000, readNumberArgument('timeout', 120_000))

async function readPackage(packageName) {
  const packagePath = require.resolve(`${packageName}/package.json`)
  return {
    path: packagePath,
    data: JSON.parse(await readFile(packagePath, 'utf8')),
  }
}

async function resolvePackageBin(packageName, binName) {
  const packageInfo = await readPackage(packageName)
  const bin = packageInfo.data.bin
  const relativeBin = typeof bin === 'string' ? bin : bin?.[binName]
  if (!relativeBin) throw new Error(`Could not find the ${binName} binary in ${packageName}`)
  return resolve(dirname(packageInfo.path), relativeBin)
}

const [viteBin, webpackBin, rspackBin] = await Promise.all([
  resolvePackageBin('vite', 'vite'),
  resolvePackageBin('webpack', 'webpack'),
  resolvePackageBin('@rspack/cli', 'rspack'),
])

const bundlers = [
  {
    id: 'vite',
    label: 'Vite',
    bin: viteBin,
    dist: join(rootDir, 'dist/vite'),
    buildArgs: ['build', '--config', 'vite.config.ts'],
    devArgs: (port) => ['--config', 'vite.config.ts', '--host', '127.0.0.1', '--port', String(port), '--strictPort'],
  },
  {
    id: 'rspack',
    label: 'Rspack',
    bin: rspackBin,
    dist: join(rootDir, 'dist/rspack'),
    buildArgs: ['build', '--config', 'rspack.config.mjs', '--mode', 'production'],
    devArgs: (port) => ['serve', '--config', 'rspack.config.mjs', '--mode', 'development', '--env', `port=${port}`],
  },
  {
    id: 'webpack',
    label: 'Webpack',
    bin: webpackBin,
    dist: join(rootDir, 'dist/webpack'),
    buildArgs: ['--config', 'webpack.config.mjs', '--mode', 'production'],
    devArgs: (port) => ['serve', '--config', 'webpack.config.mjs', '--mode', 'development', '--env', `port=${port}`],
  },
]

function rotate(values, offset) {
  return values.map((_, index) => values[(index + offset) % values.length])
}

function summarize(samples) {
  const ordered = [...samples].sort((a, b) => a - b)
  const middle = Math.floor(ordered.length / 2)
  const median = ordered.length % 2 === 0 ? (ordered[middle - 1] + ordered[middle]) / 2 : ordered[middle]
  const mean = ordered.reduce((sum, value) => sum + value, 0) / ordered.length
  const variance = ordered.reduce((sum, value) => sum + (value - mean) ** 2, 0) / ordered.length
  return {
    samples: samples.map((value) => Math.round(value * 10) / 10),
    medianMs: Math.round(median * 10) / 10,
    meanMs: Math.round(mean * 10) / 10,
    minMs: Math.round(ordered[0] * 10) / 10,
    maxMs: Math.round(ordered.at(-1) * 10) / 10,
    standardDeviationMs: Math.round(Math.sqrt(variance) * 10) / 10,
  }
}

function collectOutput(child) {
  let stdout = ''
  let stderr = ''
  child.stdout?.on('data', (chunk) => {
    stdout = (stdout + chunk.toString()).slice(-24_000)
  })
  child.stderr?.on('data', (chunk) => {
    stderr = (stderr + chunk.toString()).slice(-24_000)
  })
  return () => ({ stdout, stderr })
}

function waitForExit(child) {
  return new Promise((resolveExit, rejectExit) => {
    child.once('error', rejectExit)
    child.once('close', (code, signal) => resolveExit({ code, signal }))
  })
}

async function terminate(child) {
  if (child.exitCode !== null || child.signalCode !== null) return
  child.kill('SIGTERM')
  const closed = await Promise.race([
    waitForExit(child).then(() => true),
    new Promise((resolveTimeout) => setTimeout(() => resolveTimeout(false), 2_500)),
  ])
  if (closed || !child.pid) return

  await new Promise((resolveKill) => {
    const killer = spawn('taskkill.exe', ['/PID', String(child.pid), '/T', '/F'], {
      windowsHide: true,
      stdio: 'ignore',
    })
    killer.once('close', resolveKill)
    killer.once('error', resolveKill)
  })
}

async function runCommand(bin, args, timeout = timeoutMs) {
  const child = spawn(process.execPath, [bin, ...args], {
    cwd: rootDir,
    env: { ...process.env, BROWSERSLIST_IGNORE_OLD_DATA: 'true', NO_COLOR: '1' },
    stdio: ['ignore', 'pipe', 'pipe'],
    windowsHide: true,
  })
  const output = collectOutput(child)
  const timer = setTimeout(() => terminate(child), timeout)
  const result = await waitForExit(child)
  clearTimeout(timer)

  if (result.code !== 0) {
    const captured = output()
    throw new Error(
      `Command failed: ${relative(rootDir, bin)} ${args.join(' ')}\n${captured.stdout}\n${captured.stderr}`,
    )
  }
}

async function measureBuild(bundler) {
  await rm(bundler.dist, { recursive: true, force: true })
  const startedAt = performance.now()
  await runCommand(bundler.bin, bundler.buildArgs)
  return performance.now() - startedAt
}

async function waitForHttp(url, child, output) {
  const deadline = performance.now() + timeoutMs
  while (performance.now() < deadline) {
    if (child.exitCode !== null) {
      const captured = output()
      throw new Error(`Dev server exited before becoming ready.\n${captured.stdout}\n${captured.stderr}`)
    }

    try {
      const response = await fetch(url, {
        cache: 'no-store',
        signal: AbortSignal.timeout(700),
      })
      if (response.ok) {
        const html = await response.text()
        if (html.includes('id="root"')) return
      }
    } catch {
      // The server is still starting.
    }
    await new Promise((resolveDelay) => setTimeout(resolveDelay, 20))
  }
  const captured = output()
  throw new Error(`Timed out waiting for ${url}.\n${captured.stdout}\n${captured.stderr}`)
}

async function measureDevStart(bundler, port) {
  const startedAt = performance.now()
  const child = spawn(process.execPath, [bundler.bin, ...bundler.devArgs(port)], {
    cwd: rootDir,
    env: { ...process.env, BROWSERSLIST_IGNORE_OLD_DATA: 'true', NO_COLOR: '1' },
    stdio: ['ignore', 'pipe', 'pipe'],
    windowsHide: true,
  })
  const output = collectOutput(child)

  try {
    await waitForHttp(`http://127.0.0.1:${port}/`, child, output)
    return performance.now() - startedAt
  } finally {
    await terminate(child)
  }
}

async function walkFiles(directory) {
  const files = []
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const fullPath = join(directory, entry.name)
    if (entry.isDirectory()) files.push(...await walkFiles(fullPath))
    else files.push(fullPath)
  }
  return files
}

async function collectSize(directory) {
  const files = await walkFiles(directory)
  const totals = {
    files: files.length,
    rawBytes: 0,
    gzipBytes: 0,
    javascriptBytes: 0,
    cssBytes: 0,
    otherBytes: 0,
  }

  for (const file of files) {
    const buffer = await readFile(file)
    const rawBytes = buffer.byteLength
    totals.rawBytes += rawBytes
    totals.gzipBytes += gzipSync(buffer, { level: 9 }).byteLength
    if (['.js', '.mjs'].includes(extname(file))) totals.javascriptBytes += rawBytes
    else if (extname(file) === '.css') totals.cssBytes += rawBytes
    else totals.otherBytes += rawBytes
  }
  return totals
}

async function collectSourceStats() {
  const roots = ['src', 'scripts', 'config']
  const fixedFiles = ['vite.config.ts', 'webpack.config.mjs', 'rspack.config.mjs', 'index.html']
  const files = []

  for (const sourceRoot of roots) {
    files.push(...await walkFiles(join(rootDir, sourceRoot)))
  }
  files.push(...fixedFiles.map((file) => join(rootDir, file)))

  let lines = 0
  let bytes = 0
  for (const file of files) {
    if (!textExtensions.has(extname(file))) continue
    const content = await readFile(file, 'utf8')
    lines += content.split(/\r?\n/).length
    bytes += Buffer.byteLength(content)
  }
  return { files: files.length, lines, bytes }
}

function formatMilliseconds(value) {
  return `${Math.round(value)} ms`
}

function formatBytes(value) {
  if (value < 1024) return `${value} B`
  if (value < 1024 ** 2) return `${(value / 1024).toFixed(1)} KiB`
  return `${(value / 1024 ** 2).toFixed(2)} MiB`
}

function makeMarkdown(result) {
  const buildRows = result.bundlers.map((bundler) => {
    const build = result.build[bundler.id]
    const size = result.size[bundler.id]
    return `| ${bundler.label} | ${formatMilliseconds(build.firstMs)} | ${formatMilliseconds(build.medianMs)} | ${formatMilliseconds(build.minMs)} | ${formatMilliseconds(build.maxMs)} | ${formatBytes(size.rawBytes)} | ${formatBytes(size.gzipBytes)} | ${size.files} |`
  })
  const devRows = result.bundlers.map((bundler) => {
    const dev = result.dev[bundler.id]
    return `| ${bundler.label} | ${formatMilliseconds(dev.firstMs)} | ${formatMilliseconds(dev.medianMs)} | ${formatMilliseconds(dev.minMs)} | ${formatMilliseconds(dev.maxMs)} |`
  })

  return `# Bundler Benchmark Report

Generated: ${result.generatedAt}

## Environment

| Item | Value |
| --- | --- |
| OS | ${result.environment.platform} ${result.environment.release} |
| CPU | ${result.environment.cpu} |
| Logical cores | ${result.environment.logicalCores} |
| Memory | ${formatBytes(result.environment.totalMemoryBytes)} total, ${formatBytes(result.environment.freeMemoryBytes)} free at start |
| Node | ${result.environment.node} |
| pnpm | ${result.environment.pnpm} |
| Vite | ${result.versions.vite} |
| Webpack | ${result.versions.webpack} |
| Rspack | ${result.versions.rspack} |
| Workload | ${result.source.files} files, ${result.source.lines.toLocaleString('en-US')} lines, ${formatBytes(result.source.bytes)} source text |

## Production Build

Lower is better for time and size. "First" is the uncached process run after output/cache cleanup. Median is based on ${result.config.runs} measured runs after ${result.config.warmups} warm-up run(s).

| Bundler | First | Median | Min | Max | Raw output | Gzip total | Files |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
${buildRows.join('\n')}

## Dev Server Startup

Measured from spawning the CLI until its root HTML responds successfully. The first run clears known local bundler caches; median uses ${result.config.runs} subsequent starts.

| Bundler | First | Median | Min | Max |
| --- | ---: | ---: | ---: | ---: |
${devRows.join('\n')}

## Method

- All bundlers compile the same React/TypeScript entry and generated module graph.
- TypeScript/TSX transforms use SWC for the three development configurations.
- Production builds use each bundler's normal optimized production pipeline.
- Source maps are disabled and CSS is extracted for production.
- Each build starts in a new Node process and its output directory is removed first.
- Startup readiness is measured by polling the configured HTTP endpoint.
- Gzip size is the sum of individually compressed output files at level 9.
- Results are machine-specific; compare relative numbers from the same run, not absolute numbers across machines.
`
}

async function packageVersion(name) {
  return (await readPackage(name)).data.version
}

const rootPackage = JSON.parse(await readFile(join(rootDir, 'package.json'), 'utf8'))
const pnpmVersion = process.env.npm_config_user_agent?.match(/pnpm\/([^\s]+)/)?.[1]
  ?? rootPackage.packageManager?.split('@').at(-1)
  ?? 'unknown'

console.log(`Benchmarking ${bundlers.map((bundler) => bundler.label).join(', ')} with ${runs} measured run(s).`)

await rm(join(rootDir, 'node_modules/.vite'), { recursive: true, force: true })
await rm(join(rootDir, 'node_modules/.cache'), { recursive: true, force: true })
await rm(join(rootDir, '.cache'), { recursive: true, force: true })

const coldBuild = {}
const coldDev = {}
const buildSamples = Object.fromEntries(bundlers.map((bundler) => [bundler.id, []]))
const devSamples = Object.fromEntries(bundlers.map((bundler) => [bundler.id, []]))

for (let warmup = 0; warmup < warmups; warmup += 1) {
  for (const bundler of rotate(bundlers, warmup)) {
    const elapsed = await measureBuild(bundler)
    if (coldBuild[bundler.id] === undefined) coldBuild[bundler.id] = elapsed
    console.log(`Build warm-up ${warmup + 1}/${warmups}: ${bundler.label} ${formatMilliseconds(elapsed)}`)
  }
}

for (let round = 0; round < runs; round += 1) {
  for (const bundler of rotate(bundlers, round)) {
    const elapsed = await measureBuild(bundler)
    buildSamples[bundler.id].push(elapsed)
    if (coldBuild[bundler.id] === undefined) coldBuild[bundler.id] = elapsed
    console.log(`Build ${round + 1}/${runs}: ${bundler.label} ${formatMilliseconds(elapsed)}`)
  }
}

let port = 45100
for (let warmup = 0; warmup < warmups; warmup += 1) {
  for (const bundler of rotate(bundlers, warmup)) {
    const elapsed = await measureDevStart(bundler, port++)
    if (coldDev[bundler.id] === undefined) coldDev[bundler.id] = elapsed
    console.log(`Dev warm-up ${warmup + 1}/${warmups}: ${bundler.label} ${formatMilliseconds(elapsed)}`)
  }
}

for (let round = 0; round < runs; round += 1) {
  for (const bundler of rotate(bundlers, round)) {
    const elapsed = await measureDevStart(bundler, port++)
    devSamples[bundler.id].push(elapsed)
    if (coldDev[bundler.id] === undefined) coldDev[bundler.id] = elapsed
    console.log(`Dev ${round + 1}/${runs}: ${bundler.label} ${formatMilliseconds(elapsed)}`)
  }
}

const [source, viteVersion, webpackVersion, rspackVersion] = await Promise.all([
  collectSourceStats(),
  packageVersion('vite'),
  packageVersion('webpack'),
  packageVersion('@rspack/core'),
])

const size = {}
for (const bundler of bundlers) {
  size[bundler.id] = await collectSize(bundler.dist)
}

const result = {
  generatedAt: new Date().toISOString(),
  config: { runs, warmups, timeoutMs },
  environment: {
    platform: platform(),
    release: release(),
    cpu: cpus()[0]?.model ?? 'unknown',
    logicalCores: cpus().length,
    totalMemoryBytes: totalmem(),
    freeMemoryBytes: freemem(),
    node: process.version,
    pnpm: pnpmVersion,
  },
  versions: {
    vite: viteVersion,
    webpack: webpackVersion,
    rspack: rspackVersion,
  },
  source,
  bundlers: bundlers.map(({ id, label }) => ({ id, label })),
  build: Object.fromEntries(
    bundlers.map((bundler) => [
      bundler.id,
      { firstMs: Math.round(coldBuild[bundler.id] * 10) / 10, ...summarize(buildSamples[bundler.id]) },
    ]),
  ),
  dev: Object.fromEntries(
    bundlers.map((bundler) => [
      bundler.id,
      { firstMs: Math.round(coldDev[bundler.id] * 10) / 10, ...summarize(devSamples[bundler.id]) },
    ]),
  ),
  size,
}

const markdown = makeMarkdown(result)
const timestamp = result.generatedAt.replaceAll(':', '-').replaceAll('.', '-')

await mkdir(resultDir, { recursive: true })
await Promise.all([
  writeFile(join(resultDir, `${timestamp}.json`), JSON.stringify(result, null, 2), 'utf8'),
  writeFile(join(resultDir, 'latest.json'), JSON.stringify(result, null, 2), 'utf8'),
  writeFile(join(resultDir, 'latest.md'), markdown, 'utf8'),
])

console.log('\n' + markdown)
