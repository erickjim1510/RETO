import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Notfound from "./pages/Notfound";
import Cartelera from "./pages/Cartelera";
import Registro from "./pages/Registro";
import Sala from "./pages/Sala";
import Genero from "./pages/Genero";
import Pelicula from "./pages/Pelicula";
import Clasificacion from "./pages/Clasificacion";
import Salas from "./pages/Salas";
import TipoSala from "./pages/TipoSala";
import Proyecciones from "./pages/Proyecciones";
import { AuthContextProvider } from "../src/context/AuthContext";

function App() {
  return (
    <Routes>
      <Route path="/home" element={<Home />}>
        {/* Subrutas dentro de Home */}
        <Route index element={<h2>Bienvenido al Sistema</h2>} />
        <Route path="genero" element={<Genero />} />
        <Route path="clasificacion" element={<Clasificacion />} />
        <Route path="pelicula" element={<Pelicula />} />
        <Route path="salas" element={<Salas />} />
        <Route path="tipoSala" element={<TipoSala />} />
        <Route path="proyecciones" element={<Proyecciones />} />
      </Route>
      <Route path="/" element={<Login />} />
      <Route path="/cartelera" element={<Cartelera />} />
      <Route path="/Registro" element={<Registro />} />
      <Route path="/Sala" element={<Sala />} />
      <Route path="*" element={<Notfound />} />
    </Routes>
  );
}

export default App;
