import express from "express";
import cors from "cors";
import routesRouter from "./http/routes";
import complianceRouter from "./http/compliance";
import bankingRouter from "./http/banking";
import poolsRouter from "./http/pools";

const app = express();
app.use(cors());
app.use(express.json());

// health
app.get("/", (req, res) => {
  res.send("FuelEU Backend Running 🚢🔥");
});

// Routes grouped under APIs
app.use("/routes", routesRouter);
app.use("/compliance", complianceRouter);
app.use("/banking", bankingRouter);
app.use("/pools", poolsRouter);

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
