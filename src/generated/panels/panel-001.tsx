import { PanelFrame } from '../../components/PanelFrame'
import type { PanelProps } from '../../types'
import { panelData001 } from '../panel-data/panel-data-001'
import { feature008 } from '../features/feature-008'
import { feature009 } from '../features/feature-009'
import { feature010 } from '../features/feature-010'
import { feature011 } from '../features/feature-011'
import { feature012 } from '../features/feature-012'
import { feature013 } from '../features/feature-013'
import { feature014 } from '../features/feature-014'
import { feature015 } from '../features/feature-015'

const features = [feature008, feature009, feature010, feature011, feature012, feature013, feature014, feature015]

export default function GeneratedPanel001({ density }: PanelProps) {
  const metrics = features.map((feature, featureIndex) => ({
    label: feature.name,
    value: feature.calculate(panelData001[(featureIndex * 11) % panelData001.length]),
    status: feature.status,
  }))

  return (
    <PanelFrame
      density={density}
      title="Risk Analysis 001"
      subtitle="96 samples and 8 independently compiled feature modules"
      series={panelData001}
      metrics={metrics}
    />
  )
}
