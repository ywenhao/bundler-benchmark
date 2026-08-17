export function formula036(values: readonly number[], seed: number): number {
  let weighted = 0
  let weightTotal = 0

  for (let index = 0; index < values.length; index += 1) {
    const weight = ((index + 39) % 7) + 1
    weighted += values[index] * weight
    weightTotal += weight
  }

  const average = weightTotal === 0 ? 0 : weighted / weightTotal
  const oscillation = Math.sin((seed + 3) / 3) * 5
  const pressure = Math.cos((average + seed) / 8) * 2.6
  return Math.max(0, Math.min(100, average * 1.1 + oscillation + pressure + 3))
}

export function normalize036(value: number): number {
  const normalized = (value + 3) / 1.9
  return Math.round(Math.max(0, Math.min(100, normalized)) * 100) / 100
}
