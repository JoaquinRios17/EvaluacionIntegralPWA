const express = require("express");
const router = express.Router();
const { inscribirse, listarInscripciones, cancelarInscripcion } = require("../controllers/enrollment.controller");
const verificarToken = require("../middlewares/auth.middleware");
const verificarRol = require("../middlewares/role.middleware");

// el estudiante se inscribe, el admin puede ver todas las inscripciones
router.post("/", verificarToken, verificarRol("estudiante", "administrador"), inscribirse);
router.get("/", verificarToken, listarInscripciones);
router.delete("/:id", verificarToken, cancelarInscripcion);

module.exports = router;
