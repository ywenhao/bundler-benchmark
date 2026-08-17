import { PanelFrame } from '../../components/PanelFrame'
import type { PanelProps } from '../../types'
import { panelData022 } from '../panel-data/panel-data-022'
import { feature176 } from '../features/feature-176'
import { feature177 } from '../features/feature-177'
import { feature178 } from '../features/feature-178'
import { feature179 } from '../features/feature-179'
import { feature180 } from '../features/feature-180'
import { feature181 } from '../features/feature-181'
import { feature182 } from '../features/feature-182'
import { feature183 } from '../features/feature-183'

const features = [feature176, feature177, feature178, feature179, feature180, feature181, feature182, feature183]

export default function GeneratedPanel022({ density }: PanelProps) {
  const metrics = features.map((feature, featureIndex) => ({
    label: feature.name,
    value: feature.calculate(panelData022[(featureIndex * 11) % panelData022.length]),
    status: feature.status,
  }))

  return (
    <PanelFrame
      density={density}
      title="Growth Analysis 022"
      subtitle="96 samples and 8 independently compiled feature modules"
      series={panelData022}
      metrics={metrics}
    />
  )
}
