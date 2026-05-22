import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Notfound from "./pages/Notfound";
import Proyecciones from "./pages/Proyecciones";
import { AuthContextProvider } from "../src/context/AuthContext";

function App() {
  return (
    <Routes>
      <Route path="/home" element={<Home />}>
        {/* Subrutas dentro de Home */}
        <Route index element={<h2>Bienvenido al Sistema</h2>} />
        <Route path="proyecciones" element={<Proyecciones />} />
      </Route>
      <Route path="/" element={<Login />} />
      <Route path="*" element={<Notfound />} />
    </Routes>
  );
}

export default App;
