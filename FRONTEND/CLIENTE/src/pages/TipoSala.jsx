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

function TipoSalas() {
  const [tiposalas, setTiposalas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [action, setAction] = useState("");
  const [selectedTipoSala, setSelectedTipoSala] = useState({});

  useEffect(() => {
    getTipoSalas();
  }, []);

  const handleClose = () => {
    setShowModal(false);
    setAction("");
    setSelectedTipoSala({});
  };

  const handleShow = (tiposalas, action) => {
    setShowModal(true);
    setAction(action);
    setSelectedTipoSala(tiposalas || "");
  };

  const handleEliminar = async () => {
    Swal.fire({
      title: "¿Estás seguro de Eliminar?",
      text: "¿Quieres Eliminar los cambios?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, Eliminar ",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const r = await api.delete(
            `/tipo-sala/${selectedTipoSala.id_tipo_sala}`
          );
          console.log(r);
          Swal.fire({
            title: "¡Actualizado!",
            text: "El tipo de sala ha sido actualizado exitosamente",
            icon: "success",
          });

          getTipoSalas();
          handleClose();
        } catch (err) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: err.response?.data?.message || "Error Inesperado",
          });
        }
      }
    });
  };

  const handleEditar = async () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Quieres guardar los cambios?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, guardar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const r = await api.put(
            `/tipo-sala/${selectedTipoSala.id_tipo_sala}`,
            {
              nombre: selectedTipoSala.nombre,
            }
          );
          console.log(r);
          Swal.fire({
            title: "¡Actualizado!",
            text: "El tipo de sala ha sido actualizado exitosamente",
            icon: "success",
          });

          getTipoSalas();
          handleClose();
        } catch (err) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: err.response?.data?.message || "Error Inesperado",
          });
        }
      }
    });
  };

  const handleAgregar = async () => {
    try {
      const r = await api.post("/tipo-sala", {
        nombre: selectedTipoSala.nombre,
      });
      console.log(r);
      Swal.fire({
        title: "Nuevo Tipo de Sala Creada!",
        text: "El Tipo de Sala se creo Exitosamente!",
        icon: "success",
      });
      getTipoSalas();
      handleClose();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data?.message || "Error Inesperado",
      });
    }
  };

  const getTipoSalas = async () => {
    try {
      const r = await api.get("/tipo-sala");
      setTiposalas(r.data);
    } catch (err) {
      console.error(
        "Error al obtener Salas:",
        err.response?.data?.message || err.message
      );
    }
  };

  return (
    <div>
      <h2>Tipos de Salas</h2>
      <div className="d-flex justify-content-end mb-2">
        <Button
          variant="success"
          size="sm"
          onClick={() => handleShow(null, "agregar")}
        >
          <FaPlus /> Agregar
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Tipo de Sala</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tiposalas.map((tiposala) => (
            <tr key={tiposala.id_tipo_sala}>
              <td>{tiposala.id_tipo_sala}</td>
              <td>{tiposala.nombre}</td>
              <td>
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>Ver</Tooltip>}
                >
                  <Button
                    variant="info"
                    size="sm"
                    onClick={() => handleShow(tiposala, "ver")}
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
                    onClick={() => handleShow(tiposala, "editar")}
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
                    onClick={() => handleShow(tiposala, "eliminar")}
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
          <Modal.Title>
            {action === "agregar" && "Agregar Tipo de Sala"}
            {action === "ver" && "Ver Tipo de Sala"}
            {action === "editar" && "Editar Tipo de Sala"}
            {action === "eliminar" && "Eliminar Tipo de Sala"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {(action === "ver" ||
              action === "editar" ||
              action === "eliminar") && (
              <Form.Group className="mb-3">
                <Form.Label sm="2">Id del Tipo de Sala</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedTipoSala.id_tipo_sala}
                  disabled
                />
              </Form.Group>
            )}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Tipo de Sala</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre del Tipo de Sala"
                value={selectedTipoSala.nombre || ""}
                onChange={(e) =>
                  setSelectedTipoSala({
                    ...selectedTipoSala,
                    nombre: e.target.value,
                  })
                }
                autoFocus={action === "editar" || action === "agregar"}
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
  );
}

export default TipoSalas;
