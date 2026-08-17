import { PanelFrame } from '../../components/PanelFrame'
import type { PanelProps } from '../../types'
import { panelData037 } from '../panel-data/panel-data-037'
import { feature296 } from '../features/feature-296'
import { feature297 } from '../features/feature-297'
import { feature298 } from '../features/feature-298'
import { feature299 } from '../features/feature-299'
import { feature300 } from '../features/feature-300'
import { feature301 } from '../features/feature-301'
import { feature302 } from '../features/feature-302'
import { feature303 } from '../features/feature-303'

const features = [feature296, feature297, feature298, feature299, feature300, feature301, feature302, feature303]

export default function GeneratedPanel037({ density }: PanelProps) {
  const metrics = features.map((feature, featureIndex) => ({
    label: feature.name,
    value: feature.calculate(panelData037[(featureIndex * 11) % panelData037.length]),
    status: feature.status,
  }))

  return (
    <PanelFrame
      density={density}
      title="Operations Analysis 037"
      subtitle="96 samples and 8 independently compiled feature modules"
      series={panelData037}
      metrics={metrics}
    />
  )
}
