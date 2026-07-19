type SaludoProps = {
    nombre: string;
};

export default function Saludo({ nombre }: SaludoProps) {
    return <h2 className="text-lg">Hola {nombre}, bienvenido al portal de cursos</h2>;
}
