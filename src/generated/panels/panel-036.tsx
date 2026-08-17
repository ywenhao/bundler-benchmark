import { PanelFrame } from '../../components/PanelFrame'
import type { PanelProps } from '../../types'
import { panelData036 } from '../panel-data/panel-data-036'
import { feature288 } from '../features/feature-288'
import { feature289 } from '../features/feature-289'
import { feature290 } from '../features/feature-290'
import { feature291 } from '../features/feature-291'
import { feature292 } from '../features/feature-292'
import { feature293 } from '../features/feature-293'
import { feature294 } from '../features/feature-294'
import { feature295 } from '../features/feature-295'

const features = [feature288, feature289, feature290, feature291, feature292, feature293, feature294, feature295]

export default function GeneratedPanel036({ density }: PanelProps) {
  const metrics = features.map((feature, featureIndex) => ({
    label: feature.name,
    value: feature.calculate(panelData036[(featureIndex * 11) % panelData036.length]),
    status: feature.status,
  }))

  return (
    <PanelFrame
      density={density}
      title="Analytics Analysis 036"
      subtitle="96 samples and 8 independently compiled feature modules"
      series={panelData036}
      metrics={metrics}
    />
  )
}
