export const ENERGY_PER_TON_MJ = 41000; // MJ per ton (assignment constant)
export const TARGET_INTENSITY = 89.3368; // gCO2e/MJ (2025 target)

export function computeCB(ghgIntensity: number, fuelConsumption: number) {
  // energy in scope
  const energy = fuelConsumption * ENERGY_PER_TON_MJ;

  // compliance balance
  const cb = (TARGET_INTENSITY - ghgIntensity) * energy;

  return {
    energyInScope: energy,
    cb,
  };
}
