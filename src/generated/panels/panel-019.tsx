import { PanelFrame } from '../../components/PanelFrame'
import type { PanelProps } from '../../types'
import { panelData019 } from '../panel-data/panel-data-019'
import { feature152 } from '../features/feature-152'
import { feature153 } from '../features/feature-153'
import { feature154 } from '../features/feature-154'
import { feature155 } from '../features/feature-155'
import { feature156 } from '../features/feature-156'
import { feature157 } from '../features/feature-157'
import { feature158 } from '../features/feature-158'
import { feature159 } from '../features/feature-159'

const features = [feature152, feature153, feature154, feature155, feature156, feature157, feature158, feature159]

export default function GeneratedPanel019({ density }: PanelProps) {
  const metrics = features.map((feature, featureIndex) => ({
    label: feature.name,
    value: feature.calculate(panelData019[(featureIndex * 11) % panelData019.length]),
    status: feature.status,
  }))

  return (
    <PanelFrame
      density={density}
      title="Payments Analysis 019"
      subtitle="96 samples and 8 independently compiled feature modules"
      series={panelData019}
      metrics={metrics}
    />
  )
}
