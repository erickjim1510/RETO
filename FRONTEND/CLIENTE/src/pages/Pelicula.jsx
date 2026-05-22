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

function Pelicula() {
  const [peliculas, setPeliculas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPelicula, setSelectedPelicula] = useState({});
  const [action, setAction] = useState("");
  const [generos, setGeneros] = useState([]);
  const [clasificaciones, setClasificaciones] = useState([]);

  const obtenerGeneros = async () => {
    try {
      const response = await api.get("/generos"); // ajusta la URL si es necesario
      setGeneros(response.data);
    } catch (error) {
      console.error("Error al obtener géneros:", error);
    }
  };

  const obtenerClasificaciones = async () => {
    try {
      const response = await api.get("/clasificaciones");
      setClasificaciones(response.data);
    } catch (error) {
      console.log("Error al obtener Clasificaciones: ", error);
    }
  };

  // Función para obtener las peliculas desde la API
  const obtenerPeliculas = async () => {
    try {
      const r = await api.get("/peliculas");
      console.log("Peliculas obtenidas", r);
      setPeliculas(r.data);
    } catch (err) {
      console.log("Error", err.response?.data?.message || err.message);
    }
  };

  //Procedimineto inicial del componete
  useEffect(() => {
    //
    obtenerGeneros();
    obtenerPeliculas();
    obtenerClasificaciones();
    //
  }, []);

  // Función para abrir el modal
  const handleShow = (pelicula, actionType) => {
    setSelectedPelicula(pelicula || {});
    setAction(actionType);
    setShowModal(true);
  };

  // Función para cerrar el modal
  const handleClose = () => {
    setShowModal(false);
    setSelectedPelicula({});
    setAction("");
  };

  const handleEditar = async () => {
    try {
      const response = await api.put(
        `/peliculas/${selectedPelicula.idpelicula}`,
        {
          idclasificacion: selectedPelicula.idclasificacion,
          idgenero: selectedPelicula.idgenero,
          titulo: selectedPelicula.titulo,
          duracion: selectedPelicula.duracion,
          sinopsis: selectedPelicula.sinopsis,
          imagen_url: selectedPelicula.imagen_url,
        }
      );
      Swal.fire({
        title: "Pelicula Actualizada!",
        text: "La pelicula se actualizo correctamente!",
        icon: "success",
      });
      console.log(response);
      obtenerPeliculas();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response.data.message,
      });
    }
    handleClose();
  };

  const handleEliminar = async () => {
    await api
      .delete("/peliculas", {
        data: { idpelicula: selectedPelicula.idpelicula },
      })
      .then((r) => {
        Swal.fire({
          title: "Pelicula Eliminada",
          icon: "success",
          draggable: true,
          text: "Id Pelicula eliminado" + selectedPelicula.idpelicula,
        });

        obtenerPeliculas();
        console.log(r);
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
    console.log("Agregar pelicula; ", selectedPelicula);
    await api
      .post("/peliculas", {
        idclasificacion: selectedPelicula.idclasificacion,
        idgenero: selectedPelicula.idgenero,
        titulo: selectedPelicula.titulo,
        duracion: selectedPelicula.duracion,
        sinopsis: selectedPelicula.sinopsis,
        imagen_url: selectedPelicula.imagen_url,
      })
      .then((r) => {
        console.log(r.data);
        Swal.fire({
          title: "Pelicula Creada!!",
          icon: "success",
          draggable: true,
          text: "Id Pelicula creada " + r.data,
        });
        obtenerPeliculas();
      })
      .catch((err) => {
        console.log("Error al Crear pelicula: ", err);
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
      <h2>Lista de Peliculas</h2>
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
            <th>Titulo</th>
            <th>Genero</th>
            <th>Clasificación</th>
            <th>Duracion</th>
            <th>Sinopsis</th>
            <th>Imagen URL</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {peliculas.map((pelicula) => (
            <tr key={pelicula.idpelicula}>
              <td>{pelicula.idpelicula}</td>
              <td>{pelicula.titulo}</td>
              <td>{pelicula.genero}</td>
              <td>{pelicula.clasificacion}</td>
              <td>{pelicula.duracion}</td>
              <td>{pelicula.sinopsis}</td>
              <td>{pelicula.imagen_url}</td>
              <td>
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>Ver</Tooltip>}
                >
                  <Button
                    variant="info"
                    size="sm"
                    onClick={() => handleShow(pelicula, "ver")}
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
                    onClick={() => handleShow(pelicula, "editar")}
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
                    onClick={() => handleShow(pelicula, "eliminar")}
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
            {action === "ver" && "Datos Pelicula"}
            {action === "editar" && "Editar Pelicula"}
            {action === "eliminar" && "Eliminar Pelicula"}
            {action === "agregar" && "Agregar Pelicula"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {(action === "ver" ||
              action === "editar" ||
              action === "eliminar") && (
              <Form.Group>
                <Form.Label>ID Pelicula</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedPelicula.idpelicula || ""}
                  disabled
                />
              </Form.Group>
            )}

            <Form.Group className="mt-3">
              <Form.Label>Titulo</Form.Label>
              <Form.Control
                autoFocus
                type="text"
                value={selectedPelicula.titulo || ""}
                onChange={(e) =>
                  setSelectedPelicula({
                    ...selectedPelicula,
                    titulo: e.target.value,
                  })
                }
                disabled={!(action === "editar" || action === "agregar")}
              />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Genero</Form.Label>
              <Form.Select
                value={selectedPelicula.idgenero || ""}
                onChange={(e) =>
                  setSelectedPelicula({
                    ...selectedPelicula,
                    idgenero: e.target.value,
                  })
                }
                disabled={!(action === "editar" || action === "agregar")}
              >
                <option value="">Selecciona un género</option>
                {generos.map((genero) => (
                  <option key={genero.idgenero} value={genero.idgenero}>
                    {genero.nombre}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Clasificacion</Form.Label>
              <Form.Select
                value={selectedPelicula.idclasificacion || ""}
                onChange={(e) =>
                  setSelectedPelicula({
                    ...selectedPelicula,
                    idclasificacion: e.target.value,
                  })
                }
                disabled={!(action === "editar" || action === "agregar")}
              >
                <option value="">Selecciona una Clasificacion</option>
                {clasificaciones.map((clasificacion) => (
                  <option
                    key={clasificacion.idclasificacion}
                    value={clasificacion.idclasificacion}
                  >
                    {clasificacion.nombre}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Duracion</Form.Label>
              <Form.Control
                type="text"
                value={selectedPelicula.duracion || ""}
                onChange={(e) =>
                  setSelectedPelicula({
                    ...selectedPelicula,
                    duracion: e.target.value,
                  })
                }
                disabled={!(action === "editar" || action === "agregar")}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Sinopsis</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                value={selectedPelicula.sinopsis || ""}
                onChange={(e) =>
                  setSelectedPelicula({
                    ...selectedPelicula,
                    sinopsis: e.target.value,
                  })
                }
                disabled={!(action === "editar" || action === "agregar")}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Imagen URL</Form.Label>
              <Form.Control
                type="text"
                value={selectedPelicula.imagen_url || ""}
                onChange={(e) =>
                  setSelectedPelicula({
                    ...selectedPelicula,
                    imagen_url: e.target.value,
                  })
                }
                disabled={!(action === "editar" || action === "agregar")}
              ></Form.Control>
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

export default Pelicula;
