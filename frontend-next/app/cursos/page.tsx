import Link from "next/link";
import type { Curso } from "@/types/curso";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

// esta funcion se ejecuta en el servidor antes de mandar el html al navegador (SSR)
async function obtenerCursos(): Promise<Curso[]> {
    const respuesta = await fetch(`${API_URL}/cursos/publico`, {
        cache: "no-store", // siempre traemos la informacion mas reciente
    });

    if (!respuesta.ok) {
        throw new Error("No se pudo cargar el catalogo de cursos");
    }

    const datos = await respuesta.json();
    return datos.cursos;
}

export default async function CursosPage() {
    let cursos: Curso[] = [];
    let error = "";

    try {
        cursos = await obtenerCursos();
    } catch (err) {
        error = err instanceof Error ? err.message : "Error desconocido";
    }

    return (
        <main className="p-6">
            <h2 className="text-2xl font-bold mb-4">Catalogo de Cursos</h2>

            {error && <p className="text-red-600">{error}</p>}

            {cursos.length === 0 && !error && <p>No hay cursos disponibles.</p>}

            <div className="flex flex-col gap-4">
                {cursos.map((curso) => (
                    <div key={curso._id} className="border rounded p-4">
                        <h3 className="font-bold text-lg">{curso.nombre}</h3>
                        <p className="text-gray-600">{curso.descripcion}</p>
                        <p><strong>Creditos:</strong> {curso.creditos}</p>
                        <Link
                            href={`/cursos/${curso._id}`}
                            className="inline-block mt-2 bg-slate-900 text-white px-3 py-1 rounded"
                        >
                            Ver detalle
                        </Link>
                    </div>
                ))}
            </div>
        </main>
    );
}
