const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// registrar un nuevo usuario
const registro = async (req, res) => {
    try {
        const { nombre, email, password, rol } = req.body;

        // verificar si ya existe el email
        const existe = await User.findOne({ email });
        if (existe) {
            return res.status(400).json({ mensaje: "Ya existe un usuario con ese email" });
        }

        const nuevoUsuario = new User({ nombre, email, password, rol });
        await nuevoUsuario.save();

        res.status(201).json({ mensaje: "Usuario registrado correctamente" });

    } catch (error) {
        console.log("Error en registro: ", error);
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
}

// iniciar sesion
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const usuario = await User.findOne({ email });
        if (!usuario) {
            return res.status(400).json({ mensaje: "Email o contraseña incorrectos" });
        }

        const passwordCorrecta = await bcrypt.compare(password, usuario.password);
        if (!passwordCorrecta) {
            return res.status(400).json({ mensaje: "Email o contraseña incorrectos" });
        }

        const token = jwt.sign(
            { id: usuario._id, nombre: usuario.nombre, rol: usuario.rol },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        res.json({
            mensaje: "Login exitoso",
            token,
            usuario: {
                id: usuario._id,
                nombre: usuario.nombre,
                email: usuario.email,
                rol: usuario.rol
            }
        });

    } catch (error) {
        console.log("Error en login: ", error);
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
}

// ver mi perfil (ruta protegida)
const perfil = async (req, res) => {
    try {
        const usuario = await User.findById(req.usuario.id).select("-password");
        res.json({ usuario });
    } catch (error) {
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
}

module.exports = { registro, login, perfil };
