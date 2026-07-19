const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    creditos: {
        type: Number,
        required: true
    },
    cupoMaximo: {
        type: Number,
        required: true
    },
    estado: {
        type: String,
        enum: ["activo", "inactivo"],
        default: "activo"
    }
}, { timestamps: true });

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
