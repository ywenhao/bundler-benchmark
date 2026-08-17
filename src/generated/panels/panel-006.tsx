import { PanelFrame } from '../../components/PanelFrame'
import type { PanelProps } from '../../types'
import { panelData006 } from '../panel-data/panel-data-006'
import { feature048 } from '../features/feature-048'
import { feature049 } from '../features/feature-049'
import { feature050 } from '../features/feature-050'
import { feature051 } from '../features/feature-051'
import { feature052 } from '../features/feature-052'
import { feature053 } from '../features/feature-053'
import { feature054 } from '../features/feature-054'
import { feature055 } from '../features/feature-055'

const features = [feature048, feature049, feature050, feature051, feature052, feature053, feature054, feature055]

export default function GeneratedPanel006({ density }: PanelProps) {
  const metrics = features.map((feature, featureIndex) => ({
    label: feature.name,
    value: feature.calculate(panelData006[(featureIndex * 11) % panelData006.length]),
    status: feature.status,
  }))

  return (
    <PanelFrame
      density={density}
      title="Growth Analysis 006"
      subtitle="96 samples and 8 independently compiled feature modules"
      series={panelData006}
      metrics={metrics}
    />
  )
}
