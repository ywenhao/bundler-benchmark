import { mkdir, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const generatedDir = path.join(rootDir, 'src/generated')
const featureDir = path.join(generatedDir, 'features')
const analyticsDir = path.join(generatedDir, 'analytics')
const panelDir = path.join(generatedDir, 'panels')
const panelDataDir = path.join(generatedDir, 'panel-data')

const FEATURE_COUNT = 320
const FORMULA_COUNT = 64
const PANEL_COUNT = 40
const FEATURES_PER_PANEL = 8

const categories = ['Trading', 'Risk', 'Identity', 'Payments', 'Analytics', 'Operations', 'Growth', 'Platform']
const owners = ['Atlas', 'Beacon', 'Compass', 'Delta', 'Ember', 'Foundry', 'Harbor', 'Ion', 'Junction', 'Keystone']
const nouns = ['Ledger', 'Gateway', 'Console', 'Monitor', 'Router', 'Engine', 'Registry', 'Pipeline', 'Workbench', 'Sentinel']
const adjectives = ['Adaptive', 'Realtime', 'Unified', 'Reliable', 'Dynamic', 'Secure', 'Elastic', 'Predictive']
const statuses = ['healthy', 'healthy', 'healthy', 'watch', 'watch', 'critical']
const priorities = ['P0', 'P1', 'P1', 'P2', 'P2', 'P3']

const pad = (value) => String(value).padStart(3, '0')
const round = (value) => Math.round(value * 10) / 10
const write = async (target, content) => {
  await mkdir(path.dirname(target), { recursive: true })
  await writeFile(target, content, 'utf8')
}

function makeFormula(index) {
  const id = pad(index)
  const multiplier = round(0.72 + (index % 13) * 0.037)
  const offset = (index * 17) % 29
  return `export function formula${id}(values: readonly number[], seed: number): number {
  let weighted = 0
  let weightTotal = 0

  for (let index = 0; index < values.length; index += 1) {
    const weight = ((index + ${index + 3}) % 7) + 1
    weighted += values[index] * weight
    weightTotal += weight
  }

  const average = weightTotal === 0 ? 0 : weighted / weightTotal
  const oscillation = Math.sin((seed + ${offset}) / ${index % 9 + 3}) * ${round(multiplier * 4.5)}
  const pressure = Math.cos((average + seed) / ${index % 11 + 5}) * ${round(multiplier * 2.4)}
  return Math.max(0, Math.min(100, average * ${multiplier} + oscillation + pressure + ${offset}))
}

export function normalize${id}(value: number): number {
  const normalized = (value + ${offset}) / ${round(multiplier + 0.8)}
  return Math.round(Math.max(0, Math.min(100, normalized)) * 100) / 100
}
`
}

function makeFeature(index) {
  const id = pad(index)
  const formulaId = pad(index % FORMULA_COUNT)
  const category = categories[index % categories.length]
  const owner = owners[(index * 3) % owners.length]
  const name = `${adjectives[index % adjectives.length]} ${category} ${nouns[(index * 5) % nouns.length]}`
  const status = statuses[(index * 7) % statuses.length]
  const priority = priorities[(index * 11) % priorities.length]
  const signals = Array.from({ length: 16 }, (_, signalIndex) =>
    round(25 + ((index * 19 + signalIndex * 13) % 61) + Math.sin((index + signalIndex) / 3) * 8),
  )
  const day = String((index % 27) + 1).padStart(2, '0')
  const month = String(((index * 5) % 8) + 1).padStart(2, '0')

  return `import type { FeatureDefinition } from '../../types'
import { formula${formulaId}, normalize${formulaId} } from '../analytics/formula-${formulaId}'

const signals = [${signals.join(', ')}] as const

export const feature${id}: FeatureDefinition = {
  id: 'FTR-${id}',
  name: '${name} ${id}',
  category: '${category}',
  owner: '${owner}',
  status: '${status}',
  priority: '${priority}',
  budget: ${round(18 + ((index * 37) % 430) / 3)},
  complexity: ${(index * 13) % 97 + 3},
  updatedAt: '2026-${month}-${day}T${String(index % 23).padStart(2, '0')}:00:00.000Z',
  signals,
  calculate(input: number) {
    const raw = formula${formulaId}(signals, input + ${index})
    return normalize${formulaId}(raw)
  },
}
`
}

function makePanelData(index) {
  const id = pad(index)
  const values = Array.from({ length: 96 }, (_, valueIndex) => {
    const wave = Math.sin((valueIndex + index * 4) / 7) * 18
    const pulse = Math.cos((valueIndex * (index % 5 + 1)) / 13) * 9
    return round(48 + wave + pulse + ((index * 11 + valueIndex * 3) % 21))
  })
  return `export const panelData${id} = [${values.join(', ')}] as const
`
}

function makePanel(index) {
  const id = pad(index)
  const featureIndexes = Array.from({ length: FEATURES_PER_PANEL }, (_, offset) =>
    (index * FEATURES_PER_PANEL + offset) % FEATURE_COUNT,
  )
  const imports = featureIndexes
    .map((featureIndex) => `import { feature${pad(featureIndex)} } from '../features/feature-${pad(featureIndex)}'`)
    .join('\n')
  const featureNames = featureIndexes.map((featureIndex) => `feature${pad(featureIndex)}`).join(', ')
  const category = categories[index % categories.length]

  return `import { PanelFrame } from '../../components/PanelFrame'
import type { PanelProps } from '../../types'
import { panelData${id} } from '../panel-data/panel-data-${id}'
${imports}

const features = [${featureNames}]

export default function GeneratedPanel${id}({ density }: PanelProps) {
  const metrics = features.map((feature, featureIndex) => ({
    label: feature.name,
    value: feature.calculate(panelData${id}[(featureIndex * 11) % panelData${id}.length]),
    status: feature.status,
  }))

  return (
    <PanelFrame
      density={density}
      title="${category} Analysis ${id}"
      subtitle="96 samples and ${FEATURES_PER_PANEL} independently compiled feature modules"
      series={panelData${id}}
      metrics={metrics}
    />
  )
}
`
}

await rm(generatedDir, { recursive: true, force: true })
await Promise.all([
  mkdir(featureDir, { recursive: true }),
  mkdir(analyticsDir, { recursive: true }),
  mkdir(panelDir, { recursive: true }),
  mkdir(panelDataDir, { recursive: true }),
])

for (let index = 0; index < FORMULA_COUNT; index += 1) {
  await write(path.join(analyticsDir, `formula-${pad(index)}.ts`), makeFormula(index))
}

for (let index = 0; index < FEATURE_COUNT; index += 1) {
  await write(path.join(featureDir, `feature-${pad(index)}.ts`), makeFeature(index))
}

for (let index = 0; index < PANEL_COUNT; index += 1) {
  await write(path.join(panelDataDir, `panel-data-${pad(index)}.ts`), makePanelData(index))
  await write(path.join(panelDir, `panel-${pad(index)}.tsx`), makePanel(index))
}

const featureImports = Array.from(
  { length: FEATURE_COUNT },
  (_, index) => `import { feature${pad(index)} } from './features/feature-${pad(index)}'`,
).join('\n')
const featureNames = Array.from({ length: FEATURE_COUNT }, (_, index) => `feature${pad(index)}`).join(',\n  ')

await write(
  path.join(generatedDir, 'feature-registry.ts'),
  `${featureImports}

export const featureRegistry = [
  ${featureNames},
] as const
`,
)

const panelEntries = Array.from({ length: PANEL_COUNT }, (_, index) => {
  const id = pad(index)
  const category = categories[index % categories.length]
  return `  {
    id: 'panel-${id}',
    title: '${category} ${id}',
    category: '${category}',
    component: lazy(() => import('./panels/panel-${id}')),
  }`
}).join(',\n')

await write(
  path.join(generatedDir, 'panel-registry.tsx'),
  `import { lazy } from 'react'
import type { PanelDefinition } from '../types'

export const panelRegistry = [
${panelEntries},
] satisfies readonly PanelDefinition[]
`,
)

const generatedFileCount = FEATURE_COUNT + FORMULA_COUNT + PANEL_COUNT * 2 + 3
await write(
  path.join(generatedDir, 'workload-meta.ts'),
  `export const workloadMeta = {
  featureCount: ${FEATURE_COUNT},
  formulaCount: ${FORMULA_COUNT},
  panelCount: ${PANEL_COUNT},
  generatedFileCount: ${generatedFileCount},
} as const
`,
)

console.log(
  `Generated ${generatedFileCount} workload files: ${FEATURE_COUNT} features, ${FORMULA_COUNT} formulas, and ${PANEL_COUNT} lazy panels.`,
)
