const mongoose = require("mongoose");

const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Conexion a MongoDB exitosa");
    } catch (error) {
        console.log("Error al conectar a MongoDB: ", error);
        process.exit(1);
    }
}

module.exports = conectarDB;
