export interface PoolMember {
  shipId: string;
  cb: number; // original compliance balance
}

export interface PoolResult {
  shipId: string;
  cbBefore: number;
  cbAfter: number;
}

/**
 * Implements Article 21 Greedy Pool Allocation
 */
export function createPool(members: PoolMember[]): PoolResult[] {
  // Copy to avoid mutation
  const ships = members.map(m => ({
    shipId: m.shipId,
    cbBefore: m.cb,
    cbAfter: m.cb
  }));

  // Step 1: Total CB must be >= 0
  const total = ships.reduce((s, x) => s + x.cbBefore, 0);
  if (total < 0) {
    throw new Error("Invalid pool: total CB must be >= 0");
  }

  // Step 2: Sort ships by CB descending (surplus first)
  ships.sort((a, b) => b.cbBefore - a.cbBefore);

  // Step 3: Greedy distribution
  for (let i = 0; i < ships.length; i++) {
    const surplusShip = ships[i];
    if (surplusShip.cbAfter <= 0) continue;

    for (let j = 0; j < ships.length; j++) {
      const deficitShip = ships[j];
      if (deficitShip.cbAfter >= 0) continue;

      const transferable = Math.min(surplusShip.cbAfter, Math.abs(deficitShip.cbAfter));

      surplusShip.cbAfter -= transferable;
      deficitShip.cbAfter += transferable;

      if (deficitShip.cbAfter === 0) continue;
    }
  }

  // Step 4: Validation: No surplus ship can go negative
  if (ships.some(s => s.cbAfter < 0 && s.cbBefore >= 0)) {
    throw new Error("Invalid pool: surplus ship cannot become negative");
  }

  return ships;
}
