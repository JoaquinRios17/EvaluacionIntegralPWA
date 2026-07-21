import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import RutaProtegida from "./components/RutaProtegida";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Cursos from "./pages/Cursos";
import DetalleCurso from "./pages/DetalleCurso";
import MiCuenta from "./pages/MiCuenta";

export default function App() {
    return (
        <>
            <Navbar></Navbar>
            <Routes>
                <Route path="/" element={<Home></Home>}></Route>
                <Route path="/login" element={<Login></Login>}></Route>

                <Route path="/cursos" element={
                    <RutaProtegida><Cursos></Cursos></RutaProtegida>
                }></Route>

                <Route path="/cursos/:id" element={
                    <RutaProtegida><DetalleCurso></DetalleCurso></RutaProtegida>
                }></Route>

                <Route path="/mi-cuenta" element={
                    <RutaProtegida><MiCuenta></MiCuenta></RutaProtegida>
                }></Route>
            </Routes>
        </>
    );
}
