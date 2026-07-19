const verificarRol = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.usuario.rol)) {
            return res.status(403).json({ mensaje: "No tienes permisos para hacer esto" });
        }
        next();
    }
}

module.exports = verificarRol;
