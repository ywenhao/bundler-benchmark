import { startTransition, useMemo, useState } from 'react'
import { ChevronRight, X } from 'lucide-react'
import { BenchmarkHeader } from './components/BenchmarkHeader'
import { FeatureTable } from './components/FeatureTable'
import { FilterBar } from './components/FilterBar'
import { PanelViewer } from './components/PanelViewer'
import { SummaryStrip } from './components/SummaryStrip'
import { useDebouncedValue } from './hooks/useDebouncedValue'
import { filterFeatures } from './lib/filtering'
import { formatBudget, formatDecimal } from './lib/format'
import { getFeatureScore } from './lib/scoring'
import { featureRegistry } from './generated/feature-registry'
import { panelRegistry } from './generated/panel-registry'
import { workloadMeta } from './generated/workload-meta'
import type { Density, FeatureDefinition, FilterState } from './types'

const initialFilter: FilterState = { query: '', category: 'all', status: 'all', sort: 'score' }

export function App() {
  const [filter, setFilter] = useState(initialFilter)
  const [density, setDensity] = useState<Density>('comfortable')
  const [selectedPanelId, setSelectedPanelId] = useState(panelRegistry[0].id)
  const [inspectedFeature, setInspectedFeature] = useState<FeatureDefinition | null>(null)
  const debouncedQuery = useDebouncedValue(filter.query)

  const categories = useMemo(
    () => Array.from(new Set(featureRegistry.map((feature) => feature.category))).sort(),
    [],
  )
  const visibleFeatures = useMemo(
    () => filterFeatures(featureRegistry, { ...filter, query: debouncedQuery }),
    [debouncedQuery, filter],
  )
  const selectedPanel = panelRegistry.find((panel) => panel.id === selectedPanelId) ?? panelRegistry[0]

  const updateFilter = (nextFilter: FilterState) => {
    startTransition(() => setFilter(nextFilter))
  }

  return (
    <div className="app-shell" data-bundler={__BUNDLER__}>
      <BenchmarkHeader
        featureCount={featureRegistry.length}
        moduleCount={workloadMeta.generatedFileCount}
        panelCount={panelRegistry.length}
      />
      <main>
        <FilterBar categories={categories} density={density} filter={filter} onDensityChange={setDensity} onFilterChange={updateFilter} />
        <SummaryStrip features={visibleFeatures} totalCount={featureRegistry.length} />
        <div className="workspace-grid">
          <section className="feature-section">
            <div className="section-heading"><div><span>Compiled workload</span><h2>Feature inventory</h2></div><p>Every row is backed by generated modules included in all three builds.</p></div>
            <FeatureTable density={density} features={visibleFeatures} onInspect={setInspectedFeature} />
          </section>
          <aside className="panel-column">
            <div className="panel-tabs" role="tablist" aria-label="Generated analytics panels">
              {panelRegistry.slice(0, 12).map((panel) => (
                <button
                  key={panel.id}
                  className={panel.id === selectedPanel.id ? 'active' : ''}
                  onClick={() => setSelectedPanelId(panel.id)}
                  role="tab"
                >
                  {panel.title}<ChevronRight size={14} />
                </button>
              ))}
            </div>
            <PanelViewer density={density} panel={selectedPanel} />
          </aside>
        </div>
      </main>
      {inspectedFeature && (
        <div className="drawer-backdrop" onClick={() => setInspectedFeature(null)}>
          <aside className="detail-drawer" onClick={(event) => event.stopPropagation()}>
            <button className="icon-button close" title="Close details" onClick={() => setInspectedFeature(null)}><X size={18} /></button>
            <span>{inspectedFeature.category} · {inspectedFeature.priority}</span>
            <h2>{inspectedFeature.name}</h2>
            <p>{inspectedFeature.id} is owned by {inspectedFeature.owner} and contributes a distinct TypeScript module to the benchmark graph.</p>
            <dl>
              <div><dt>Calculated score</dt><dd>{formatDecimal(getFeatureScore(inspectedFeature))}</dd></div>
              <div><dt>Budget</dt><dd>{formatBudget(inspectedFeature.budget)}</dd></div>
              <div><dt>Complexity</dt><dd>{inspectedFeature.complexity}</dd></div>
              <div><dt>Status</dt><dd><span className={`status-pill ${inspectedFeature.status}`}>{inspectedFeature.status}</span></dd></div>
            </dl>
          </aside>
        </div>
      )}
    </div>
  )
}
