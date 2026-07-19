const express = require("express");
const router = express.Router();
const { registro, login, perfil } = require("../controllers/auth.controller");
const verificarToken = require("../middlewares/auth.middleware");
const { validarRegistro, validarLogin } = require("../middlewares/authValidators.middleware");

router.post("/registro", validarRegistro, registro);
router.post("/login", validarLogin, login);
router.get("/perfil", verificarToken, perfil);

module.exports = router;
