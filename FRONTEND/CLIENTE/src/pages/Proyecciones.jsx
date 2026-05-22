import { useEffect, useState } from "react";
import {
  Modal,
  Form,
  Table,
  Button,
  OverlayTrigger,
  Tooltip,
  Row,
  Col,
} from "react-bootstrap";
import api from "../api/service.api.js";
import { FaEdit, FaTrash, FaEye, FaPlus } from "react-icons/fa"; // Importa iconos
import Swal from "sweetalert2";

function Proyecciones() {
  const [proyecciones, setProyecciones] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [action, setAction] = useState("");
  const [selectedProyeccion, setSelectedProyeccion] = useState({});
  const [peliculas, setPeliculas] = useState([]);
  const [salas, setSalas] = useState([]);
  const fecha = new Date().toLocaleDateString("es-ES");

  useEffect(() => {
    getProyecciones();
    getPeliculas();
    getSalas();
  }, []);

  const handleClose = () => {
    setShowModal(false);
    setAction("");
    setSelectedProyeccion({});
  };
  const handleShow = (proyeccion, action) => {
    setShowModal(true);
    setAction(action);
    setSelectedProyeccion(proyeccion || {});
  };

  const handleAgregar = async () => {
    try {
      const r = await api.post("/proyecciones", {
        idpelicula: selectedProyeccion.idpelicula,
        idsala: selectedProyeccion.idsala,
        fecha: selectedProyeccion.fecha,
        hora: selectedProyeccion.hora,
      });
      console.log(r);
      Swal.fire({
        title: "Proyeccion Creada!!",
        icon: "success",
        draggable: true,
        text: "La Proyeccion se creo Correctamente ",
      });
      getProyecciones();
      handleClose();
    } catch (err) {
      console.log("Error al Crear Proyeccion: ", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err,
      });
    }
  };

  const handleEditar = async () => {
    try {
      const r = await api.put(
        `/proyecciones/${selectedProyeccion.idproyeccion}`,
        {
          idpelicula: selectedProyeccion.idpelicula,
          fecha: selectedProyeccion.fecha,
          hora: selectedProyeccion.hora,
          idsala: selectedProyeccion.idsala,
        }
      );
      Swal.fire({
        title: "Pelicula Actualizada!",
        text: "La pelicula se actualizo correctamente!",
        icon: "success",
      });
      console.log(r);
      getProyecciones();
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
            `/proyecciones/${selectedProyeccion.idproyeccion}`
          );
          console.log(r);
          Swal.fire({
            title: "Eliminado!",
            text: "La Proyeccion se elimino exitosamente",
            icon: "success",
          });

          getProyecciones();
          handleClose();
        } catch (err) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: err.response.data.message,
          });
        }
      }
    });
  };

  const getSalas = async () => {
    try {
      const r = await api.get("/salas");
      setSalas(r.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getPeliculas = async () => {
    try {
      const r = await api.get("/peliculas");
      setPeliculas(r.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getProyecciones = async () => {
    try {
      const r = await api.get("/proyecciones", { fecha });
      console.log(r.data);

      // Filtra las proyecciones para excluir las fechas anteriores a la actual
      const currentDate = new Date();
      const filteredProyecciones = r.data.filter((proyeccion) => {
        const combinedDateTime = new Date(
          `${proyeccion.fecha}T${proyeccion.hora}`
        );
        return combinedDateTime >= currentDate;
      });

      setProyecciones(filteredProyecciones);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Proyecciones</h2>
      <Form className="mt-4 mb-5">
        <Row className="align-items-center">
          <Col md={3}>
            <Form.Group>
              <Form.Label>Película</Form.Label>
              <Form.Select
                value={selectedProyeccion.idpelicula || ""}
                onChange={(e) =>
                  setSelectedProyeccion({
                    ...selectedProyeccion,
                    idpelicula: e.target.value,
                  })
                }
                disabled={action === "ver" || action === "eliminar"}
              >
                <option>Selecciona una Película</option>
                {peliculas.map((pelicula) => (
                  <option value={pelicula.idpelicula} key={pelicula.idpelicula}>
                    {pelicula.titulo}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={2}>
            <Form.Group>
              <Form.Label>Sala</Form.Label>
              <Form.Select
                value={selectedProyeccion.idsala || ""}
                onChange={(e) =>
                  setSelectedProyeccion({
                    ...selectedProyeccion,
                    idsala: e.target.value,
                  })
                }
                disabled={action === "ver" || action === "eliminar"}
              >
                <option>Selecciona una Sala</option>
                {salas.map((sala) => (
                  <option value={sala.idsala} key={sala.idsala}>
                    {sala.idsala}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={2}>
            <Form.Group>
              <Form.Label>Fecha</Form.Label>
              <Form.Control
                type="date"
                value={selectedProyeccion.fecha || ""}
                onChange={(e) =>
                  setSelectedProyeccion({
                    ...selectedProyeccion,
                    fecha: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Col>

          <Col md={2}>
            <Form.Group>
              <Form.Label>Hora</Form.Label>
              <Form.Control
                type="time"
                value={selectedProyeccion.hora || ""}
                onChange={(e) =>
                  setSelectedProyeccion({
                    ...selectedProyeccion,
                    hora: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Col>

          <Col md={3} className="d-flex flex-column align-items-center gap-2">
            <Button variant="success" onClick={handleAgregar} className="w-100">
              <FaPlus /> Agregar
            </Button>
          </Col>
        </Row>
      </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id Proyeccion</th>
            <th>Pelicula</th>
            <th>Sala</th>
            <th>Tipo de Sala</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {proyecciones.map((proyeccion) => (
            <tr key={proyeccion.idproyeccion}>
              <td>{proyeccion.idproyeccion}</td>
              <td>{proyeccion.titulo}</td>
              <td>{proyeccion.idsala}</td>
              <td>{proyeccion.tipo}</td>
              <td>{proyeccion.fecha}</td>
              <td>{proyeccion.hora}</td>
              <td>
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>Editar</Tooltip>}
                >
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => handleShow(proyeccion, "editar")}
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
                    onClick={() => handleShow(proyeccion, "eliminar")}
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
            {action === "agregar" && "Agregar Proyeccion"}
            {action === "ver" && "Ver Proyeccion"}
            {action === "editar" && "Editar Proyeccion"}
            {action === "eliminar" && "Eliminar Proyeccion"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {(action === "editar" ||
              action === "ver" ||
              action === "eliminar") && (
              <Form.Group className="mb-3">
                <Form.Label>ID Proyeccion</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedProyeccion.idproyeccion || ""}
                  disabled
                />
              </Form.Group>
            )}
            <Form.Group className="mt-3">
              <Form.Label>Pelicula</Form.Label>
              <Form.Select
                value={selectedProyeccion.idpelicula || ""}
                onChange={(e) =>
                  setSelectedProyeccion({
                    ...selectedProyeccion,
                    idpelicula: e.target.value,
                  })
                }
                disabled={action === "ver" || action === "eliminar"}
              >
                <option>Seleccion una Pelicula</option>
                {peliculas.map((pelicula) => (
                  <option value={pelicula.idpelicula} key={pelicula.idpelicula}>
                    {pelicula.titulo}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Sala</Form.Label>
              <Form.Select
                value={selectedProyeccion.idsala || ""}
                onChange={(e) =>
                  setSelectedProyeccion({
                    ...selectedProyeccion,
                    idsala: e.target.value,
                  })
                }
                disabled={action === "ver" || action === "eliminar"}
              >
                <option>Selecciona una Sala</option>
                {salas.map((sala) => (
                  <option value={sala.idsala} key={sala.idsala}>
                    {sala.idsala}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Fecha</Form.Label>
              <Form.Control
                type="date"
                value={selectedProyeccion.fecha || ""}
                onChange={(e) =>
                  setSelectedProyeccion({
                    ...selectedProyeccion,
                    fecha: e.target.value,
                  })
                }
                disabled={!(action === "editar" || action === "agregar")}
              />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Hora</Form.Label>
              <Form.Control
                type="time"
                value={selectedProyeccion.hora || ""}
                onChange={(e) =>
                  setSelectedProyeccion({
                    ...selectedProyeccion,
                    hora: e.target.value,
                  })
                }
                disabled={!(action === "editar" || action === "agregar")}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant={action === "eliminar" ? "secondary" : "danger"}
            onClick={handleClose}
          >
            Cerrar
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

export default Proyecciones;
