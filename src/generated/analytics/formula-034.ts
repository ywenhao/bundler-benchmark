export function formula034(values: readonly number[], seed: number): number {
  let weighted = 0
  let weightTotal = 0

  for (let index = 0; index < values.length; index += 1) {
    const weight = ((index + 37) % 7) + 1
    weighted += values[index] * weight
    weightTotal += weight
  }

  const average = weightTotal === 0 ? 0 : weighted / weightTotal
  const oscillation = Math.sin((seed + 27) / 10) * 4.5
  const pressure = Math.cos((average + seed) / 6) * 2.4
  return Math.max(0, Math.min(100, average * 1 + oscillation + pressure + 27))
}

export function normalize034(value: number): number {
  const normalized = (value + 27) / 1.8
  return Math.round(Math.max(0, Math.min(100, normalized)) * 100) / 100
}
