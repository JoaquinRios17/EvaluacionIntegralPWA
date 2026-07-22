const mongoose = require("mongoose");

const EnrollmentSchema = new mongoose.Schema(
  {
    estudiante: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    curso: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    estado: {
      type: String,
      default: "inscrito",
      enum: ["inscrito", "retirado"],
    },
    fechaInscripcion: {
      type: Date,
      default: () => new Date(),
    },
  }
);

module.exports = mongoose.model("Enrollment", EnrollmentSchema);

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);

module.exports = Enrollment;
