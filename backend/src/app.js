require("dotenv").config();


const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const hpp = require("hpp");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const conectarDB = require("./config/db");
const sanitizarEntradas = require("./middlewares/sanitize.middleware");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const courseRoutes = require("./routes/course.routes");
const enrollmentRoutes = require("./routes/enrollment.routes");

// conectar a la base de datos
conectarDB();

const app = express();


app.set("trust proxy", 1);


const origenesPermitidos = (process.env.CORS_ORIGINS || "http://localhost:5173,http://localhost:3000,http://localhost:4200")
    .split(",")
    .map((origen) => origen.trim());

app.use(
    cors({
        origin: (origen, callback) => {
            // permitimos peticiones sin origin
            if (!origen || origenesPermitidos.includes(origen)) {
                return callback(null, true);
            }
            return callback(new Error("Origen no permitido por CORS"));
        },
        credentials: true,
    })
);

// cabeceras de seguridad basicas 
app.use(helmet());


const limitadorGeneral = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 300,
    standardHeaders: true,
    legacyHeaders: false,
    message: { mensaje: "Demasiadas peticiones, intenta de nuevo mas tarde" },
});
app.use(limitadorGeneral);

// limite mas estricto solo para login/registro
const limitadorAuth = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    standardHeaders: true,
    legacyHeaders: false,
    message: { mensaje: "Demasiados intentos, espera unos minutos e intenta de nuevo" },
});

app.use(express.json({ limit: "10kb" })); // limitamos el tamaño del body


app.use(mongoSanitize());


app.use(hpp());


app.use(sanitizarEntradas);

// log de rutas solicitadas
app.use((req, res, next) => {
    console.log(`Ruta solicitada: ${req.method} ${req.url}`);
    next();
});

// rutas
app.use("/api/auth", limitadorAuth, authRoutes);
app.use("/api/usuarios", userRoutes);
app.use("/api/cursos", courseRoutes);
app.use("/api/inscripciones", enrollmentRoutes);

app.get("/", (req, res) => {
    res.json({ mensaje: "API de Gestion de Cursos e Inscripciones funcionando" });
});

// manejador de rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ mensaje: "Ruta no encontrada" });
});

// manejador de errores centralizado
app.use((err, req, res, next) => {
    console.error("Error no controlado: ", err.message);
    res.status(err.status || 500).json({ mensaje: err.message || "Error interno del servidor" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = app;
