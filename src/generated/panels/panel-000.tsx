import { PanelFrame } from '../../components/PanelFrame'
import type { PanelProps } from '../../types'
import { panelData000 } from '../panel-data/panel-data-000'
import { feature000 } from '../features/feature-000'
import { feature001 } from '../features/feature-001'
import { feature002 } from '../features/feature-002'
import { feature003 } from '../features/feature-003'
import { feature004 } from '../features/feature-004'
import { feature005 } from '../features/feature-005'
import { feature006 } from '../features/feature-006'
import { feature007 } from '../features/feature-007'

const features = [feature000, feature001, feature002, feature003, feature004, feature005, feature006, feature007]

export default function GeneratedPanel000({ density }: PanelProps) {
  const metrics = features.map((feature, featureIndex) => ({
    label: feature.name,
    value: feature.calculate(panelData000[(featureIndex * 11) % panelData000.length]),
    status: feature.status,
  }))

  return (
    <PanelFrame
      density={density}
      title="Trading Analysis 000"
      subtitle="96 samples and 8 independently compiled feature modules"
      series={panelData000}
      metrics={metrics}
    />
  )
}
