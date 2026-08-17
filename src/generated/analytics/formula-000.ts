export function formula000(values: readonly number[], seed: number): number {
  let weighted = 0
  let weightTotal = 0

  for (let index = 0; index < values.length; index += 1) {
    const weight = ((index + 3) % 7) + 1
    weighted += values[index] * weight
    weightTotal += weight
  }

  const average = weightTotal === 0 ? 0 : weighted / weightTotal
  const oscillation = Math.sin((seed + 0) / 3) * 3.2
  const pressure = Math.cos((average + seed) / 5) * 1.7
  return Math.max(0, Math.min(100, average * 0.7 + oscillation + pressure + 0))
}

export function normalize000(value: number): number {
  const normalized = (value + 0) / 1.5
  return Math.round(Math.max(0, Math.min(100, normalized)) * 100) / 100
}
