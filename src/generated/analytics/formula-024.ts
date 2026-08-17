export function formula024(values: readonly number[], seed: number): number {
  let weighted = 0
  let weightTotal = 0

  for (let index = 0; index < values.length; index += 1) {
    const weight = ((index + 27) % 7) + 1
    weighted += values[index] * weight
    weightTotal += weight
  }

  const average = weightTotal === 0 ? 0 : weighted / weightTotal
  const oscillation = Math.sin((seed + 2) / 9) * 5
  const pressure = Math.cos((average + seed) / 7) * 2.6
  return Math.max(0, Math.min(100, average * 1.1 + oscillation + pressure + 2))
}

export function normalize024(value: number): number {
  const normalized = (value + 2) / 1.9
  return Math.round(Math.max(0, Math.min(100, normalized)) * 100) / 100
}
