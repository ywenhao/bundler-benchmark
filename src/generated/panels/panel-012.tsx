import { PanelFrame } from '../../components/PanelFrame'
import type { PanelProps } from '../../types'
import { panelData012 } from '../panel-data/panel-data-012'
import { feature096 } from '../features/feature-096'
import { feature097 } from '../features/feature-097'
import { feature098 } from '../features/feature-098'
import { feature099 } from '../features/feature-099'
import { feature100 } from '../features/feature-100'
import { feature101 } from '../features/feature-101'
import { feature102 } from '../features/feature-102'
import { feature103 } from '../features/feature-103'

const features = [feature096, feature097, feature098, feature099, feature100, feature101, feature102, feature103]

export default function GeneratedPanel012({ density }: PanelProps) {
  const metrics = features.map((feature, featureIndex) => ({
    label: feature.name,
    value: feature.calculate(panelData012[(featureIndex * 11) % panelData012.length]),
    status: feature.status,
  }))

  return (
    <PanelFrame
      density={density}
      title="Analytics Analysis 012"
      subtitle="96 samples and 8 independently compiled feature modules"
      series={panelData012}
      metrics={metrics}
    />
  )
}
