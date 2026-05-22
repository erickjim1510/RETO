import React, { useContext, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "./Login.css";
import api from "../api/service.api.js";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext.jsx";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();
  const { authLogin } = useContext(AuthContext);

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email es requerido";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email es invalido";
    if (!password) newErrors.password = "Password es requerido";
    else if (password.length < 6)
      newErrors.password = "Password debe tener al menos 6 caracteres";
    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      setErrors({});
      console.log("Login con estos valores:", { email, password });
      // Here you would typically send a request to your server
      await api
        .post("/login", { email: email, password: password })
        .then((r) => {
          console.log("Datos", r.data[0].idtipousuario);
          authLogin(
            r.data[0].idusuario,
            r.data[0].nombre,
            r.data[0].email,
            r.data[0].apellido_paterno,
            r.data[0].apellido_materno
          );

          if (r.data[0].idtipousuario === 1) {
            console.log(" vamonos al Dashboard");
            navigate("/home");
          } else {
            navigate("/cartelera");
          }
        })
        .catch((err) => {
          console.log("Error ", err.response.data.message);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: err.response.data.message,
          });
        });
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-form-container">
        <h2 className="login-title">Login</h2>
        <Form onSubmit={handleSubmit} className="login-form">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email: </Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingresa Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" type="submit" className="login-button">
            Login
          </Button>
          {/* Agrega el enlace "Registrarte" aquí */}
          <div style={{ textAlign: "right", marginTop: "10px" }}>
            <Link to="/registro">Registrarte</Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
