export function formula023(values: readonly number[], seed: number): number {
  let weighted = 0
  let weightTotal = 0

  for (let index = 0; index < values.length; index += 1) {
    const weight = ((index + 26) % 7) + 1
    weighted += values[index] * weight
    weightTotal += weight
  }

  const average = weightTotal === 0 ? 0 : weighted / weightTotal
  const oscillation = Math.sin((seed + 14) / 8) * 5
  const pressure = Math.cos((average + seed) / 6) * 2.6
  return Math.max(0, Math.min(100, average * 1.1 + oscillation + pressure + 14))
}

export function normalize023(value: number): number {
  const normalized = (value + 14) / 1.9
  return Math.round(Math.max(0, Math.min(100, normalized)) * 100) / 100
}
