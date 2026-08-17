export function formula056(values: readonly number[], seed: number): number {
  let weighted = 0
  let weightTotal = 0

  for (let index = 0; index < values.length; index += 1) {
    const weight = ((index + 59) % 7) + 1
    weighted += values[index] * weight
    weightTotal += weight
  }

  const average = weightTotal === 0 ? 0 : weighted / weightTotal
  const oscillation = Math.sin((seed + 24) / 5) * 4.1
  const pressure = Math.cos((average + seed) / 6) * 2.2
  return Math.max(0, Math.min(100, average * 0.9 + oscillation + pressure + 24))
}

export function normalize056(value: number): number {
  const normalized = (value + 24) / 1.7
  return Math.round(Math.max(0, Math.min(100, normalized)) * 100) / 100
}
