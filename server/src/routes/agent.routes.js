import { Router } from "express";
import { agentLogin, getTasks } from "../controller/agent.controller.js";
import { authenticateToken } from "../middlewear/auth.middlewear.js";

const agentRouter = Router();

agentRouter.post("/login", agentLogin);
agentRouter.get("/tasks", authenticateToken, getTasks);

export default agentRouter;
