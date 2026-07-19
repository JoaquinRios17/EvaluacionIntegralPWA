const { body, validationResult } = require("express-validator");

// si alguna validacion fallo, cortamos aqui y devolvemos un mensaje claro
const validar = (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({
            mensaje: "Datos invalidos",
            errores: errores.array().map((e) => e.msg),
        });
    }
    next();
};

const validarRegistro = [
    body("nombre").trim().notEmpty().withMessage("El nombre es obligatorio")
        .isLength({ min: 2, max: 60 }).withMessage("El nombre debe tener entre 2 y 60 caracteres"),
    body("email").trim().isEmail().withMessage("El email no es valido").normalizeEmail(),
    body("password").isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres"),
    body("rol").optional().isIn(["administrador", "docente", "estudiante"]).withMessage("Rol invalido"),
    validar,
];

const validarLogin = [
    body("email").trim().isEmail().withMessage("El email no es valido").normalizeEmail(),
    body("password").notEmpty().withMessage("La contraseña es obligatoria"),
    validar,
];

module.exports = { validarRegistro, validarLogin, validar };
