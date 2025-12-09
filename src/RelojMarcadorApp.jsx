// src/RelojMarcadorApp.jsx
import { useState } from "react";
import { useAuth } from "./hooks/useLogin";
import LoginPage from "./components/LoginPage";
import Layout from "./components/Layout";
import Principal from "./components/Principal";
import ListadoMarcas from "./components/ListadoMarcas";
import Proc1 from "./components/Proc1";
import JefaturaPendientes from "./jefatura/pages/JefaturaPendientes";
import JefaturaResoluciones from "./jefatura/pages/JefaturaResoluciones";

export default function RelojMarcadorApp() {
  const {
    user,
    cargando,
    mensaje,
    tipoMensaje,
    iniciarSesion,
    cerrarSesion,
    establecerMensaje,
  } = useAuth();

  // sección actual del módulo
  const [seccion, setSeccion] = useState("inicio");

  // Si no hay usuario autenticado, mostramos solo el login
  if (!user) {
    return (
      <LoginPage
        onLogin={iniciarSesion}
        cargando={cargando}
        mensaje={mensaje}
        tipoMensaje={tipoMensaje}
        limpiarMensaje={() => establecerMensaje("")}
      />
    );
  }

  // ----------------------------------------------------
  // Elegimos qué contenido mostrar según la sección
  // ----------------------------------------------------
  let contenido = null;

  if (seccion === "inicio") {
    const datos = user.datos || {};

    const nombreDesdeApi =
      datos.Nombre_Completo ||
      datos.NombreCompleto ||
      datos.nombreCompleto ||
      datos.nombre_completo ||
      `${(datos.Nombre ?? datos.nombre ?? "").trim()} ${
        (datos.Apellido_1 ??
          datos.Apellido1 ??
          datos.apellido1 ??
          "").trim()
      } ${
        (datos.Apellido_2 ??
          datos.Apellido2 ??
          datos.apellido2 ??
          "").trim()
      }`.trim();

    const nombreCompleto =
      (nombreDesdeApi && nombreDesdeApi.trim()) ||
      user.nombreCompleto ||
      user.usuario ||
      "";

    contenido = <Principal nombreCompleto={nombreCompleto} />;

  } else if (user.rol === 2 && seccion === "marcas") {
    // 🔹 FUNCIONARIO
    contenido = <ListadoMarcas />;

  } else if (user.rol === 3 && seccion === "proc1") {
    contenido = <Proc1 />;

  } else if (user.rol === 3 && seccion === "jefatura-pendientes") {
    contenido = <JefaturaPendientes />;

  } else if (user.rol === 3 && seccion === "jefatura-resoluciones") {
    contenido = <JefaturaResoluciones />;

  } else {
    contenido = (
      <div style={{ padding: "2rem" }}>
        <h2>Sección en construcción</h2>
        <p>Próximamente más opciones aquí.</p>
      </div>
    );
  }

  return (
    <Layout
      user={user}
      onLogout={cerrarSesion}
      seccion={seccion}
      onChangeSeccion={setSeccion}
    >
      {contenido}
    </Layout>
  );
}
