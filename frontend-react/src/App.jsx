import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import RutaProtegida from "./components/RutaProtegida";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Cursos from "./pages/Cursos";
import DetalleCurso from "./pages/DetalleCurso";
import MiCuenta from "./pages/MiCuenta";

export default function App() {

    const protegerRuta = (componente) => (
        <RutaProtegida>
            {componente}
        </RutaProtegida>
    );

    return (
        <>
            <Navbar />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />

                <Route
                    path="/cursos"
                    element={protegerRuta(<Cursos />)}
                />

                <Route
                    path="/cursos/:id"
                    element={protegerRuta(<DetalleCurso />)}
                />

                <Route
                    path="/mi-cuenta"
                    element={protegerRuta(<MiCuenta />)}
                />
            </Routes>
        </>
    );
}
