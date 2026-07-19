const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema({
    estudiante: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    curso: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    },
    estado: {
        type: String,
        enum: ["inscrito", "retirado"],
        default: "inscrito"
    },
    fechaInscripcion: {
        type: Date,
        default: Date.now
    }
});

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);

module.exports = Enrollment;
