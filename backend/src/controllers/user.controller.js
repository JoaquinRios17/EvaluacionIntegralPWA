const User = require("../models/user.model");

// listar todos los usuarios
const listarUsuarios = async (req, res) => {
    try {
        const usuarios = await User.find().select("-password");
        res.json({ total: usuarios.length, usuarios });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener los usuarios" });
    }
}

// obtener un usuario por id
const obtenerUsuario = async (req, res) => {
    try {
        const usuario = await User.findById(req.params.id).select("-password");
        if (!usuario) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }
        res.json({ usuario });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener el usuario" });
    }
}

// actualizar usuario
const actualizarUsuario = async (req, res) => {
    try {
        const { nombre, email, rol } = req.body;
        const usuario = await User.findByIdAndUpdate(
            req.params.id,
            { nombre, email, rol },
            { new: true }
        ).select("-password");

        if (!usuario) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        res.json({ mensaje: "Usuario actualizado", usuario });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar el usuario" });
    }
}

// eliminar usuario
const eliminarUsuario = async (req, res) => {
    try {
        const usuario = await User.findByIdAndDelete(req.params.id);
        if (!usuario) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }
        res.json({ mensaje: "Usuario eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar el usuario" });
    }
}

module.exports = { listarUsuarios, obtenerUsuario, actualizarUsuario, eliminarUsuario };
