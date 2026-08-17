import { formatDistanceToNowStrict } from 'date-fns'

const integer = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 })
const decimal = new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 })

export function formatInteger(value: number): string {
  return integer.format(value)
}

export function formatDecimal(value: number): string {
  return decimal.format(value)
}

export function formatBudget(value: number): string {
  return `$${decimal.format(value)}k`
}

export function formatRelativeDate(value: string): string {
  return formatDistanceToNowStrict(new Date(value), { addSuffix: true })
}

