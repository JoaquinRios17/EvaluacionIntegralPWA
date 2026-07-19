const express = require("express");
const router = express.Router();
const { listarCursos, obtenerCurso, crearCurso, actualizarCurso, eliminarCurso } = require("../controllers/course.controller");
const verificarToken = require("../middlewares/auth.middleware");
const verificarRol = require("../middlewares/role.middleware");
const { validarCurso } = require("../middlewares/courseValidators.middleware");

// ruta publica sin necesidad de iniciar sesion
router.get("/publico", listarCursos);
router.get("/publico/:id", obtenerCurso);

// cualquier usuario autenticado puede ver los cursos
router.get("/", verificarToken, listarCursos);
router.get("/:id", verificarToken, obtenerCurso);

//solo el admin va a poder crear editar y eliminar
router.post("/", verificarToken, verificarRol("administrador"), validarCurso, crearCurso);
router.put("/:id", verificarToken, verificarRol("administrador"), validarCurso, actualizarCurso);
router.delete("/:id", verificarToken, verificarRol("administrador"), eliminarCurso);

module.exports = router;
