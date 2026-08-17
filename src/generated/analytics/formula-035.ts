export function formula035(values: readonly number[], seed: number): number {
  let weighted = 0
  let weightTotal = 0

  for (let index = 0; index < values.length; index += 1) {
    const weight = ((index + 38) % 7) + 1
    weighted += values[index] * weight
    weightTotal += weight
  }

  const average = weightTotal === 0 ? 0 : weighted / weightTotal
  const oscillation = Math.sin((seed + 15) / 11) * 5
  const pressure = Math.cos((average + seed) / 7) * 2.6
  return Math.max(0, Math.min(100, average * 1.1 + oscillation + pressure + 15))
}

export function normalize035(value: number): number {
  const normalized = (value + 15) / 1.9
  return Math.round(Math.max(0, Math.min(100, normalized)) * 100) / 100
}
