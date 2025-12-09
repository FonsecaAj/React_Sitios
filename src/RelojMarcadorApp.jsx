// src/RelojMarcadorApp.jsx
import { useState } from "react";
import { useAuthContext } from "./context/AuthContext";  
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
  } = useAuthContext();   

  const [seccion, setSeccion] = useState("inicio");

  // Si no hay usuario autenticado → login
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

  // --------------------------------------------
  // Seleccionar sección del menú lateral
  // --------------------------------------------
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

  } else if (user.rol === 2 && seccion === "usr5-inconsistencias") {
    contenido = <USR5_Inconsistencias />;

  } else if (user.rol === 2 && seccion === "usr6-permisos") {
    contenido = <USR6_Permisos />;

  }else if (user.rol === 2 && seccion === "usr7-nueva") {
    contenido = <USR7_NuevaVacacion />;
  
  }else if (user.rol === 2 && seccion === "usr7-mis") {
    contenido = <USR7_MisVacaciones />;
    
  }else if (user.rol === 3 && seccion === "proc1") {
    contenido = <Proc1 />;

  } else if (user.rol === 3 && seccion === "jefatura-pendientes") {
    contenido = <JefaturaPendientes />;

  } else if (user.rol === 3 && seccion === "jefatura-resoluciones") {
    contenido = <JefaturaResoluciones />;

  } else {
    contenido = (
      <div style={{ padding: "2rem" }}>
     
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
