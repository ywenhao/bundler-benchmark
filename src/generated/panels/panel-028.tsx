import { PanelFrame } from '../../components/PanelFrame'
import type { PanelProps } from '../../types'
import { panelData028 } from '../panel-data/panel-data-028'
import { feature224 } from '../features/feature-224'
import { feature225 } from '../features/feature-225'
import { feature226 } from '../features/feature-226'
import { feature227 } from '../features/feature-227'
import { feature228 } from '../features/feature-228'
import { feature229 } from '../features/feature-229'
import { feature230 } from '../features/feature-230'
import { feature231 } from '../features/feature-231'

const features = [feature224, feature225, feature226, feature227, feature228, feature229, feature230, feature231]

export default function GeneratedPanel028({ density }: PanelProps) {
  const metrics = features.map((feature, featureIndex) => ({
    label: feature.name,
    value: feature.calculate(panelData028[(featureIndex * 11) % panelData028.length]),
    status: feature.status,
  }))

  return (
    <PanelFrame
      density={density}
      title="Analytics Analysis 028"
      subtitle="96 samples and 8 independently compiled feature modules"
      series={panelData028}
      metrics={metrics}
    />
  )
}
