import api from "./axiosConfig";

// inscribirse en un curso
export const inscribirseEnCurso = async (cursoId, token) => {
    try {
        const { data } = await api.post(
            "/inscripciones",
            { cursoId },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return data;
    } catch (error) {
        const mensaje = error.response ? error.response.data.mensaje : error.message;
        throw new Error(mensaje);
    }
};

// ver mis inscripciones
export const obtenerMisInscripciones = async (token) => {
    try {
        const { data } = await api.get("/inscripciones", {
            headers: { Authorization: `Bearer ${token}` },
        });
        return data.inscripciones;
    } catch (error) {
        const mensaje = error.response ? error.response.data.mensaje : error.message;
        throw new Error(mensaje);
    }
};

// cancelar una inscripcion (salirse de un curso)
export const cancelarInscripcion = async (id, token) => {
    try {
        const { data } = await api.delete(`/inscripciones/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return data;
    } catch (error) {
        const mensaje = error.response ? error.response.data.mensaje : error.message;
        throw new Error(mensaje);
    }
};
