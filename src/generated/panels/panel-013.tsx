import { PanelFrame } from '../../components/PanelFrame'
import type { PanelProps } from '../../types'
import { panelData013 } from '../panel-data/panel-data-013'
import { feature104 } from '../features/feature-104'
import { feature105 } from '../features/feature-105'
import { feature106 } from '../features/feature-106'
import { feature107 } from '../features/feature-107'
import { feature108 } from '../features/feature-108'
import { feature109 } from '../features/feature-109'
import { feature110 } from '../features/feature-110'
import { feature111 } from '../features/feature-111'

const features = [feature104, feature105, feature106, feature107, feature108, feature109, feature110, feature111]

export default function GeneratedPanel013({ density }: PanelProps) {
  const metrics = features.map((feature, featureIndex) => ({
    label: feature.name,
    value: feature.calculate(panelData013[(featureIndex * 11) % panelData013.length]),
    status: feature.status,
  }))

  return (
    <PanelFrame
      density={density}
      title="Operations Analysis 013"
      subtitle="96 samples and 8 independently compiled feature modules"
      series={panelData013}
      metrics={metrics}
    />
  )
}
