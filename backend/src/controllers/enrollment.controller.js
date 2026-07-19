const Enrollment = require("../models/enrollment.model");
const Course = require("../models/course.model");

// inscribir a un estudiante en un curso
const inscribirse = async (req, res) => {
    try {
        const { cursoId } = req.body;
        const estudianteId = req.usuario.id;

        // verificar si el curso existe
        const curso = await Course.findById(cursoId);
        if (!curso) {
            return res.status(404).json({ mensaje: "Curso no encontrado" });
        }

        // verificar si ya esta inscrito
        const yaInscrito = await Enrollment.findOne({ estudiante: estudianteId, curso: cursoId });
        if (yaInscrito) {
            return res.status(400).json({ mensaje: "Ya estas inscrito en este curso" });
        }

        const nuevaInscripcion = new Enrollment({
            estudiante: estudianteId,
            curso: cursoId
        });
        await nuevaInscripcion.save();

        res.status(201).json({ mensaje: "Inscripcion realizada correctamente", inscripcion: nuevaInscripcion });
    } catch (error) {
        console.log("Error en inscripcion: ", error);
        res.status(500).json({ mensaje: "Error al realizar la inscripcion" });
    }
}

// listar inscripciones
const listarInscripciones = async (req, res) => {
    try {
        let inscripciones;

        // si es estudiante solo ve las suyas
        if (req.usuario.rol === "estudiante") {
            inscripciones = await Enrollment.find({ estudiante: req.usuario.id })
                .populate("estudiante", "nombre email")
                .populate("curso", "nombre creditos");
        } else {
            // administrador ve todas
            inscripciones = await Enrollment.find()
                .populate("estudiante", "nombre email")
                .populate("curso", "nombre creditos");
        }

        res.json({ total: inscripciones.length, inscripciones });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener las inscripciones" });
    }
}

// cancelar una inscripcion (salirse de un curso)
const cancelarInscripcion = async (req, res) => {
    try {
        const { id } = req.params;
        const estudianteId = req.usuario.id;

        const inscripcion = await Enrollment.findById(id);

        if (!inscripcion) {
            return res.status(404).json({ mensaje: "Inscripcion no encontrada" });
        }

        // solo el mismo estudiante (o un administrador) puede cancelar su inscripcion
        if (req.usuario.rol === "estudiante" && inscripcion.estudiante.toString() !== estudianteId) {
            return res.status(403).json({ mensaje: "No puedes cancelar la inscripcion de otro estudiante" });
        }

        await Enrollment.findByIdAndDelete(id);

        res.json({ mensaje: "Inscripcion cancelada correctamente" });
    } catch (error) {
        console.log("Error al cancelar inscripcion: ", error);
        res.status(500).json({ mensaje: "Error al cancelar la inscripcion" });
    }
}

module.exports = { inscribirse, listarInscripciones, cancelarInscripcion };
