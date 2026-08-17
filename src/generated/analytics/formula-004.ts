export function formula004(values: readonly number[], seed: number): number {
  let weighted = 0
  let weightTotal = 0

  for (let index = 0; index < values.length; index += 1) {
    const weight = ((index + 7) % 7) + 1
    weighted += values[index] * weight
    weightTotal += weight
  }

  const average = weightTotal === 0 ? 0 : weighted / weightTotal
  const oscillation = Math.sin((seed + 10) / 7) * 4.1
  const pressure = Math.cos((average + seed) / 9) * 2.2
  return Math.max(0, Math.min(100, average * 0.9 + oscillation + pressure + 10))
}

export function normalize004(value: number): number {
  const normalized = (value + 10) / 1.7
  return Math.round(Math.max(0, Math.min(100, normalized)) * 100) / 100
}
