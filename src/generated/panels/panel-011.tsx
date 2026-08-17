import { PanelFrame } from '../../components/PanelFrame'
import type { PanelProps } from '../../types'
import { panelData011 } from '../panel-data/panel-data-011'
import { feature088 } from '../features/feature-088'
import { feature089 } from '../features/feature-089'
import { feature090 } from '../features/feature-090'
import { feature091 } from '../features/feature-091'
import { feature092 } from '../features/feature-092'
import { feature093 } from '../features/feature-093'
import { feature094 } from '../features/feature-094'
import { feature095 } from '../features/feature-095'

const features = [feature088, feature089, feature090, feature091, feature092, feature093, feature094, feature095]

export default function GeneratedPanel011({ density }: PanelProps) {
  const metrics = features.map((feature, featureIndex) => ({
    label: feature.name,
    value: feature.calculate(panelData011[(featureIndex * 11) % panelData011.length]),
    status: feature.status,
  }))

  return (
    <PanelFrame
      density={density}
      title="Payments Analysis 011"
      subtitle="96 samples and 8 independently compiled feature modules"
      series={panelData011}
      metrics={metrics}
    />
  )
}
