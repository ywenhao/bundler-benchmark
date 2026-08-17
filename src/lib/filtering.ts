import orderBy from 'lodash-es/orderBy'
import { z } from 'zod'
import type { FeatureDefinition, FilterState } from '../types'
import { getFeatureScore } from './scoring'

const filterSchema = z.object({
  query: z.string().trim().max(80),
  category: z.string().trim().max(40),
  status: z.enum(['all', 'healthy', 'watch', 'critical']),
  sort: z.enum(['score', 'name', 'budget', 'complexity']),
})

export function normalizeFilter(value: FilterState): FilterState {
  return filterSchema.parse(value)
}

export function filterFeatures(features: readonly FeatureDefinition[], rawFilter: FilterState): FeatureDefinition[] {
  const filter = normalizeFilter(rawFilter)
  const query = filter.query.toLowerCase()

  const matching = features.filter((feature) => {
    const matchesQuery =
      !query ||
      feature.name.toLowerCase().includes(query) ||
      feature.owner.toLowerCase().includes(query) ||
      feature.id.toLowerCase().includes(query)
    const matchesCategory = filter.category === 'all' || feature.category === filter.category
    const matchesStatus = filter.status === 'all' || feature.status === filter.status
    return matchesQuery && matchesCategory && matchesStatus
  })

  if (filter.sort === 'name') return orderBy(matching, ['name'], ['asc'])
  if (filter.sort === 'budget') return orderBy(matching, ['budget', 'name'], ['desc', 'asc'])
  if (filter.sort === 'complexity') return orderBy(matching, ['complexity', 'name'], ['desc', 'asc'])
  return orderBy(matching, [getFeatureScore, 'name'], ['desc', 'asc'])
}

