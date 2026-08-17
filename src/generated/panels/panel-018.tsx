import { PanelFrame } from '../../components/PanelFrame'
import type { PanelProps } from '../../types'
import { panelData018 } from '../panel-data/panel-data-018'
import { feature144 } from '../features/feature-144'
import { feature145 } from '../features/feature-145'
import { feature146 } from '../features/feature-146'
import { feature147 } from '../features/feature-147'
import { feature148 } from '../features/feature-148'
import { feature149 } from '../features/feature-149'
import { feature150 } from '../features/feature-150'
import { feature151 } from '../features/feature-151'

const features = [feature144, feature145, feature146, feature147, feature148, feature149, feature150, feature151]

export default function GeneratedPanel018({ density }: PanelProps) {
  const metrics = features.map((feature, featureIndex) => ({
    label: feature.name,
    value: feature.calculate(panelData018[(featureIndex * 11) % panelData018.length]),
    status: feature.status,
  }))

  return (
    <PanelFrame
      density={density}
      title="Identity Analysis 018"
      subtitle="96 samples and 8 independently compiled feature modules"
      series={panelData018}
      metrics={metrics}
    />
  )
}
