const mongoose = require("mongoose");

const msgSchema = mongoose.Schema(
  {
    msg: {
      text: { type: String, required: true },
    },
    usuarios: Array,
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Mensaje", msgSchema);
