import { PanelFrame } from '../../components/PanelFrame'
import type { PanelProps } from '../../types'
import { panelData025 } from '../panel-data/panel-data-025'
import { feature200 } from '../features/feature-200'
import { feature201 } from '../features/feature-201'
import { feature202 } from '../features/feature-202'
import { feature203 } from '../features/feature-203'
import { feature204 } from '../features/feature-204'
import { feature205 } from '../features/feature-205'
import { feature206 } from '../features/feature-206'
import { feature207 } from '../features/feature-207'

const features = [feature200, feature201, feature202, feature203, feature204, feature205, feature206, feature207]

export default function GeneratedPanel025({ density }: PanelProps) {
  const metrics = features.map((feature, featureIndex) => ({
    label: feature.name,
    value: feature.calculate(panelData025[(featureIndex * 11) % panelData025.length]),
    status: feature.status,
  }))

  return (
    <PanelFrame
      density={density}
      title="Risk Analysis 025"
      subtitle="96 samples and 8 independently compiled feature modules"
      series={panelData025}
      metrics={metrics}
    />
  )
}
