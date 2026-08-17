export function formula022(values: readonly number[], seed: number): number {
  let weighted = 0
  let weightTotal = 0

  for (let index = 0; index < values.length; index += 1) {
    const weight = ((index + 25) % 7) + 1
    weighted += values[index] * weight
    weightTotal += weight
  }

  const average = weightTotal === 0 ? 0 : weighted / weightTotal
  const oscillation = Math.sin((seed + 26) / 7) * 5
  const pressure = Math.cos((average + seed) / 5) * 2.6
  return Math.max(0, Math.min(100, average * 1.1 + oscillation + pressure + 26))
}

export function normalize022(value: number): number {
  const normalized = (value + 26) / 1.9
  return Math.round(Math.max(0, Math.min(100, normalized)) * 100) / 100
}
