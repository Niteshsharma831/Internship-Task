const mongoose = require("mongoose");
const SessionSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: { type: String, required: true },
  tags: { type: [String], default: [] },
  json_file_url: { type: String },
  status: { type: String, enum: ["draft", "published"], default: "draft" },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});
SessionSchema.index({ user_id: 1, status: 1 });
module.exports = mongoose.model("Session", SessionSchema);
