import { PanelFrame } from '../../components/PanelFrame'
import type { PanelProps } from '../../types'
import { panelData020 } from '../panel-data/panel-data-020'
import { feature160 } from '../features/feature-160'
import { feature161 } from '../features/feature-161'
import { feature162 } from '../features/feature-162'
import { feature163 } from '../features/feature-163'
import { feature164 } from '../features/feature-164'
import { feature165 } from '../features/feature-165'
import { feature166 } from '../features/feature-166'
import { feature167 } from '../features/feature-167'

const features = [feature160, feature161, feature162, feature163, feature164, feature165, feature166, feature167]

export default function GeneratedPanel020({ density }: PanelProps) {
  const metrics = features.map((feature, featureIndex) => ({
    label: feature.name,
    value: feature.calculate(panelData020[(featureIndex * 11) % panelData020.length]),
    status: feature.status,
  }))

  return (
    <PanelFrame
      density={density}
      title="Analytics Analysis 020"
      subtitle="96 samples and 8 independently compiled feature modules"
      series={panelData020}
      metrics={metrics}
    />
  )
}
