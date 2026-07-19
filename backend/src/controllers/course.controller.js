const Course = require("../models/course.model");

// listar todos los cursos
const listarCursos = async (req, res) => {
    try {
        const cursos = await Course.find();
        res.json({ total: cursos.length, cursos });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener los cursos" });
    }
}

// obtener un curso por id
const obtenerCurso = async (req, res) => {
    try {
        const curso = await Course.findById(req.params.id);
        if (!curso) {
            return res.status(404).json({ mensaje: "Curso no encontrado" });
        }
        res.json({ curso });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener el curso" });
    }
}

// crear un nuevo curso
const crearCurso = async (req, res) => {
    try {
        const { nombre, descripcion, creditos, cupoMaximo } = req.body;

        if (!nombre || !descripcion || !creditos || !cupoMaximo) {
            return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
        }

        const nuevoCurso = new Course({ nombre, descripcion, creditos, cupoMaximo });
        await nuevoCurso.save();

        res.status(201).json({ mensaje: "Curso creado correctamente", curso: nuevoCurso });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al crear el curso" });
    }
}

// actualizar un curso
const actualizarCurso = async (req, res) => {
    try {
        const curso = await Course.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!curso) {
            return res.status(404).json({ mensaje: "Curso no encontrado" });
        }

        res.json({ mensaje: "Curso actualizado correctamente", curso });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar el curso" });
    }
}

// eliminar un curso
const eliminarCurso = async (req, res) => {
    try {
        const curso = await Course.findByIdAndDelete(req.params.id);
        if (!curso) {
            return res.status(404).json({ mensaje: "Curso no encontrado" });
        }
        res.json({ mensaje: "Curso eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar el curso" });
    }
}

module.exports = { listarCursos, obtenerCurso, crearCurso, actualizarCurso, eliminarCurso };
