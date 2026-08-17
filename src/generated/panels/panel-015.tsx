import { PanelFrame } from '../../components/PanelFrame'
import type { PanelProps } from '../../types'
import { panelData015 } from '../panel-data/panel-data-015'
import { feature120 } from '../features/feature-120'
import { feature121 } from '../features/feature-121'
import { feature122 } from '../features/feature-122'
import { feature123 } from '../features/feature-123'
import { feature124 } from '../features/feature-124'
import { feature125 } from '../features/feature-125'
import { feature126 } from '../features/feature-126'
import { feature127 } from '../features/feature-127'

const features = [feature120, feature121, feature122, feature123, feature124, feature125, feature126, feature127]

export default function GeneratedPanel015({ density }: PanelProps) {
  const metrics = features.map((feature, featureIndex) => ({
    label: feature.name,
    value: feature.calculate(panelData015[(featureIndex * 11) % panelData015.length]),
    status: feature.status,
  }))

  return (
    <PanelFrame
      density={density}
      title="Platform Analysis 015"
      subtitle="96 samples and 8 independently compiled feature modules"
      series={panelData015}
      metrics={metrics}
    />
  )
}
