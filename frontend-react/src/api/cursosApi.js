import api from "./axiosConfig";

// listar cursos (necesita token)
export const obtenerCursos = async (token) => {
    try {
        const { data } = await api.get("/cursos", {
            headers: { Authorization: `Bearer ${token}` },
        });
        return data.cursos;
    } catch (error) {
        const mensaje = error.response ? error.response.data.mensaje : error.message;
        throw new Error(mensaje);
    }
};

// obtener un curso por id
export const obtenerCursoPorId = async (id, token) => {
    try {
        const { data } = await api.get(`/cursos/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return data.curso;
    } catch (error) {
        const mensaje = error.response ? error.response.data.mensaje : error.message;
        throw new Error(mensaje);
    }
};
