import { PanelFrame } from '../../components/PanelFrame'
import type { PanelProps } from '../../types'
import { panelData004 } from '../panel-data/panel-data-004'
import { feature032 } from '../features/feature-032'
import { feature033 } from '../features/feature-033'
import { feature034 } from '../features/feature-034'
import { feature035 } from '../features/feature-035'
import { feature036 } from '../features/feature-036'
import { feature037 } from '../features/feature-037'
import { feature038 } from '../features/feature-038'
import { feature039 } from '../features/feature-039'

const features = [feature032, feature033, feature034, feature035, feature036, feature037, feature038, feature039]

export default function GeneratedPanel004({ density }: PanelProps) {
  const metrics = features.map((feature, featureIndex) => ({
    label: feature.name,
    value: feature.calculate(panelData004[(featureIndex * 11) % panelData004.length]),
    status: feature.status,
  }))

  return (
    <PanelFrame
      density={density}
      title="Analytics Analysis 004"
      subtitle="96 samples and 8 independently compiled feature modules"
      series={panelData004}
      metrics={metrics}
    />
  )
}
