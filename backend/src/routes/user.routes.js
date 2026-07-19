const express = require("express");
const router = express.Router();
const { listarUsuarios, obtenerUsuario, actualizarUsuario, eliminarUsuario } = require("../controllers/user.controller");
const verificarToken = require("../middlewares/auth.middleware");
const verificarRol = require("../middlewares/role.middleware");

router.get("/", verificarToken, verificarRol("administrador"), listarUsuarios);
router.get("/:id", verificarToken, verificarRol("administrador"), obtenerUsuario);
router.put("/:id", verificarToken, verificarRol("administrador"), actualizarUsuario);
router.delete("/:id", verificarToken, verificarRol("administrador"), eliminarUsuario);

module.exports = router;
