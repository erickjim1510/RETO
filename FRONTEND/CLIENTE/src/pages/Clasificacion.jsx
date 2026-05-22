import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  OverlayTrigger,
  Tooltip,
  Modal,
  Form,
  Col,
  Row,
} from "react-bootstrap";
import { FaPlus, FaRegEye, FaEdit, FaTrash } from "react-icons/fa";
import api from "../api/service.api.js";
import Swal from "sweetalert2";

function Clasificacion() {
  const [clasificaciones, setClasificaciones] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedClasificacion, setSelectedClasificacion] = useState({});
  const [action, setAction] = useState("");

  const handleShow = (clasificacion, actionType) => {
    setSelectedClasificacion(clasificacion || {});
    setAction(actionType);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedClasificacion({});
    setAction("");
  };

  const handleAgregar = async () => {
    console.log("Adregar Clasificacion: ", selectedClasificacion);

    await api
      .post("/clasificaciones", { nombre: selectedClasificacion.nombre })
      .then((r) => {
        console.log(r.data);
        Swal.fire({
          title: "Clasificacion Creada!",
          text: "Se creo la clasificacion:  " + r.data.idclasificacion,
          icon: "success",
        });
        obtenerClasificaciones();
      })
      .catch((err) => {
        console.log("Error al crear la Clasificacion: ", err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: err.response.data.message,
        });
      });
    handleClose();
  };

  const handleVer = (clasificacion, accion) => {
    setShowModal(true);
    setSelectedClasificacion(clasificacion);
    setAction(accion);
  };

  const handleEditar = async () => {
    await api
      .put(`/clasificaciones/${selectedClasificacion.idclasificacion}`, {
        nombre: selectedClasificacion.nombre,
      })
      .then((r) => {
        console.log(r.data);
        Swal.fire({
          title: "Clasificacion Actualizado!",
          text:
            "La Clasificacion " +
            selectedClasificacion.idclasificacion +
            " se ha Actualizado Correctamente",
          icon: "success",
        });
        obtenerClasificaciones();
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: err.response?.data?.message || "No se pudo Actualizar",
        });
      });
    handleClose();
  };

  //Funcion para Obtener las Clasificaciones
  const obtenerClasificaciones = async () => {
    await api
      .get("/clasificaciones")
      .then((r) => {
        console.log("Clasificaciones Obtenidas:", r);
        setClasificaciones(r.data);
      })
      .catch((err) => {
        console.log("Error", err.response?.data?.message || err.message);
      });
  };

  const handleEliminar = () => {
    Swal.fire({
      title: "Estas Seguro de Eliminar la Clasificacion?",
      text: "No podras Recuperarla!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Quiero Borrarla",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await api
          .delete(`/clasificaciones/${selectedClasificacion.idclasificacion}`, {
            nombre: selectedClasificacion.nombre,
          })
          .then((r) => {
            console.log(r.data);
            Swal.fire({
              title: "Clasificacion Eliminada!",
              text: "La Clasificacion se ha Eliminado correctamente",
              icon: "success",
            });
            obtenerClasificaciones();
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Ocurrio un Error al Eliminar",
              text: err.message.data.message,
            });
          });
      }
    });
    handleClose();
  };

  //Funcion para Renderizar primero
  useEffect(() => {
    obtenerClasificaciones();
  }, []);

  return (
    <div>
      <h2>Lista de Clasificaciones</h2>
      <div className="d-flex justify-content-end mb-2">
        <Button
          variant="success"
          size="sm"
          onClick={() => handleShow(null, "agregar")}
        >
          <FaPlus /> Nueva Clasificacion
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
          {clasificaciones.map((clasificacion) => (
            <tr>
              <td>{clasificacion.idclasificacion}</td>
              <td>{clasificacion.nombre}</td>
              <td>
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>Ver</Tooltip>}
                >
                  <Button
                    variant="info"
                    size="sm"
                    onClick={() => handleVer(clasificacion, "ver")}
                  >
                    <FaRegEye />
                  </Button>
                </OverlayTrigger>{" "}
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>Editar</Tooltip>}
                >
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => handleShow(clasificacion, "editar")}
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
                    onClick={() => handleShow(clasificacion, "eliminar")}
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
            {action === "agregar" && "Agregar Clasificacion"}
            {action === "ver" && "Datos de Clasificacion"}
            {action === "editar" && "Editar Clasificacion"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {(action === "ver" ||
              action === "editar" ||
              action === "eliminar") && (
              <Form.Group className="mb-3">
                <Form.Label sm="2">Id Clasificacion</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedClasificacion.idclasificacion}
                  disabled
                />
              </Form.Group>
            )}

            <Form.Group className="mb-3">
              <Form.Label column sm="2">
                Nombre
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre de Clasificacion"
                value={selectedClasificacion.nombre || ""}
                autoFocus={action === "editar" || action === "agregar"}
                onChange={(e) =>
                  setSelectedClasificacion({
                    ...selectedClasificacion,
                    nombre: e.target.value.slice(0, 50),
                  })
                }
                disabled={action === "ver" || action === "eliminar"}
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
            <Button variant="success" onClick={handleAgregar}>
              Agregar
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Clasificacion;
