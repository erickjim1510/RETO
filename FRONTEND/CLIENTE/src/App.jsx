import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Notfound from "./pages/Notfound";
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
