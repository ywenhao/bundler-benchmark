import { PanelFrame } from '../../components/PanelFrame'
import type { PanelProps } from '../../types'
import { panelData031 } from '../panel-data/panel-data-031'
import { feature248 } from '../features/feature-248'
import { feature249 } from '../features/feature-249'
import { feature250 } from '../features/feature-250'
import { feature251 } from '../features/feature-251'
import { feature252 } from '../features/feature-252'
import { feature253 } from '../features/feature-253'
import { feature254 } from '../features/feature-254'
import { feature255 } from '../features/feature-255'

const features = [feature248, feature249, feature250, feature251, feature252, feature253, feature254, feature255]

export default function GeneratedPanel031({ density }: PanelProps) {
  const metrics = features.map((feature, featureIndex) => ({
    label: feature.name,
    value: feature.calculate(panelData031[(featureIndex * 11) % panelData031.length]),
    status: feature.status,
  }))

  return (
    <PanelFrame
      density={density}
      title="Platform Analysis 031"
      subtitle="96 samples and 8 independently compiled feature modules"
      series={panelData031}
      metrics={metrics}
    />
  )
}
