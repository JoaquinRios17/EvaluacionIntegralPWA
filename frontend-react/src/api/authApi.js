import api from "./axiosConfig";

// login del usuario contra la API real
export const iniciarSesionConApi = async (email, password) => {
    try {
        const { data } = await api.post("/auth/login", { email, password });
        return data;
    } catch (error) {
        const mensaje = error.response ? error.response.data.mensaje : error.message;
        throw new Error(mensaje);
    }
};
