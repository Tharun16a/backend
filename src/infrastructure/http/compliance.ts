import { Router } from "express";
import { computeCB } from "../../core/application/computeCB";
import routesRouter from "./routes"; // but we cannot import array directly

// Re-import the ROUTES array manually
// (Later we move ROUTES into a repository)
const ROUTES = [
  { id: 1, routeId: "R001", vesselType: "Container", fuelType: "HFO", year: 2024, ghgIntensity: 91.0, fuelConsumption: 5000 },
  { id: 2, routeId: "R002", vesselType: "BulkCarrier", fuelType: "LNG", year: 2024, ghgIntensity: 88.0, fuelConsumption: 4800 },
  { id: 3, routeId: "R003", vesselType: "Tanker", fuelType: "MGO", year: 2024, ghgIntensity: 93.5, fuelConsumption: 5100 },
  { id: 4, routeId: "R004", vesselType: "RoRo", fuelType: "HFO", year: 2025, ghgIntensity: 89.2, fuelConsumption: 4900 },
  { id: 5, routeId: "R005", vesselType: "Container", fuelType: "LNG", year: 2025, ghgIntensity: 90.5, fuelConsumption: 4950 }
];

const router = Router();

/**
 * GET /compliance/cb?routeId=R001
 */
router.get("/cb", (req, res) => {
  const routeId = req.query.routeId as string;

  if (!routeId) {
    return res.status(400).json({ error: "routeId query parameter is required" });
  }

  const route = ROUTES.find(r => r.routeId === routeId);

  if (!route) {
    return res.status(404).json({ error: "Route not found" });
  }

  const result = computeCB(route.ghgIntensity, route.fuelConsumption);

  return res.json({
    route,
    ...result
  });
});

export default router;
