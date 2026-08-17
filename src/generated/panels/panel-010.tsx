import { PanelFrame } from '../../components/PanelFrame'
import type { PanelProps } from '../../types'
import { panelData010 } from '../panel-data/panel-data-010'
import { feature080 } from '../features/feature-080'
import { feature081 } from '../features/feature-081'
import { feature082 } from '../features/feature-082'
import { feature083 } from '../features/feature-083'
import { feature084 } from '../features/feature-084'
import { feature085 } from '../features/feature-085'
import { feature086 } from '../features/feature-086'
import { feature087 } from '../features/feature-087'

const features = [feature080, feature081, feature082, feature083, feature084, feature085, feature086, feature087]

export default function GeneratedPanel010({ density }: PanelProps) {
  const metrics = features.map((feature, featureIndex) => ({
    label: feature.name,
    value: feature.calculate(panelData010[(featureIndex * 11) % panelData010.length]),
    status: feature.status,
  }))

  return (
    <PanelFrame
      density={density}
      title="Identity Analysis 010"
      subtitle="96 samples and 8 independently compiled feature modules"
      series={panelData010}
      metrics={metrics}
    />
  )
}
