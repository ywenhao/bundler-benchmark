import { PanelFrame } from '../../components/PanelFrame'
import type { PanelProps } from '../../types'
import { panelData023 } from '../panel-data/panel-data-023'
import { feature184 } from '../features/feature-184'
import { feature185 } from '../features/feature-185'
import { feature186 } from '../features/feature-186'
import { feature187 } from '../features/feature-187'
import { feature188 } from '../features/feature-188'
import { feature189 } from '../features/feature-189'
import { feature190 } from '../features/feature-190'
import { feature191 } from '../features/feature-191'

const features = [feature184, feature185, feature186, feature187, feature188, feature189, feature190, feature191]

export default function GeneratedPanel023({ density }: PanelProps) {
  const metrics = features.map((feature, featureIndex) => ({
    label: feature.name,
    value: feature.calculate(panelData023[(featureIndex * 11) % panelData023.length]),
    status: feature.status,
  }))

  return (
    <PanelFrame
      density={density}
      title="Platform Analysis 023"
      subtitle="96 samples and 8 independently compiled feature modules"
      series={panelData023}
      metrics={metrics}
    />
  )
}
