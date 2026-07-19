import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RutaProtegida({ children }) {

    const { token, cargando } = useAuth();

    if (cargando) {
        return <p style={{ padding: "20px" }}>Cargando...</p>;
    }

    if (!token) {
        return <Navigate to="/login" />;
    }

    return children;
}
