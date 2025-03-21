import mongoose, { mongo } from "mongoose";

const agentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
  },
  phone: {
    type: String,
    required: [true, "phone number required"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  tasks: {
    type: [],
  },
});

export const Agent = mongoose.model("Agent", agentSchema);
