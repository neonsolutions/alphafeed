export function computeSignificance({
  impact = 0,
  novelty = 0,
  reliability = 0,
  relevance = 0,
}: {
  impact?: number
  novelty?: number
  reliability?: number
  relevance?: number
}) {
  return (impact + novelty + relevance) / 3
}
