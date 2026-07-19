import { Link } from "react-router-dom";

export default function TarjetaCurso({ curso }) {
    return (
        <div className="tarjeta">
            <h3>{curso.nombre}</h3>
            <p>{curso.descripcion}</p>
            <p><strong>Creditos:</strong> {curso.creditos}</p>
            <p><strong>Cupo maximo:</strong> {curso.cupoMaximo}</p>
            <Link to={`/cursos/${curso._id}`} className="btn-ver">Ver detalle</Link>
        </div>
    );
}
