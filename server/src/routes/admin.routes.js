import { Router } from "express";
import {
  adminLogin,
  createAgent,
  getAgents,
} from "../controller/admin.controller.js";
import { authenticateToken } from "../middlewear/auth.middlewear.js";

const adminRouter = Router();

adminRouter.post("/login", adminLogin);
adminRouter.post("/create/agent", authenticateToken, createAgent);
adminRouter.get("/get/agent", authenticateToken, getAgents);

export default adminRouter;
