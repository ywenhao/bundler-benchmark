import { PanelFrame } from '../../components/PanelFrame'
import type { PanelProps } from '../../types'
import { panelData017 } from '../panel-data/panel-data-017'
import { feature136 } from '../features/feature-136'
import { feature137 } from '../features/feature-137'
import { feature138 } from '../features/feature-138'
import { feature139 } from '../features/feature-139'
import { feature140 } from '../features/feature-140'
import { feature141 } from '../features/feature-141'
import { feature142 } from '../features/feature-142'
import { feature143 } from '../features/feature-143'

const features = [feature136, feature137, feature138, feature139, feature140, feature141, feature142, feature143]

export default function GeneratedPanel017({ density }: PanelProps) {
  const metrics = features.map((feature, featureIndex) => ({
    label: feature.name,
    value: feature.calculate(panelData017[(featureIndex * 11) % panelData017.length]),
    status: feature.status,
  }))

  return (
    <PanelFrame
      density={density}
      title="Risk Analysis 017"
      subtitle="96 samples and 8 independently compiled feature modules"
      series={panelData017}
      metrics={metrics}
    />
  )
}
