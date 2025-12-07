// src/components/LoginPage.jsx
import { useState, useEffect } from "react";

export default function LoginPage({
  onLogin,
  cargando,
  mensaje,
  tipoMensaje,
  limpiarMensaje,
}) {
  const [usuario, setUsuario] = useState("");
  const [contrasenna, setContrasenna] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    if (mensaje) {
      setMostrarModal(true);
    }
  }, [mensaje]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(usuario, contrasenna);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    limpiarMensaje();
  };

  const headerClass =
    tipoMensaje === "Error"
      ? "modal-header error"
      : tipoMensaje === "Advertencia"
      ? "modal-header warning"
      : "modal-header info";

  return (
    <div className="login-page">
      <div className="login-card">
        <img
          src="/imagen/logo.jpg"
          alt="Logo de la empresa"
          className="login-logo"
        />
        <h1 className="login-title">Iniciar Sesión</h1>

        <form onSubmit={handleSubmit} className="login-form">
          {/* USUARIO */}
          <div className="form-group">
            <input
              type="text"
              placeholder="Usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
            />
          </div>

          {/* CONTRASEÑA */}
          <div className="form-group password-group">
            <input
              type={mostrarPassword ? "text" : "password"}
              placeholder="Contraseña"
              value={contrasenna}
              onChange={(e) => setContrasenna(e.target.value)}
              required
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() => setMostrarPassword((v) => !v)}
              aria-label={mostrarPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              <i className={`bi ${mostrarPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
            </button>
          </div>

          <button type="submit" className="btn-login" disabled={cargando}>
            {cargando ? "Validando..." : "Aceptar"}
          </button>
        </form>
      </div>

      {mensaje && mostrarModal && (
        <>
          <div className="custom-modal-backdrop" onClick={cerrarModal}></div>
          <div className="custom-modal">
            <div className="custom-modal-inner">
              <div className={headerClass}>
                <h5>{tipoMensaje}</h5>
                <button className="btn-close-modal" onClick={cerrarModal}>
                  ×
                </button>
              </div>
              <div className="modal-body">{mensaje}</div>
              <div className="modal-footer">
                <button className="btn-secondary" onClick={cerrarModal}>
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
