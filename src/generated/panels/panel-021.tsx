import { PanelFrame } from '../../components/PanelFrame'
import type { PanelProps } from '../../types'
import { panelData021 } from '../panel-data/panel-data-021'
import { feature168 } from '../features/feature-168'
import { feature169 } from '../features/feature-169'
import { feature170 } from '../features/feature-170'
import { feature171 } from '../features/feature-171'
import { feature172 } from '../features/feature-172'
import { feature173 } from '../features/feature-173'
import { feature174 } from '../features/feature-174'
import { feature175 } from '../features/feature-175'

const features = [feature168, feature169, feature170, feature171, feature172, feature173, feature174, feature175]

export default function GeneratedPanel021({ density }: PanelProps) {
  const metrics = features.map((feature, featureIndex) => ({
    label: feature.name,
    value: feature.calculate(panelData021[(featureIndex * 11) % panelData021.length]),
    status: feature.status,
  }))

  return (
    <PanelFrame
      density={density}
      title="Operations Analysis 021"
      subtitle="96 samples and 8 independently compiled feature modules"
      series={panelData021}
      metrics={metrics}
    />
  )
}
