import { PanelFrame } from '../../components/PanelFrame'
import type { PanelProps } from '../../types'
import { panelData027 } from '../panel-data/panel-data-027'
import { feature216 } from '../features/feature-216'
import { feature217 } from '../features/feature-217'
import { feature218 } from '../features/feature-218'
import { feature219 } from '../features/feature-219'
import { feature220 } from '../features/feature-220'
import { feature221 } from '../features/feature-221'
import { feature222 } from '../features/feature-222'
import { feature223 } from '../features/feature-223'

const features = [feature216, feature217, feature218, feature219, feature220, feature221, feature222, feature223]

export default function GeneratedPanel027({ density }: PanelProps) {
  const metrics = features.map((feature, featureIndex) => ({
    label: feature.name,
    value: feature.calculate(panelData027[(featureIndex * 11) % panelData027.length]),
    status: feature.status,
  }))

  return (
    <PanelFrame
      density={density}
      title="Payments Analysis 027"
      subtitle="96 samples and 8 independently compiled feature modules"
      series={panelData027}
      metrics={metrics}
    />
  )
}
