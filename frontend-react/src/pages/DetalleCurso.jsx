import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { obtenerCursoPorId } from "../api/cursosApi";
import { inscribirseEnCurso } from "../api/inscripcionesApi";
import { useAuth } from "../context/AuthContext";

export default function DetalleCurso() {

    const { id } = useParams();
    const [curso, setCurso] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");
    const [mensaje, setMensaje] = useState("");

    const { token } = useAuth();

    useEffect(() => {
        async function cargarCurso() {
            try {
                const datos = await obtenerCursoPorId(id, token);
                setCurso(datos);
            } catch (err) {
                setError(err.message);
            } finally {
                setCargando(false);
            }
        }

        cargarCurso();
    }, [id, token]);

    const handleInscribirse = async () => {
        setMensaje("");
        setError("");

        try {
            const respuesta = await inscribirseEnCurso(id, token);
            setMensaje(respuesta.mensaje);
        } catch (err) {
            setError(err.message);
        }
    };

    if (cargando) {
        return <p className="contenedor">Cargando...</p>;
    }

    if (error && !curso) {
        return <p className="contenedor" style={{ color: "red" }}>{error}</p>;
    }

    return (
        <div className="contenedor">
            <Link to="/cursos">← Volver</Link>
            <div className="tarjeta" style={{ marginTop: "15px" }}>
                <h2>{curso.nombre}</h2>
                <p>{curso.descripcion}</p>
                <p><strong>Creditos:</strong> {curso.creditos}</p>
                <p><strong>Cupo maximo:</strong> {curso.cupoMaximo}</p>
                <button onClick={handleInscribirse} className="btn btn-agregar">
                    Inscribirme en este curso
                </button>

                {mensaje && <p style={{ color: "green" }}>{mensaje}</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
        </div>
    );
}
