export function distributePoints(totalPoints, rounds) {
  const base = Math.floor(totalPoints / rounds);
  const remainder = totalPoints % rounds;

  const pointsPerRound = Array.from({ length: rounds }, (_, i) =>
    i < remainder ? base + 1 : base
  );

  return pointsPerRound;
}
