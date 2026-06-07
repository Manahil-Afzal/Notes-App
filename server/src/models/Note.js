const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, default: "" },
    content: { type: String, default: "" },
    imageDataUrl: { type: String, default: null },
    color: { type: String, default: "#F79D45" }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Note", noteSchema);

