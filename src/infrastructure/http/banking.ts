import { Router } from "express";

const router = Router();

/**
 * Simple in-memory ledger for bank entries.
 * Each entry: { id, shipId, year, amountGCO2eq, createdAt }
 */
let nextId = 1;
const bankEntries: { id: number; shipId: string; year: number; amountGCO2eq: number; createdAt: string }[] = [];

/** Helper: sum available bank for ship+year */
function availableBank(shipId: string, year: number) {
  return bankEntries
    .filter(e => e.shipId === shipId && e.year === year)
    .reduce((s, e) => s + e.amountGCO2eq, 0);
}

/** GET /banking/records?shipId=R001&year=2025 */
router.get("/records", (req, res) => {
  const shipId = String(req.query.shipId || "");
  const year = Number(req.query.year || new Date().getFullYear());
  const rows = bankEntries.filter(e => e.shipId === shipId && e.year === year);
  res.json(rows);
});

/** POST /banking/bank
 *  Body: { shipId: string, year: number, amount: number }
 *  amount must be > 0
 */
router.post("/bank", (req, res) => {
  const { shipId, year, amount } = req.body ?? {};
  if (!shipId || typeof amount !== "number" || amount <= 0) {
    return res.status(400).json({ error: "Invalid payload. shipId and positive amount required." });
  }
  const entry = { id: nextId++, shipId, year: Number(year), amountGCO2eq: amount, createdAt: new Date().toISOString() };
  bankEntries.push(entry);
  return res.json({ message: "Banked", entry, availableAfter: availableBank(shipId, Number(year)) });
});

/** POST /banking/apply
 *  Body: { shipId: string, year: number, amount: number }
 *  amount must be > 0 and <= available
 */
router.post("/apply", (req, res) => {
  const { shipId, year, amount } = req.body ?? {};
  if (!shipId || typeof amount !== "number" || amount <= 0) {
    return res.status(400).json({ error: "Invalid payload. shipId and positive amount required." });
  }
  const avail = availableBank(shipId, Number(year));
  if (amount > avail) {
    return res.status(400).json({ error: "Insufficient banked amount", available: avail });
  }
  // ledger entry as negative amount
  const entry = { id: nextId++, shipId, year: Number(year), amountGCO2eq: -amount, createdAt: new Date().toISOString() };
  bankEntries.push(entry);
  return res.json({ message: "Applied", entry, availableAfter: availableBank(shipId, Number(year)) });
});

export default router;
