const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String, required: true },
    rol: {
      type: String,
      enum: ["administrador", "docente", "estudiante"],
      default: "estudiante",
    },
  }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const passwordEncriptada = await bcrypt.hash(this.password, 10);
  this.password = passwordEncriptada;

  next();
});

module.exports = mongoose.model("User", UserSchema);
