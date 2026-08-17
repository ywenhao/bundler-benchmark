import { PanelFrame } from '../../components/PanelFrame'
import type { PanelProps } from '../../types'
import { panelData026 } from '../panel-data/panel-data-026'
import { feature208 } from '../features/feature-208'
import { feature209 } from '../features/feature-209'
import { feature210 } from '../features/feature-210'
import { feature211 } from '../features/feature-211'
import { feature212 } from '../features/feature-212'
import { feature213 } from '../features/feature-213'
import { feature214 } from '../features/feature-214'
import { feature215 } from '../features/feature-215'

const features = [feature208, feature209, feature210, feature211, feature212, feature213, feature214, feature215]

export default function GeneratedPanel026({ density }: PanelProps) {
  const metrics = features.map((feature, featureIndex) => ({
    label: feature.name,
    value: feature.calculate(panelData026[(featureIndex * 11) % panelData026.length]),
    status: feature.status,
  }))

  return (
    <PanelFrame
      density={density}
      title="Identity Analysis 026"
      subtitle="96 samples and 8 independently compiled feature modules"
      series={panelData026}
      metrics={metrics}
    />
  )
}
