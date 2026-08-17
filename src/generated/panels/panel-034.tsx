import { PanelFrame } from '../../components/PanelFrame'
import type { PanelProps } from '../../types'
import { panelData034 } from '../panel-data/panel-data-034'
import { feature272 } from '../features/feature-272'
import { feature273 } from '../features/feature-273'
import { feature274 } from '../features/feature-274'
import { feature275 } from '../features/feature-275'
import { feature276 } from '../features/feature-276'
import { feature277 } from '../features/feature-277'
import { feature278 } from '../features/feature-278'
import { feature279 } from '../features/feature-279'

const features = [feature272, feature273, feature274, feature275, feature276, feature277, feature278, feature279]

export default function GeneratedPanel034({ density }: PanelProps) {
  const metrics = features.map((feature, featureIndex) => ({
    label: feature.name,
    value: feature.calculate(panelData034[(featureIndex * 11) % panelData034.length]),
    status: feature.status,
  }))

  return (
    <PanelFrame
      density={density}
      title="Identity Analysis 034"
      subtitle="96 samples and 8 independently compiled feature modules"
      series={panelData034}
      metrics={metrics}
    />
  )
}
