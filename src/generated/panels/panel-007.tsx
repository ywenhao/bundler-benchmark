import { PanelFrame } from '../../components/PanelFrame'
import type { PanelProps } from '../../types'
import { panelData007 } from '../panel-data/panel-data-007'
import { feature056 } from '../features/feature-056'
import { feature057 } from '../features/feature-057'
import { feature058 } from '../features/feature-058'
import { feature059 } from '../features/feature-059'
import { feature060 } from '../features/feature-060'
import { feature061 } from '../features/feature-061'
import { feature062 } from '../features/feature-062'
import { feature063 } from '../features/feature-063'

const features = [feature056, feature057, feature058, feature059, feature060, feature061, feature062, feature063]

export default function GeneratedPanel007({ density }: PanelProps) {
  const metrics = features.map((feature, featureIndex) => ({
    label: feature.name,
    value: feature.calculate(panelData007[(featureIndex * 11) % panelData007.length]),
    status: feature.status,
  }))

  return (
    <PanelFrame
      density={density}
      title="Platform Analysis 007"
      subtitle="96 samples and 8 independently compiled feature modules"
      series={panelData007}
      metrics={metrics}
    />
  )
}
