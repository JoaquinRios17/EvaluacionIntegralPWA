import { createContext, useState, useContext, useEffect } from "react";
import { iniciarSesionConApi } from "../api/authApi";
const TOKEN_KEY = "token";
const USER_KEY = "usuario";
export const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [token, setToken] = useState(null);
    const [usuario, setUsuario] = useState(null);
    const [cargando, setCargando] = useState(true);

    const cargarSesion = () => {
       const tokenGuardado = localStorage.getItem("token");
       const usuarioGuardado = localStorage.getItem("usuario");

       if (tokenGuardado && usuarioGuardado) {
           setToken(tokenGuardado);
           setUsuario(JSON.parse(usuarioGuardado));
    }

    setCargando(false);
    };

    // al abrir la app revisamos si ya hay una sesion guardada
    useEffect(() => {
        cargarSesion();
    }, []);

    const iniciarSesion = async (email, password) => {
        const datos = await iniciarSesionConApi(email, password);
        setToken(datos.token);
        setUsuario(datos.usuario);

        // guardamos la sesion en localStorage para que no se pierda al recargar
        localStorage.setItem("token", datos.token);
        localStorage.setItem("usuario", JSON.stringify(datos.usuario));
    };

    const cerrarSesion = () => {
        setToken(null);
        setUsuario(null);
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
    };

    return (
        <AuthContext.Provider value={{ usuario, token, cargando, iniciarSesion, cerrarSesion }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
