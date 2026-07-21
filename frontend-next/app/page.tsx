import Link from "next/link";
import Saludo from "@/components/Saludo";

export default function Home() {
  return (
    <main className="p-6">
      <section>
        <h1 className="mb-2 text-2xl font-bold">
          Gestión de Cursos e Inscripciones
        </h1>

        <Saludo nombre="estudiante" />

        <p className="mt-4">
          Explora la oferta académica disponible sin necesidad de iniciar sesión.
        </p>

        <p className="mt-2">
          Si ya formas parte de la institución, accede al portal del estudiante
          para realizar tu inscripción en los cursos de tu interés.
        </p>

        <Link
          href="/cursos"
          className="mt-4 inline-block rounded bg-slate-900 px-4 py-2 text-white"
        >
          Ver catálogo de cursos
        </Link>
      </section>
    </main>
  );
}
