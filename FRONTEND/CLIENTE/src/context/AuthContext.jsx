import { React, createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const getInitialState = () => {
  const user = sessionStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(getInitialState);

  useEffect(() => {
    sessionStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const authLogin = (
    idusuario,
    nombre,
    email,
    apellido_paterno,
    apellido_materno
  ) => {
    setUser({
      idusuario: idusuario,
      nombre: nombre,
      email: email,
      apellido_paterno: apellido_paterno,
      apellido_materno: apellido_materno,
    });
  };

  return (
    <AuthContext.Provider value={{ user, authLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
