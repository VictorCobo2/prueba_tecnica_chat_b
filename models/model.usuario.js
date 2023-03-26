const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
  usuario: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max: 50,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  avatar: {
    type: Boolean,
    default: false,
  },
  avatar_image: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Usuario", usuarioSchema);
