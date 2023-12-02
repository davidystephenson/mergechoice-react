export default function comparePercent ({
  maximum,
  minimum,
  target
}: {
  maximum: number
  minimum: number
  target: number
}): number {
  const difference = maximum - minimum
  const ratio = difference / target
  const scaled = ratio * 100
  const rounded = Math.round(scaled)
  return rounded
}
