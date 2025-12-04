import { Router } from "express";
import { createPool } from "../../core/application/createPool";

const router = Router();

/**
 * POST /pools
 * Body: { members: [{ shipId, cb }] }
 */
router.post("/", (req, res) => {
  const { members } = req.body;

  if (!Array.isArray(members) || members.length === 0) {
    return res.status(400).json({ error: "members array required" });
  }

  try {
    const result = createPool(members);
    return res.json({ result });
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
});

export default router;
