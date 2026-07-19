import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Home() {

    const { usuario } = useAuth();

    return (
        <div className="contenedor">
            <h2>Bienvenido al Portal del Estudiante</h2>
            {usuario ? (
                <p>Ya iniciaste sesion. Puedes ir directo a <Link to="/cursos">ver los cursos</Link>.</p>
            ) : (
                <p>Inicia sesion para ver el catalogo de cursos y gestionar tu inscripcion.</p>
            )}
        </div>
    );
}
