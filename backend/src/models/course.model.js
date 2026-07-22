const { Schema, model } = require("mongoose");

const CourseSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String,
      required: true,
    },
    creditos: {
      type: Number,
      required: true,
    },
    cupoMaximo: {
      type: Number,
      required: true,
    },
    estado: {
      type: String,
      enum: ["activo", "inactivo"],
      default: "activo",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Course", CourseSchema);
