# Rspack vs Webpack vs Vite Benchmark

This project compares Rspack, Webpack, and Vite against the same React and TypeScript workload.

The generated application is intentionally larger than a starter template:

- 320 independently compiled feature modules
- 64 reusable analytics formula modules
- 40 lazy React panels
- 40 panel data modules
- A functional dashboard with filtering, sorting, charts, a table, and detail views

The generated files are deterministic. Run the generator again at any time without changing the workload shape.

## Latest Benchmark Result

Measured on 2026-08-17 with one warm-up followed by five measured runs for each bundler. No other project dev server was running during the final benchmark.

| Environment | Value |
| --- | --- |
| CPU | Intel Core i5-14600K, 20 logical cores |
| Memory | 32 GiB |
| OS | Windows 10.0.26200 |
| Node | 24.19.0 |
| pnpm | 11.21.0 |
| Vite | 8.2.1 |
| Rspack | 2.1.10 |
| Webpack | 5.109.2 |
| Workload | 490 files, 12,844 lines, 395.8 KiB source text |

### Production Build

| Bundler | First build | Median | Min | Max | Raw output | Gzip total | Files |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| **Rspack** | 351 ms | **348 ms** | 342 ms | 352 ms | 504.7 KiB | 154.6 KiB | 45 |
| **Vite** | 429 ms | 424 ms | 411 ms | 462 ms | **455.2 KiB** | **141.6 KiB** | **44** |
| **Webpack** | 2928 ms | 2956 ms | 2856 ms | 2997 ms | 516.2 KiB | 155.4 KiB | 46 |

### Dev Server Startup

Startup is measured from spawning the CLI process until its root HTML responds successfully.

| Bundler | First start | Median | Min | Max |
| --- | ---: | ---: | ---: | ---: |
| **Vite** | 206 ms | **205 ms** | 197 ms | 280 ms |
| **Rspack** | 261 ms | 261 ms | 254 ms | 275 ms |
| **Webpack** | 1450 ms | 1346 ms | 1341 ms | 1378 ms |

On this workload, Rspack has the fastest production build, Vite has the fastest dev startup and smallest output, and Webpack is substantially slower. These numbers are machine-specific; use the included benchmark command to compare them on your own hardware.

## Setup

```powershell
pnpm install
pnpm generate
pnpm typecheck
```

## Run One Bundler

```powershell
pnpm dev:vite
pnpm dev:rspack
pnpm dev:webpack

pnpm build:vite
pnpm build:rspack
pnpm build:webpack
```

Default dev URLs:

| Bundler | URL |
| --- | --- |
| Vite | http://127.0.0.1:4173 |
| Webpack | http://127.0.0.1:4174 |
| Rspack | http://127.0.0.1:4175 |

## Run The Benchmark

```powershell
pnpm benchmark
```

The default benchmark performs one warm-up and five measured runs for every build and dev server. For a faster check:

```powershell
pnpm benchmark:quick
```

Custom run counts are supported:

```powershell
node scripts/benchmark.mjs --runs 7 --warmups 2
```

Reports are written to:

- `benchmark-results/latest.md`
- `benchmark-results/latest.json`
- A timestamped JSON file for historical comparisons

## Metrics

- First production build time
- Median, minimum, maximum, mean, and standard deviation across repeated builds
- First dev server startup
- Repeated dev server startup statistics
- Raw output size
- Gzip output size
- JavaScript, CSS, and other output byte totals
- Output file count
- Environment and installed bundler versions

Startup is measured from CLI process creation until the root HTML responds successfully. This represents server readiness, not browser rendering or HMR update latency.

Results are machine-specific. Use relative results from a single report when comparing bundlers.
