import { PanelFrame } from '../../components/PanelFrame'
import type { PanelProps } from '../../types'
import { panelData030 } from '../panel-data/panel-data-030'
import { feature240 } from '../features/feature-240'
import { feature241 } from '../features/feature-241'
import { feature242 } from '../features/feature-242'
import { feature243 } from '../features/feature-243'
import { feature244 } from '../features/feature-244'
import { feature245 } from '../features/feature-245'
import { feature246 } from '../features/feature-246'
import { feature247 } from '../features/feature-247'

const features = [feature240, feature241, feature242, feature243, feature244, feature245, feature246, feature247]

export default function GeneratedPanel030({ density }: PanelProps) {
  const metrics = features.map((feature, featureIndex) => ({
    label: feature.name,
    value: feature.calculate(panelData030[(featureIndex * 11) % panelData030.length]),
    status: feature.status,
  }))

  return (
    <PanelFrame
      density={density}
      title="Growth Analysis 030"
      subtitle="96 samples and 8 independently compiled feature modules"
      series={panelData030}
      metrics={metrics}
    />
  )
}
