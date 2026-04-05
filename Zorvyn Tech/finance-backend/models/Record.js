const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  amount: Number,

  type: {
    type: String,
    enum: ["income", "expense"],
  },

  category: String,
  note: String,

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Record", recordSchema);
