import { PanelFrame } from '../../components/PanelFrame'
import type { PanelProps } from '../../types'
import { panelData002 } from '../panel-data/panel-data-002'
import { feature016 } from '../features/feature-016'
import { feature017 } from '../features/feature-017'
import { feature018 } from '../features/feature-018'
import { feature019 } from '../features/feature-019'
import { feature020 } from '../features/feature-020'
import { feature021 } from '../features/feature-021'
import { feature022 } from '../features/feature-022'
import { feature023 } from '../features/feature-023'

const features = [feature016, feature017, feature018, feature019, feature020, feature021, feature022, feature023]

export default function GeneratedPanel002({ density }: PanelProps) {
  const metrics = features.map((feature, featureIndex) => ({
    label: feature.name,
    value: feature.calculate(panelData002[(featureIndex * 11) % panelData002.length]),
    status: feature.status,
  }))

  return (
    <PanelFrame
      density={density}
      title="Identity Analysis 002"
      subtitle="96 samples and 8 independently compiled feature modules"
      series={panelData002}
      metrics={metrics}
    />
  )
}
