import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {

    const { usuario, cerrarSesion } = useAuth();
    const navigate = useNavigate();

    const handleCerrarSesion = () => {
        cerrarSesion();
        navigate("/login");
    };

    return (
        <nav>
            <Link to="/">Inicio</Link>
            {usuario && <Link to="/cursos">Cursos</Link>}
            {usuario && <Link to="/mi-cuenta">Mi Cuenta</Link>}

            {usuario ? (
                <>
                    <span style={{ marginLeft: "10px" }}>Hola, {usuario.nombre}</span>
                    <button onClick={handleCerrarSesion} className="btn btn-quitar" style={{ marginLeft: "10px" }}>
                        Cerrar sesion
                    </button>
                </>
            ) : (
                <Link to="/login">Iniciar sesion</Link>
            )}
        </nav>
    );
}
