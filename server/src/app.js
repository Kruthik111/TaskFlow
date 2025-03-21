import express from "express";
import cors from "cors";
import { authenticateToken } from "./middlewear/auth.middlewear.js";
import adminRouter from "./routes/admin.routes.js";
import agentRouter from "./routes/agent.routes.js";

const app = express();

app.use(
  cors({
    // origin: process.env.CORS_ORIGIN,
    origin: "http://localhost:5173",
    // credentials: true,
    optionsSuccessStatus: 200,
  }),
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use("/admin", adminRouter);
app.use("/agent", agentRouter);

app.get("/", (req, res) => {
  res.send({
    name: "hello",
  });
});

export { app };
