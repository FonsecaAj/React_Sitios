// src/RelojMarcadorApp.jsx
import { useAuth } from "./hooks/useLogin";
import LoginPage from "./components/LoginPage";
import Layout from "./components/Layout";
import Home from "./components/Home";

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

  return (
    <Layout user={user} onLogout={cerrarSesion}>
      <Home nombreCompleto={user.nombreCompleto} />
    </Layout>
  );
}
