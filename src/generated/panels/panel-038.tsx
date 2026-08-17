import { PanelFrame } from '../../components/PanelFrame'
import type { PanelProps } from '../../types'
import { panelData038 } from '../panel-data/panel-data-038'
import { feature304 } from '../features/feature-304'
import { feature305 } from '../features/feature-305'
import { feature306 } from '../features/feature-306'
import { feature307 } from '../features/feature-307'
import { feature308 } from '../features/feature-308'
import { feature309 } from '../features/feature-309'
import { feature310 } from '../features/feature-310'
import { feature311 } from '../features/feature-311'

const features = [feature304, feature305, feature306, feature307, feature308, feature309, feature310, feature311]

export default function GeneratedPanel038({ density }: PanelProps) {
  const metrics = features.map((feature, featureIndex) => ({
    label: feature.name,
    value: feature.calculate(panelData038[(featureIndex * 11) % panelData038.length]),
    status: feature.status,
  }))

  return (
    <PanelFrame
      density={density}
      title="Growth Analysis 038"
      subtitle="96 samples and 8 independently compiled feature modules"
      series={panelData038}
      metrics={metrics}
    />
  )
}
