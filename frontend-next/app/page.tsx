import Link from "next/link";
import Saludo from "@/components/Saludo";

export default function Home() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-2">Gestion de Cursos e Inscripciones</h1>

      <Saludo nombre="estudiante"></Saludo>

      <p className="mt-4">
        Aqui puedes ver la oferta academica disponible sin necesidad de iniciar sesion.
      </p>
      <p className="mt-2">
        Si ya eres estudiante, ingresa al portal del estudiante para inscribirte
        en los cursos que te interesen.
      </p>

      <Link href="/cursos" className="inline-block mt-4 bg-slate-900 text-white px-4 py-2 rounded">
        Ver catalogo de cursos
      </Link>
    </main>
  );
}
