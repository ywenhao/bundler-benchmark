import { PanelFrame } from '../../components/PanelFrame'
import type { PanelProps } from '../../types'
import { panelData009 } from '../panel-data/panel-data-009'
import { feature072 } from '../features/feature-072'
import { feature073 } from '../features/feature-073'
import { feature074 } from '../features/feature-074'
import { feature075 } from '../features/feature-075'
import { feature076 } from '../features/feature-076'
import { feature077 } from '../features/feature-077'
import { feature078 } from '../features/feature-078'
import { feature079 } from '../features/feature-079'

const features = [feature072, feature073, feature074, feature075, feature076, feature077, feature078, feature079]

export default function GeneratedPanel009({ density }: PanelProps) {
  const metrics = features.map((feature, featureIndex) => ({
    label: feature.name,
    value: feature.calculate(panelData009[(featureIndex * 11) % panelData009.length]),
    status: feature.status,
  }))

  return (
    <PanelFrame
      density={density}
      title="Risk Analysis 009"
      subtitle="96 samples and 8 independently compiled feature modules"
      series={panelData009}
      metrics={metrics}
    />
  )
}
