import { useState, useEffect } from "react";
import TarjetaCurso from "../components/TarjetaCurso";
import { obtenerCursos } from "../api/cursosApi";
import { useAuth } from "../context/AuthContext";

export default function Cursos() {

    const [cursos, setCursos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    const { token } = useAuth();

    useEffect(() => {
        async function cargarCursos() {
            try {
                const datos = await obtenerCursos(token);
                setCursos(datos);
            } catch (err) {
                setError(err.message);
            } finally {
                setCargando(false);
            }
        }

        cargarCursos();
    }, [token]);

    if (cargando) {
        return <p className="contenedor">Cargando cursos...</p>;
    }

    if (error) {
        return <p className="contenedor" style={{ color: "red" }}>{error}</p>;
    }

    return (
        <div className="contenedor">
            <h2>Catalogo de Cursos</h2>
            {cursos.length === 0 ? (
                <p>No hay cursos disponibles.</p>
            ) : (
                cursos.map((curso) => (
                    <TarjetaCurso key={curso._id} curso={curso}></TarjetaCurso>
                ))
            )}
        </div>
    );
}
