import React, { useState } from "react";
import "./Registro.css";
import { useNavigate } from "react-router-dom";
import api from "../api/service.api.js";
import Swal from "sweetalert2";
import { Form, Button, Alert } from "react-bootstrap";

function Registro() {
  const [nombre, setNombre] = useState("");
  const [apellido_paterno, setApellido_paterno] = useState("");
  const [apellido_materno, setApellido_materno] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!nombre) newErrors.nombre = "El Nombre es requerido";
    if (!apellido_paterno)
      newErrors.apellido_paterno = "Los Apellidos son requeridos";
    if (!apellido_materno)
      newErrors.apellido_materno = "Los Apellidos son requeridos";

    if (!email) {
      newErrors.email = "El Email es requerido";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "El Email no es válido";
    }

    if (!password) {
      newErrors.password = "La Contraseña es requerida";
    } else if (password.length < 6) {
      newErrors.password = "La Contraseña debe tener al menos 6 caracteres";
    }

    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      setErrors({});
      console.log("Se Registro con estos valores", {
        nombre,
        apellido_paterno,
        apellido_materno,
        email,
        password,
      });
      await api
        .post("/registro", {
          nombre: nombre,
          apellido_paterno: apellido_paterno,
          apellido_materno: apellido_materno,
          email: email,
          password: password,
        })
        .then((r) => {
          console.log("Datos de Registro:", r.data.insertID);
          Swal.fire({
            title: "Se registro correctamente",
            icon: "success",
            confirmButtonText: "Ir al login",
          });
          navigate("/");
        })
        .catch((err) => {
          console.log("Error", err.response.data.message);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: err.response.data.message,
          });
        });
    }
  };

  return (
    <div className="registro-wrapper">
      <div className="registro-form-container">
        <form onSubmit={handleSubmit} className="registro-form">
          <h3>Registro</h3>
          <div className="mb-3">
            <label>Nombre</label>
            <input
              type="nombre"
              className="form-control"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            {errors.nombre && <div className="error">{errors.nombre}</div>}
          </div>
          <div className="mb-3">
            <label>Apellido Paterno</label>
            <input
              type="apellido_paterno"
              className="form-control"
              placeholder="Apellido Paterno"
              value={apellido_paterno}
              onChange={(e) => setApellido_paterno(e.target.value)}
            />
            {errors.apellido_paterno && (
              <div className="error">{errors.apellido_paterno}</div>
            )}
          </div>
          <div className="mb-3">
            <label>Apellido Materno</label>
            <input
              type="apellido_materno"
              className="form-control"
              placeholder="Apellido Materno"
              value={apellido_materno}
              onChange={(e) => setApellido_materno(e.target.value)}
            />
            {errors.apellido_materno && (
              <div className="error">{errors.apellido_materno}</div>
            )}
          </div>
          <div className="mb-3">
            <label>Email </label>
            <input
              type="email"
              className="form-control"
              placeholder="Ingresa Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <div className="error">{errors.email}</div>}
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Ingresa Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <div className="error">{errors.password}</div>}
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Registrarse
            </button>
          </div>
          <p className="forgot-password text-right">
            Ya cuentas con una cuenta? <a href="/">Login?</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Registro;
