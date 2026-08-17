import { PanelFrame } from '../../components/PanelFrame'
import type { PanelProps } from '../../types'
import { panelData039 } from '../panel-data/panel-data-039'
import { feature312 } from '../features/feature-312'
import { feature313 } from '../features/feature-313'
import { feature314 } from '../features/feature-314'
import { feature315 } from '../features/feature-315'
import { feature316 } from '../features/feature-316'
import { feature317 } from '../features/feature-317'
import { feature318 } from '../features/feature-318'
import { feature319 } from '../features/feature-319'

const features = [feature312, feature313, feature314, feature315, feature316, feature317, feature318, feature319]

export default function GeneratedPanel039({ density }: PanelProps) {
  const metrics = features.map((feature, featureIndex) => ({
    label: feature.name,
    value: feature.calculate(panelData039[(featureIndex * 11) % panelData039.length]),
    status: feature.status,
  }))

  return (
    <PanelFrame
      density={density}
      title="Platform Analysis 039"
      subtitle="96 samples and 8 independently compiled feature modules"
      series={panelData039}
      metrics={metrics}
    />
  )
}
