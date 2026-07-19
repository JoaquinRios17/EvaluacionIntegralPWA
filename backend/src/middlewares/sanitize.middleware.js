const sanitizeHtml = require("sanitize-html");

// recorre el body de la peticion y limpia cualquier tag html/script
// que alguien intente meter en un campo de texto (ej: nombre, descripcion)
// esto es una capa basica contra XSS almacenado
function limpiarObjeto(obj) {
    if (!obj || typeof obj !== "object") return;

    for (const llave of Object.keys(obj)) {
        const valor = obj[llave];

        if (typeof valor === "string") {
            obj[llave] = sanitizeHtml(valor, {
                allowedTags: [],
                allowedAttributes: {},
            }).trim();
        } else if (typeof valor === "object" && valor !== null) {
            limpiarObjeto(valor);
        }
    }
}

const sanitizarEntradas = (req, res, next) => {
    limpiarObjeto(req.body);
    limpiarObjeto(req.query);
    limpiarObjeto(req.params);
    next();
};

module.exports = sanitizarEntradas;
