// src/hooks/useLogin.js
import { useState } from "react";
import { login as loginRequest } from "../services/loginService";

function obtenerRol(usuarioPlano) {
  if (!usuarioPlano) return 0;

  const posibles = [
    usuarioPlano.ID_Rol_Usuario,
    usuarioPlano.IdRolUsuario,
    usuarioPlano.idRolUsuario,
    usuarioPlano.idRol,
    usuarioPlano.rol,
    usuarioPlano.Rol,
    usuarioPlano.rolUsuario,
    usuarioPlano.id_rol_usuario,
  ];

  const valor = posibles.find((v) => v !== undefined && v !== null);
  return Number(valor || 0);
}

function obtenerNombreCompleto(usuarioPlano, usuarioTexto) {
  if (!usuarioPlano) return usuarioTexto || "";

  // 1) Intentar campos típicos de nombre completo
  const posiblesCompletos = [
    usuarioPlano.Nombre_Completo,
    usuarioPlano.NombreCompleto,
    usuarioPlano.nombreCompleto,
    usuarioPlano.nombre_completo,
    usuarioPlano.Nombre_Usuario,
    usuarioPlano.NombreUsuario,
    usuarioPlano.nombreUsuario,
  ];

  let completo = posiblesCompletos.find(
    (v) => typeof v === "string" && v.trim() !== ""
  );


  if (!completo) {
    const nombre = usuarioPlano.Nombre ?? usuarioPlano.nombre ?? "";
    const apellido1 =
      usuarioPlano.Apellido_1 ??
      usuarioPlano.Apellido1 ??
      usuarioPlano.apellido1 ??
      "";
    const apellido2 =
      usuarioPlano.Apellido_2 ??
      usuarioPlano.Apellido2 ??
      usuarioPlano.apellido2 ??
      "";

    completo = `${nombre} ${apellido1} ${apellido2}`.trim();
  }

  // 3) Fallback final: usuario (la cédula)
  return (completo || usuarioTexto || "").toString().trim();
}

export function useAuth() {
  const [user, setUser] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("Información");

  const clasificarMensaje = (texto) => {
    if (!texto) {
      setMensaje("");
      setTipoMensaje("Información");
      return;
    }

    const lower = texto.toLowerCase();

    if (
      lower.includes("incorrectos") ||
      lower.includes("bloqueado") ||
      lower.includes("error") ||
      lower.includes("no autorizado")
    ) {
      setTipoMensaje("Error");
    } else if (
      lower.includes("sesión") ||
      lower.includes("inicie sesión") ||
      lower.includes("advertencia")
    ) {
      setTipoMensaje("Advertencia");
    } else {
      setTipoMensaje("Información");
    }

    setMensaje(texto);
  };

  const iniciarSesion = async (usuario, contrasenna) => {
    setCargando(true);
    clasificarMensaje("");

    try {
      const data = await loginRequest(usuario, contrasenna);

      console.log("Respuesta login API:", data);

      const exito =
        data.exito ??
        data.success ??
        data.ok ??
        data.estado ??
        true;

      if (exito === false) {
        const msgApi =
          data.mensaje || data.message || "Credenciales incorrectas.";
        clasificarMensaje(msgApi);
        setUser(null);
        return;
      }

      const usuarioPlano =
        data.datosUsuario ??
        data.usuario ??
        data.user ??
        data.data ??
        data;

      const rol = obtenerRol(usuarioPlano);

      console.log("Rol devuelto:", rol, "usuarioPlano:", usuarioPlano);

      // 🔓 POR AHORA NO BLOQUEAMOS POR ROL EN EL FRONT
      // if (rol !== 2 && rol !== 3) {
      //   clasificarMensaje(
      //     "Acceso no autorizado. Solo usuarios de rol funcionario o jefatura."
      //   );
      //   setUser(null);
      //   return;
      // }

      const nombreCompleto = obtenerNombreCompleto(usuarioPlano, usuario);

      setUser({
        nombreCompleto,
        rol,
        datos: usuarioPlano,
        bruto: data,
      });
    } catch (err) {
      console.error("Error al iniciar sesión:", err);

      if (err.response) {
        const status = err.response.status;
        const msgApi =
          err.response.data?.mensaje || err.response.data?.message || "";

        if (msgApi) {
          clasificarMensaje(msgApi);
        } else if (status === 400 || status === 401) {
          clasificarMensaje("Usuario y/o contraseña incorrectos.");
        } else {
          clasificarMensaje(`Error ${status} al conectar con el servidor.`);
        }
      } else if (err.request) {
        clasificarMensaje("No se recibió respuesta del servidor.");
      } else {
        clasificarMensaje("Error al preparar la solicitud de autenticación.");
      }

      setUser(null);
    } finally {
      setCargando(false);
    }
  };

  const cerrarSesion = () => {
    setUser(null);
    clasificarMensaje("Sesión cerrada correctamente.");
  };

  return {
    user,
    cargando,
    mensaje,
    tipoMensaje,
    iniciarSesion,
    cerrarSesion,
    establecerMensaje: clasificarMensaje,
  };
}
