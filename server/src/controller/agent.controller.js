import { Agent } from "../models/agent.model.js";
import jwt from "jsonwebtoken";

async function agentLogin(req, res) {
  const { email, password } = req.body;
  const data = await Agent.findOne({ email: email });
  // If admin not present in databse
  if (!data) {
    res.status(404).send({ error: "Agent not present" });
    return;
  }

  // If password provided is incorrect
  if (data.password !== password) {
    res.status(401).json({ error: "Invalid password" });
    return;
  }
  const user = { _id: data._id, username: data.username, admin: false };
  const token = jwt.sign(user, process.env.SECRET_KEY, { expiresIn: "1h" });

  res.json({ token });
}

export { agentLogin };

async function getTasks(req, res) {}

export { getTasks };
