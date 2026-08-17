import { LayoutList, Search } from 'lucide-react'
import type { Density, FeatureStatus, FilterState, SortKey } from '../types'

interface FilterBarProps {
  categories: readonly string[]
  density: Density
  filter: FilterState
  onDensityChange: (density: Density) => void
  onFilterChange: (filter: FilterState) => void
}

export function FilterBar({ categories, density, filter, onDensityChange, onFilterChange }: FilterBarProps) {
  const update = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    onFilterChange({ ...filter, [key]: value })
  }

  return (
    <section className="filter-bar" aria-label="Feature filters">
      <label className="search-field">
        <Search size={17} />
        <input
          value={filter.query}
          onChange={(event) => update('query', event.target.value)}
          placeholder="Search feature, owner, or ID"
        />
      </label>
      <label>
        <span>Category</span>
        <select value={filter.category} onChange={(event) => update('category', event.target.value)}>
          <option value="all">All categories</option>
          {categories.map((category) => <option key={category}>{category}</option>)}
        </select>
      </label>
      <label>
        <span>Status</span>
        <select value={filter.status} onChange={(event) => update('status', event.target.value as FeatureStatus | 'all')}>
          <option value="all">All statuses</option>
          <option value="healthy">Healthy</option>
          <option value="watch">Watch</option>
          <option value="critical">Critical</option>
        </select>
      </label>
      <label>
        <span>Sort</span>
        <select value={filter.sort} onChange={(event) => update('sort', event.target.value as SortKey)}>
          <option value="score">Score</option>
          <option value="name">Name</option>
          <option value="budget">Budget</option>
          <option value="complexity">Complexity</option>
        </select>
      </label>
      <div className="density-control" aria-label="Row density">
        <LayoutList size={17} />
        <button className={density === 'comfortable' ? 'active' : ''} onClick={() => onDensityChange('comfortable')}>Comfort</button>
        <button className={density === 'compact' ? 'active' : ''} onClick={() => onDensityChange('compact')}>Compact</button>
      </div>
    </section>
  )
}

