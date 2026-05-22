import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  OverlayTrigger,
  Tooltip,
  Modal,
  Form,
} from "react-bootstrap";
import { FaPlus, FaEye, FaEdit, FaTrash } from "react-icons/fa";
import api from "../api/service.api.js";
import Swal from "sweetalert2";

function Salas() {
  const [salas, setSalas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [action, setAction] = useState("");
  const [selectedSala, setSelectedSala] = useState({});
  const [tiposalas, setTiposalas] = useState([]);

  const getTipoSalas = async () => {
    try {
      const r = await api.get("/tipo-sala");
      setTiposalas(r.data);
    } catch (error) {
      console.error("Error al obtener Tipos de Salas:", error);
    }
  };

  //Funcion para Renderizar
  useEffect(() => {
    obtenerSalas();
    getTipoSalas();
  }, []);

  //Funcion para Obtener todas las Salas
  const obtenerSalas = async () => {
    try {
      const r = await api.get("/salas");
      setSalas(r.data);
    } catch (err) {
      console.error(
        "Error al obtener Salas:",
        err.response?.data?.message || err.message
      );
    }
  };

  //Funcion para cerrar el Modal
  const handleClose = () => {
    setShowModal(false);
    setAction("");
    setSelectedSala({});
  };

  //Funcion para Abrir el Modal
  const handleShow = (sala, actionType) => {
    setShowModal(true);
    setAction(actionType);
    setSelectedSala(sala || {});
  };

  const handleEliminar = async () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡Esta acción no se puede deshacer!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const r = await api.delete(`/salas/${selectedSala.idsala}`);
          Swal.fire({
            title: "¡Eliminado!",
            text: "La sala fue eliminada correctamente.",
            icon: "success",
          });
          obtenerSalas();
          handleClose();
          console.log(r);
        } catch (err) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: err.response?.data?.message || "Error inesperado",
          });
        }
      }
    });
  };

  const handleEditar = async () => {
    try {
      const r = await api.put(`/salas/${selectedSala.idsala}`, {
        id_tipo_sala: selectedSala.id_tipo_sala,
        capacidad: selectedSala.capacidad,
      });
      Swal.fire({
        title: "Sala Actualizada!",
        text: "La Sala se Actualizo Correctamente!",
        icon: "success",
      });
      obtenerSalas();
      handleClose();
      console.log(r);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data?.message || "Error Inesperado",
      });
    }
  };

  const handleAgregar = async () => {
    try {
      const r = await api.post("/salas", {
        id_tipo_sala: selectedSala.id_tipo_sala,
        capacidad: selectedSala.capacidad,
      });
      console.log(r);
      Swal.fire({
        title: "Sala Creada!",
        text: "La Sala se Creo Correctamente!",
        icon: "success",
      });
      obtenerSalas();
      handleClose();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data?.message || "Error Inesperado",
      });
    }
  };

  return (
    <div>
      <h2>Lista de Salas</h2>
      <div className="d-flex justify-content-end mb-2">
        <Button
          variant="success"
          size="sm"
          onClick={() => handleShow(null, "agregar")}
        >
          <FaPlus /> Nueva Sala
        </Button>
      </div>
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tipo</th>
              <th>Capacidad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {salas.map((sala) => (
              <tr key={sala.idsala}>
                <td>{sala.idsala}</td>
                <td>{sala.tipo_nombre}</td>
                <td>{sala.capacidad}</td>
                <td>
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Ver</Tooltip>}
                  >
                    <Button
                      variant="info"
                      size="sm"
                      onClick={() => handleShow(sala, "ver")}
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
                      onClick={() => handleShow(sala, "editar")}
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
                      onClick={() => handleShow(sala, "eliminar")}
                    >
                      <FaTrash />
                    </Button>
                  </OverlayTrigger>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal show={showModal} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>{action === "agregar" && "Agregar Sala"}</Modal.Title>
            <Modal.Title>{action === "ver" && "Ver Sala"}</Modal.Title>
            <Modal.Title>{action === "editar" && "Editar Sala"}</Modal.Title>
            <Modal.Title>
              {action === "eliminar" && "Eliminar Sala"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              {(action === "ver" ||
                action === "editar" ||
                action === "eliminar") && (
                <Form.Group className="mb-3">
                  <Form.Label sm="2">Id Sala</Form.Label>
                  <Form.Control
                    type="text"
                    value={selectedSala.idsala}
                    disabled
                  />
                </Form.Group>
              )}

              <Form.Group className="mb-3">
                <Form.Label sm="2">Tipo</Form.Label>
                <Form.Select
                  value={selectedSala.id_tipo_sala || ""}
                  autoFocus={action === "agregar" || action === "editar"}
                  onChange={(e) =>
                    setSelectedSala({
                      ...selectedSala,
                      id_tipo_sala: e.target.value,
                    })
                  }
                  disabled={action === "ver" || action === "eliminar"}
                >
                  <option value="">Selecciona un Tipo de Sala</option>
                  {tiposalas.map((tiposala) => (
                    <option
                      key={tiposala.id_tipo_sala}
                      value={tiposala.id_tipo_sala}
                    >
                      {tiposala.nombre}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label sm="2">Capacidad</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Capacidad de la Sala"
                  value={selectedSala.capacidad || ""}
                  onChange={(e) =>
                    setSelectedSala({
                      ...selectedSala,
                      capacidad: e.target.value,
                    })
                  }
                  disabled={action === "ver" || action === "eliminar"}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant={action === "eliminar" ? "secondary" : "danger"}
              onClick={handleClose}
            >
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
              <Button variant="success" onClick={handleAgregar}>
                Agregar
              </Button>
            )}
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default Salas;
