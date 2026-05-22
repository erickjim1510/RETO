import React, { useState } from "react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";


const filas = "ABCDEFGHIJKLMN".split("");
const asientosPorFila = 19;

const Sala = () => {
  const [asientos, setAsientos] = useState(() => {
    const estadoInicial = {};
    filas.forEach((fila) => {
      for (let i = 1; i <= asientosPorFila; i++) {
        estadoInicial[`${fila}${i}`] = "disponible";
      }
    });
    return estadoInicial;
  });

  const [seleccionados, setSeleccionados] = useState([]);

  const manejarClick = (id) => {
    if (asientos[id] === "ocupado") return;
    const nuevoEstado = asientos[id] === "seleccionado" ? "disponible" : "seleccionado";
    setAsientos({ ...asientos, [id]: nuevoEstado });
    setSeleccionados((prev) =>
      nuevoEstado === "seleccionado" ? [...prev, id] : prev.filter((as) => as !== id)
    );
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Selección de Asientos</h2>
      <div className="text-center bg-dark text-light py-2 mb-3">Pantalla</div>
      <Row className="justify-content-center">
        <Col md={10} className="text-center">
          {filas.map((fila) => (
            <div key={fila} className="flex align-items-center mb-2">
              <strong className="me-2">{fila}</strong>
              {Array.from({ length: asientosPorFila }, (_, i) => {
                const id = `${fila}${i + 1}`;
                return (
                  <Button
                    key={id}
                    variant={
                      asientos[id] === "ocupado"
                        ? "secondary"
                        : asientos[id] === "seleccionado"
                        ? "success"
                        : "outline-primary"
                    }
                    disabled={asientos[id] === "ocupado"}
                    className="m-1"
                    onClick={() => manejarClick(id)}
                  >
                    {i + 1}
                  </Button>
                );
              })}
            </div>
          ))}
        </Col>
        <Col  md={2}>
          <h5>Asientos Seleccionados</h5>
          <Table bordered>
            <thead>
              <tr>
                <th>Fila-Asiento</th>
              </tr>
            </thead>
            <tbody>
              {seleccionados.map((asiento) => (
                <tr key={asiento}>
                  <td>{asiento}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button variant="primary" disabled={!seleccionados.length} className="w-100 mt-2">
            Pagar Boletos
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Sala;
