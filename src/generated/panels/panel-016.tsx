import { PanelFrame } from '../../components/PanelFrame'
import type { PanelProps } from '../../types'
import { panelData016 } from '../panel-data/panel-data-016'
import { feature128 } from '../features/feature-128'
import { feature129 } from '../features/feature-129'
import { feature130 } from '../features/feature-130'
import { feature131 } from '../features/feature-131'
import { feature132 } from '../features/feature-132'
import { feature133 } from '../features/feature-133'
import { feature134 } from '../features/feature-134'
import { feature135 } from '../features/feature-135'

const features = [feature128, feature129, feature130, feature131, feature132, feature133, feature134, feature135]

export default function GeneratedPanel016({ density }: PanelProps) {
  const metrics = features.map((feature, featureIndex) => ({
    label: feature.name,
    value: feature.calculate(panelData016[(featureIndex * 11) % panelData016.length]),
    status: feature.status,
  }))

  return (
    <PanelFrame
      density={density}
      title="Trading Analysis 016"
      subtitle="96 samples and 8 independently compiled feature modules"
      series={panelData016}
      metrics={metrics}
    />
  )
}
