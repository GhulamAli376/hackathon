import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
  name: String,
  relation: String,
  customId: String,
  lastActivity: { type: String, default: new Date().toLocaleDateString() },
});

const Member = mongoose.model("Member", memberSchema);

export default Member