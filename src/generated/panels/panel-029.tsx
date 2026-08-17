import { PanelFrame } from '../../components/PanelFrame'
import type { PanelProps } from '../../types'
import { panelData029 } from '../panel-data/panel-data-029'
import { feature232 } from '../features/feature-232'
import { feature233 } from '../features/feature-233'
import { feature234 } from '../features/feature-234'
import { feature235 } from '../features/feature-235'
import { feature236 } from '../features/feature-236'
import { feature237 } from '../features/feature-237'
import { feature238 } from '../features/feature-238'
import { feature239 } from '../features/feature-239'

const features = [feature232, feature233, feature234, feature235, feature236, feature237, feature238, feature239]

export default function GeneratedPanel029({ density }: PanelProps) {
  const metrics = features.map((feature, featureIndex) => ({
    label: feature.name,
    value: feature.calculate(panelData029[(featureIndex * 11) % panelData029.length]),
    status: feature.status,
  }))

  return (
    <PanelFrame
      density={density}
      title="Operations Analysis 029"
      subtitle="96 samples and 8 independently compiled feature modules"
      series={panelData029}
      metrics={metrics}
    />
  )
}
