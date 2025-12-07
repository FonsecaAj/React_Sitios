// src/hooks/useLogin.js
import { useState } from "react";
import { login as loginRequest } from "../services/loginService";

// ================== OBTENER ROL ==================
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

// ================== OBTENER NOMBRE ==================
function obtenerNombreCompleto(usuarioPlano, usuarioTexto) {
  if (!usuarioPlano || typeof usuarioPlano !== "object") {
    return (usuarioTexto || "").toString().trim();
  }

  // 1) Claves típicas donde suele venir el nombre completo
  const clavesPreferidas = [
    "Nombre_Completo",
    "NombreCompleto",
    "nombreCompleto",
    "nombre_completo",
    "Nombre_Usuario",
    "NombreUsuario",
    "nombreUsuario",
    "NombrePersona",
    "nombrePersona",
  ];

  for (const k of clavesPreferidas) {
    const v = usuarioPlano[k];
    if (typeof v === "string") {
      const s = v.trim();
      if (s && /[a-zA-ZÁÉÍÓÚáéíóúñ]/.test(s)) {
        return s;
      }
    }
  }

  // 2) Intentar armarlo con Nombre + Apellidos (muchas variantes)
  const nombre =
    usuarioPlano.Nombre ??
    usuarioPlano.nombre ??
    usuarioPlano.Nombres ??
    usuarioPlano.nombres ??
    "";

  const apellido1 =
    usuarioPlano.Apellido_1 ??
    usuarioPlano.Apellido1 ??
    usuarioPlano.apellido1 ??
    usuarioPlano.PrimerApellido ??
    usuarioPlano.primerApellido ??
    usuarioPlano.primer_apellido ??
    "";

  const apellido2 =
    usuarioPlano.Apellido_2 ??
    usuarioPlano.Apellido2 ??
    usuarioPlano.apellido2 ??
    usuarioPlano.SegundoApellido ??
    usuarioPlano.segundoApellido ??
    usuarioPlano.segundo_apellido ??
    "";

  const armado = `${nombre} ${apellido1} ${apellido2}`
    .replace(/\s+/g, " ")
    .trim();

  if (armado && /[a-zA-ZÁÉÍÓÚáéíóúñ]/.test(armado)) {
    return armado;
  }

  // 3) Buscar cualquier string "larga con espacio" (parece nombre)
  let candidato = "";
  for (const v of Object.values(usuarioPlano)) {
    if (typeof v === "string") {
      const s = v.trim();
      if (
        s.length > candidato.length &&
        s.includes(" ") &&
        /[a-zA-ZÁÉÍÓÚáéíóúñ]/.test(s)
      ) {
        candidato = s;
      }
    }
  }
  if (candidato) return candidato;

  // 4) Fallback a la cédula / usuario
  return (usuarioTexto || "").toString().trim();
}

// ================== HOOK PRINCIPAL ==================
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
        data.exito ?? data.success ?? data.ok ?? data.estado ?? true;

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
