import Link from "next/link";
import type { Curso } from "@/types/curso";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

async function obtenerCurso(id: string): Promise<Curso> {
    const respuesta = await fetch(`${API_URL}/cursos/publico/${id}`, {
        cache: "no-store",
    });

    if (!respuesta.ok) {
        throw new Error("No se encontro el curso");
    }

    const datos = await respuesta.json();
    return datos.curso;
}

type Props = {
    params: Promise<{ id: string }>;
};

export default async function DetalleCursoPage({ params }: Props) {
    const { id } = await params;

    let curso: Curso | null = null;
    let error = "";

    try {
        curso = await obtenerCurso(id);
    } catch (err) {
        error = err instanceof Error ? err.message : "Error desconocido";
    }

    if (error || !curso) {
        return (
            <main className="p-6">
                <p className="text-red-600">{error}</p>
                <Link href="/cursos">← Volver al catalogo</Link>
            </main>
        );
    }

    return (
        <main className="p-6">
            <Link href="/cursos">← Volver al catalogo</Link>

            <div className="border rounded p-4 mt-4">
                <h2 className="text-2xl font-bold">{curso.nombre}</h2>
                <p className="text-gray-600 mt-2">{curso.descripcion}</p>
                <p className="mt-2"><strong>Creditos:</strong> {curso.creditos}</p>
                <p><strong>Cupo maximo:</strong> {curso.cupoMaximo}</p>
                <p className="mt-4 text-sm text-gray-500">
                    Para inscribirte en este curso, ingresa al portal del estudiante con tu cuenta.
                </p>
            </div>
        </main>
    );
}
