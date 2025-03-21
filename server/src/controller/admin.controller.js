import jwt from "jsonwebtoken";
import { Admin } from "../models/admin.model.js";
import { Agent } from "../models/agent.model.js";

async function adminLogin(req, res) {
  const { email, password } = req.body;
  const data = await Admin.findOne({ email: email });
  // If admin not present in databse
  if (!data) {
    res.status(404).send({ error: "Admin not present" });
    return;
  }

  // If password provided is incorrect
  if (data.password !== password) {
    res.status(401).json({ error: "Invalid password" });
    return;
  }
  const user = { _id: data._id, username: data.username, admin: true };
  const token = jwt.sign(user, process.env.SECRET_KEY, { expiresIn: "1h" });

  res.json({ token });
}

export { adminLogin };

async function createAgent(req, res) {
  const { name, email, phone, password } = req.body;
  // check whether all the data are present
  if (!name || !email || !phone || !password) {
    res.status(400).send({ error: "Required fields not provided" });
    return;
  }

  const agent = await Agent.findOne({ email: email });
  if (agent) {
    res.status(400).send({ error: "Agent with this email already present" });
    return;
  }
  const NewAgent = new Agent({
    name: name,
    email: email,
    phone: phone,
    password: password,
  });

  const agentInstance = await NewAgent.save();

  res.status(200).json(agentInstance);
}
export { createAgent };

async function getAgents(req, res) {
  const agents = await Agent.find().select("-password");
  if (!agents) {
    res.status(404).send({ error: "No agent present" });
    return;
  }
  res.status(200).json(agents);
}

export { getAgents };
