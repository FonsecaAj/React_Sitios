// src/RelojMarcadorApp.jsx
import { useState } from "react";
import { useAuth } from "./hooks/useLogin";
import LoginPage from "./components/LoginPage";
import Layout from "./components/Layout";
import Principal from "./components/Principal";
import ListadoMarcas from "./components/ListadoMarcas";

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

  
  const [seccion, setSeccion] = useState("inicio");

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

  
  let contenido = null;

  if (seccion === "inicio") {
    contenido = <Principal nombreCompleto={user.nombreCompleto} />;
  } else if (user.rol === 2 && seccion === "marcas") {
    contenido = <ListadoMarcas />;
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
