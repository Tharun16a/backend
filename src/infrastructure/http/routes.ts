import { Router } from "express";

const router = Router();

/**
 * Temporary in-memory dataset (we'll replace with DB later)
 */
const ROUTES = [
  { id: 1, routeId: "R001", vesselType: "Container", fuelType: "HFO", year: 2024, ghgIntensity: 91.0, fuelConsumption: 5000, distanceKm: 12000, totalEmissions: 4500, isBaseline: true },
  { id: 2, routeId: "R002", vesselType: "BulkCarrier", fuelType: "LNG", year: 2024, ghgIntensity: 88.0, fuelConsumption: 4800, distanceKm: 11500, totalEmissions: 4200, isBaseline: false },
  { id: 3, routeId: "R003", vesselType: "Tanker", fuelType: "MGO", year: 2024, ghgIntensity: 93.5, fuelConsumption: 5100, distanceKm: 12500, totalEmissions: 4700, isBaseline: false },
  { id: 4, routeId: "R004", vesselType: "RoRo", fuelType: "HFO", year: 2025, ghgIntensity: 89.2, fuelConsumption: 4900, distanceKm: 11800, totalEmissions: 4300, isBaseline: false },
  { id: 5, routeId: "R005", vesselType: "Container", fuelType: "LNG", year: 2025, ghgIntensity: 90.5, fuelConsumption: 4950, distanceKm: 11900, totalEmissions: 4400, isBaseline: false },
];

// GET /routes - return all routes
router.get("/", (req, res) => {
  res.json(ROUTES);
});

// POST /routes/:id/baseline - set baseline (in-memory)
router.post("/:id/baseline", (req, res) => {
  const id = Number(req.params.id);
  const found = ROUTES.find(r => r.id === id);
  if (!found) return res.status(404).json({ error: "Route not found" });

  // clear existing baseline
  ROUTES.forEach(r => (r.isBaseline = false));
  found.isBaseline = true;
  res.json(found);
});

// GET /routes/comparison - baseline vs others
router.get("/comparison", (req, res) => {
  const baseline = ROUTES.find(r => r.isBaseline);
  if (!baseline) return res.status(400).json({ error: "No baseline set" });

  const comparisons = ROUTES.filter(r => r.id !== baseline.id).map(r => {
    const percentDiff = ((r.ghgIntensity / baseline.ghgIntensity) - 1) * 100;
    const compliant = r.ghgIntensity <= 89.3368; // target per assignment
    return { route: r, percentDiff, compliant };
  });

  res.json({ baseline, comparisons });
});

export default router;
