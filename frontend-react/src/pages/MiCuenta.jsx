import { useState, useEffect } from "react";
import { obtenerMisInscripciones, cancelarInscripcion } from "../api/inscripcionesApi";
import { useAuth } from "../context/AuthContext";

export default function MiCuenta() {

    const [inscripciones, setInscripciones] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");
    const [mensaje, setMensaje] = useState("");

    const { usuario, token } = useAuth();

    useEffect(() => {
        async function cargarInscripciones() {
            try {
                const datos = await obtenerMisInscripciones(token);
                setInscripciones(datos);
            } catch (err) {
                setError(err.message);
            } finally {
                setCargando(false);
            }
        }

        cargarInscripciones();
    }, [token]);

    const handleCancelar = async (id) => {
        setMensaje("");
        setError("");

        try {
            await cancelarInscripcion(id, token);
            setMensaje("Te saliste del curso correctamente");
            // quitamos la inscripcion de la lista sin tener que recargar la pagina
            setInscripciones(inscripciones.filter((i) => i._id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="contenedor">
            <h2>Mi Cuenta</h2>
            <p><strong>Nombre:</strong> {usuario.nombre}</p>
            <p><strong>Email:</strong> {usuario.email}</p>
            <p><strong>Rol:</strong> {usuario.rol}</p>

            <h3>Mis inscripciones</h3>

            {cargando && <p>Cargando inscripciones...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {mensaje && <p style={{ color: "green" }}>{mensaje}</p>}

            {!cargando && inscripciones.length === 0 && (
                <p>Todavia no te has inscrito en ningun curso.</p>
            )}

            {inscripciones.map((inscripcion) => (
                <div className="tarjeta" key={inscripcion._id}>
                    <p><strong>{inscripcion.curso?.nombre}</strong></p>
                    <p>Estado: {inscripcion.estado}</p>
                    <button
                        onClick={() => handleCancelar(inscripcion._id)}
                        className="btn btn-quitar"
                    >
                        Salir del curso
                    </button>
                </div>
            ))}
        </div>
    );
}
