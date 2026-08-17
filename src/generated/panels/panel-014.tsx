import { PanelFrame } from '../../components/PanelFrame'
import type { PanelProps } from '../../types'
import { panelData014 } from '../panel-data/panel-data-014'
import { feature112 } from '../features/feature-112'
import { feature113 } from '../features/feature-113'
import { feature114 } from '../features/feature-114'
import { feature115 } from '../features/feature-115'
import { feature116 } from '../features/feature-116'
import { feature117 } from '../features/feature-117'
import { feature118 } from '../features/feature-118'
import { feature119 } from '../features/feature-119'

const features = [feature112, feature113, feature114, feature115, feature116, feature117, feature118, feature119]

export default function GeneratedPanel014({ density }: PanelProps) {
  const metrics = features.map((feature, featureIndex) => ({
    label: feature.name,
    value: feature.calculate(panelData014[(featureIndex * 11) % panelData014.length]),
    status: feature.status,
  }))

  return (
    <PanelFrame
      density={density}
      title="Growth Analysis 014"
      subtitle="96 samples and 8 independently compiled feature modules"
      series={panelData014}
      metrics={metrics}
    />
  )
}
