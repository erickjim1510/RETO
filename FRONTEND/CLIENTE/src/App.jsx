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
import Kiosko from "./pages/Kiosko";
import { AuthContextProvider } from "../src/context/AuthContext";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/cartelera" element={<Cartelera />} />
      <Route path="/Registro" element={<Registro />} />
      <Route path="/Sala" element={<Sala />} />
      <Route path="/kiosko" element={<Kiosko />} />
      <Route path="*" element={<Notfound />} />
    </Routes>
  );
}

export default App;
