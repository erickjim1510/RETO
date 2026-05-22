import React, { useEffect, useState } from "react";
import {
  Modal,
  Form,
  Table,
  Button,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import api from "../api/service.api.js";
import { FaEdit, FaTrash, FaEye, FaPlus } from "react-icons/fa"; // Importa iconos
import Swal from "sweetalert2";

function Genero() {
  const [generos, setGeneros] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedGenero, setSelectedGenero] = useState({});
  const [action, setAction] = useState("");

  // Función para obtener los géneros desde la API
  const obtenerGeneros = async () => {
    await api
      .get("/generos")
      .then((r) => {
        console.log("Generos obtenidos", r);
        setGeneros(r.data);
      })
      .catch((err) => {
        console.log("Error", err.response?.data?.message || err.message);
      });
  };

  useEffect(() => {
    obtenerGeneros();
  }, []);

  // Función para abrir el modal
  const handleShow = (genero, actionType) => {
    setSelectedGenero(genero || {});
    setAction(actionType);
    setShowModal(true);
  };

  // Función para cerrar el modal
  const handleClose = () => {
    setShowModal(false);
    setSelectedGenero({});
    setAction("");
  };

  const handleEditar = async () => {
    console.log("Editar genero: ", selectedGenero);

    await api
      .put(`/generos/${selectedGenero.idgenero}`, {
        nombre: selectedGenero.nombre,
      })
      .then((r) => {
        console.log(r.data);
        Swal.fire({
          title: "Género Actualizado",
          icon: "success",
          text: "El género ha sido actualizado correctamente.",
        });
        obtenerGeneros(); // Recargar la lista de géneros
      })
      .catch((err) => {
        console.log("Error al actualizar género: ", err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text:
            err.response?.data?.message || "No se pudo actualizar el género.",
        });
      });

    handleClose();
  };

  const handleEliminar = async () => {
    console.log("Eliminar del genero: ", selectedGenero);
    await api
      .delete("/generos", { data: { idgenero: selectedGenero.idgenero } })
      .then((r) => {
        console.log(r.data);
        Swal.fire({
          title: "Genero Eliminado",
          icon: "success",
          draggable: true,
          text: "Id genero eliminado" + selectedGenero.idgenero,
        });
        obtenerGeneros();
      })
      .catch((err) => {
        console.log("Error al Eliminar: ", err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: err.response.data.message,
        });
      });

    handleClose();
  };

  const handleAgregar = async () => {
    console.log("Agregar genero; ", selectedGenero);
    await api
      .post("/generos", { nombre: selectedGenero.nombre })
      .then((r) => {
        console.log(r.data);
        Swal.fire({
          title: "Genero Creado!!",
          icon: "success",
          draggable: true,
          text: "Id genero creado " + r.data,
        });
        obtenerGeneros();
      })
      .catch((err) => {
        console.log("Error al Crear genero: ", err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: err.response.data.message,
        });
      });
    handleClose();
  };

  return (
    <div>
      <h2>Lista de Géneros</h2>
      <div className="d-flex justify-content-end mb-2">
        <Button
          variant="success"
          size="sm"
          onClick={() => handleShow(null, "agregar")}
        >
          <FaPlus /> Nuevo
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {generos.map((genero) => (
            <tr key={genero.idgenero}>
              <td>{genero.idgenero}</td>
              <td>{genero.nombre}</td>
              <td>
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>Ver</Tooltip>}
                >
                  <Button
                    variant="info"
                    size="sm"
                    onClick={() => handleShow(genero, "ver")}
                  >
                    <FaEye />
                  </Button>
                </OverlayTrigger>{" "}
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>Editar</Tooltip>}
                >
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => handleShow(genero, "editar")}
                  >
                    <FaEdit />
                  </Button>
                </OverlayTrigger>{" "}
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>Eliminar</Tooltip>}
                >
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleShow(genero, "eliminar")}
                  >
                    <FaTrash />
                  </Button>
                </OverlayTrigger>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal para Ver, Editar y Eliminar */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {action === "ver" && "Datos Género"}
            {action === "editar" && "Editar Género"}
            {action === "eliminar" && "Eliminar Género"}
            {action === "agregar" && "Agregar Género"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {(action === "ver" ||
              action === "editar" ||
              action === "eliminar") && (
              <Form.Group>
                <Form.Label>ID Género</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedGenero.idgenero || ""}
                  disabled
                />
              </Form.Group>
            )}

            <Form.Group className="mt-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={selectedGenero.nombre || ""}
                onChange={(e) =>
                  setSelectedGenero({
                    ...selectedGenero,
                    nombre: e.target.value.slice(0, 50),
                  })
                }
                disabled={!(action === "editar" || action === "agregar")}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          {action === "editar" && (
            <Button variant="success" onClick={handleEditar}>
              Guardar Cambios
            </Button>
          )}
          {action === "eliminar" && (
            <Button variant="danger" onClick={handleEliminar}>
              Eliminar
            </Button>
          )}
          {action === "agregar" && (
            <Button variant="primary" onClick={handleAgregar}>
              Agregar
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Genero;
