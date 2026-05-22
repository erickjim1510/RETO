import React, { useContext } from "react";
import { Container, Row, Col, Nav, Button } from "react-bootstrap";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import Genero from "./Genero.jsx"; // Importamos el componente
import Pelicula from "./Pelicula.jsx";
import { AuthContext } from "../context/AuthContext.jsx";

import "bootstrap/dist/css/bootstrap.min.css"; // Importa los estilos de Bootstrap
import "./Home.css"; // Archivo CSS personalizado

function Home() {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/");
  };

  const fecha = new Date().toLocaleDateString("es-ES");
  return (
    <div className="app-container">
      {/* Topbar */}
      <div className="topbar">
        <Container fluid>
          <Row className="align-items-center">
            <Col>
              <h4 className="mb-0">CineTec</h4>
            </Col>

            <Col className="text-end">
              <strong>{user.nombre}</strong>
              &nbsp;&nbsp;
              <strong>{user.apellido_paterno}</strong>
              &nbsp;&nbsp;
              <strong>{user.apellido_materno}</strong>
              &nbsp;&nbsp;
              <strong>{fecha}</strong>&nbsp;&nbsp;
              <Button variant="outline-light" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Contenido Principal */}
      <div className="main-content">
        <Container fluid>
          <Row>
            {/* Sidebar */}
            <Col md={2} className="sidebar">
              <Nav className="flex-column">
                <Nav.Link as={Link} to="/home/genero" className="sidebar-link">
                  Género
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/home/clasificacion"
                  className="sidebar-link"
                >
                  Clasificación
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/home/pelicula"
                  className="sidebar-link"
                >
                  Películas
                </Nav.Link>
                <Nav.Link as={Link} to="/home/salas" className="sidebar-link">
                  Salas
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/home/tipoSala"
                  className="sidebar-link"
                >
                  Tipos de Salas
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/home/proyecciones"
                  className="sidebar-link"
                >
                  Proyecciones
                </Nav.Link>
              </Nav>
            </Col>

            {/* MainContent */}
            <Col md={10} className="main-content-area">
              <Outlet /> {/* Aquí se renderizan los componentes dinámicos */}
            </Col>
          </Row>
        </Container>
      </div>

      {/* Footer */}
      <div className="footer">
        <p className="text-center mb-0">Hecho por Erick Jiménez</p>
      </div>
    </div>
  );
}

export default Home;
