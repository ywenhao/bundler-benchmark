import { PanelFrame } from '../../components/PanelFrame'
import type { PanelProps } from '../../types'
import { panelData005 } from '../panel-data/panel-data-005'
import { feature040 } from '../features/feature-040'
import { feature041 } from '../features/feature-041'
import { feature042 } from '../features/feature-042'
import { feature043 } from '../features/feature-043'
import { feature044 } from '../features/feature-044'
import { feature045 } from '../features/feature-045'
import { feature046 } from '../features/feature-046'
import { feature047 } from '../features/feature-047'

const features = [feature040, feature041, feature042, feature043, feature044, feature045, feature046, feature047]

export default function GeneratedPanel005({ density }: PanelProps) {
  const metrics = features.map((feature, featureIndex) => ({
    label: feature.name,
    value: feature.calculate(panelData005[(featureIndex * 11) % panelData005.length]),
    status: feature.status,
  }))

  return (
    <PanelFrame
      density={density}
      title="Operations Analysis 005"
      subtitle="96 samples and 8 independently compiled feature modules"
      series={panelData005}
      metrics={metrics}
    />
  )
}
