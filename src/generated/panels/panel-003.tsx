import { PanelFrame } from '../../components/PanelFrame'
import type { PanelProps } from '../../types'
import { panelData003 } from '../panel-data/panel-data-003'
import { feature024 } from '../features/feature-024'
import { feature025 } from '../features/feature-025'
import { feature026 } from '../features/feature-026'
import { feature027 } from '../features/feature-027'
import { feature028 } from '../features/feature-028'
import { feature029 } from '../features/feature-029'
import { feature030 } from '../features/feature-030'
import { feature031 } from '../features/feature-031'

const features = [feature024, feature025, feature026, feature027, feature028, feature029, feature030, feature031]

export default function GeneratedPanel003({ density }: PanelProps) {
  const metrics = features.map((feature, featureIndex) => ({
    label: feature.name,
    value: feature.calculate(panelData003[(featureIndex * 11) % panelData003.length]),
    status: feature.status,
  }))

  return (
    <PanelFrame
      density={density}
      title="Payments Analysis 003"
      subtitle="96 samples and 8 independently compiled feature modules"
      series={panelData003}
      metrics={metrics}
    />
  )
}
