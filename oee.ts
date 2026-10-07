export function calculateOEE(input: {
  plannedMinutes: number;
  downtimeMinutes: number;
  totalCount: number;
  goodCount: number;
  idealCycleSeconds: number;
}) {
  const runMinutes = Math.max(0, input.plannedMinutes - input.downtimeMinutes);
  const availability = input.plannedMinutes ? runMinutes / input.plannedMinutes : 0;
  const performance = runMinutes > 0
    ? (input.idealCycleSeconds * input.totalCount) / (runMinutes * 60)
    : 0;
  const quality = input.totalCount > 0 ? input.goodCount / input.totalCount : 0;
  const oee = availability * performance * quality;

  return {
    availability: Math.min(1, Math.max(0, availability)),
    performance: Math.min(1, Math.max(0, performance)),
    quality: Math.min(1, Math.max(0, quality)),
    oee: Math.min(1, Math.max(0, oee)),
  };
}
