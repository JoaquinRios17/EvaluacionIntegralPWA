const { body, validationResult } = require("express-validator");

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

const validarCurso = [
    body("nombre").trim().notEmpty().withMessage("El nombre del curso es obligatorio")
        .isLength({ max: 100 }).withMessage("El nombre es demasiado largo"),
    body("descripcion").trim().notEmpty().withMessage("La descripcion es obligatoria")
        .isLength({ max: 500 }).withMessage("La descripcion es demasiado larga"),
    body("creditos").isInt({ min: 1, max: 10 }).withMessage("Los creditos deben ser un numero entre 1 y 10"),
    body("cupoMaximo").isInt({ min: 1 }).withMessage("El cupo maximo debe ser un numero mayor a 0"),
    validar,
];

module.exports = { validarCurso };
