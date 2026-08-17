import { PanelFrame } from '../../components/PanelFrame'
import type { PanelProps } from '../../types'
import { panelData024 } from '../panel-data/panel-data-024'
import { feature192 } from '../features/feature-192'
import { feature193 } from '../features/feature-193'
import { feature194 } from '../features/feature-194'
import { feature195 } from '../features/feature-195'
import { feature196 } from '../features/feature-196'
import { feature197 } from '../features/feature-197'
import { feature198 } from '../features/feature-198'
import { feature199 } from '../features/feature-199'

const features = [feature192, feature193, feature194, feature195, feature196, feature197, feature198, feature199]

export default function GeneratedPanel024({ density }: PanelProps) {
  const metrics = features.map((feature, featureIndex) => ({
    label: feature.name,
    value: feature.calculate(panelData024[(featureIndex * 11) % panelData024.length]),
    status: feature.status,
  }))

  return (
    <PanelFrame
      density={density}
      title="Trading Analysis 024"
      subtitle="96 samples and 8 independently compiled feature modules"
      series={panelData024}
      metrics={metrics}
    />
  )
}
