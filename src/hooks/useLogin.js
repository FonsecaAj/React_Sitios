// src/hooks/useAuth.js
import { useState } from "react";
import { login as loginRequest } from "../services/loginService";

function obtenerRol(usuarioPlano) {
  const rol =
    usuarioPlano?.ID_Rol_Usuario ??
    usuarioPlano?.IdRolUsuario ??
    usuarioPlano?.idRolUsuario ??
    usuarioPlano?.id_rol_usuario ??
    0;

  return Number(rol);
}

function obtenerNombreCompleto(usuarioPlano) {
  const nombre =
    usuarioPlano?.Nombre ??
    usuarioPlano?.nombre ??
    usuarioPlano?.nombreUsuario ??
    "";

  const apellido1 =
    usuarioPlano?.Apellido_1 ??
    usuarioPlano?.apellido1 ??
    usuarioPlano?.Apellido1 ??
    "";

  const apellido2 =
    usuarioPlano?.Apellido_2 ??
    usuarioPlano?.apellido2 ??
    usuarioPlano?.Apellido2 ??
    "";

  return `${nombre} ${apellido1} ${apellido2}`.trim();
}

export function useAuth() {
  const [user, setUser] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("Información");

  const establecerMensaje = (texto) => {
    if (!texto) {
      setMensaje("");
      setTipoMensaje("Información");
      return;
    }

    const msgLower = texto.toLowerCase();

    if (
      msgLower.includes("incorrectos") ||
      msgLower.includes("bloqueado") ||
      msgLower.includes("no autorizado")
    ) {
      setTipoMensaje("Error");
    } else if (msgLower.includes("inicie sesión") || msgLower.includes("sesión")) {
      setTipoMensaje("Advertencia");
    } else {
      setTipoMensaje("Información");
    }

    setMensaje(texto);
  };

  const iniciarSesion = async (usuario, contrasenna) => {
    setCargando(true);
    establecerMensaje("");

    try {
      const data = await loginRequest(usuario, contrasenna);

      if (data?.exito === false || data?.success === false || data?.ok === false) {
        establecerMensaje(data?.mensaje || data?.message || "Usuario y/o contraseña incorrectos.");
        setUser(null);
        return;
      }

      const usuarioPlano =
        data?.datosUsuario ?? data?.data ?? data?.usuario ?? data?.user ?? data;

      const rol = obtenerRol(usuarioPlano);

      if (![2, 3].includes(rol)) {
        establecerMensaje(
          "Acceso no autorizado. Solo usuarios de rol funcionario o jefatura."
        );
        setUser(null);
        return;
      }

      const nombreCompleto = obtenerNombreCompleto(usuarioPlano) || usuario;

      setUser({
        nombreCompleto,
        rol,
        datos: usuarioPlano,
        bruto: data,
      });
    } catch (err) {
      console.error(err);
      establecerMensaje("No se pudo conectar con la API de autenticación.");
      setUser(null);
    } finally {
      setCargando(false);
    }
  };

  const cerrarSesion = () => {
    setUser(null);
    establecerMensaje("Sesión cerrada correctamente.");
  };

  return { user, cargando, mensaje, tipoMensaje, iniciarSesion, cerrarSesion, establecerMensaje };
}
