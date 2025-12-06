// src/components/LoginPage.jsx
import { useState, useEffect } from "react";

export default function LoginPage({ onLogin, cargando, mensaje, tipoMensaje, limpiarMensaje }) {
  const [usuario, setUsuario] = useState("");
  const [contrasenna, setContrasenna] = useState("");
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
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

  const tipoClaseHeader =
    tipoMensaje === "Error"
      ? "bg-danger text-white"
      : tipoMensaje === "Advertencia"
      ? "bg-warning text-dark"
      : "bg-primary text-white";

  const claseBtnClose =
    tipoMensaje === "Advertencia" ? "btn-close" : "btn-close btn-close-white";

  return (
    <div className="login-page">
      <div className="login-container">
        <img src="/imagen/logo.jpg" alt="Logo de la empresa" />
        <h2>Iniciar Sesión</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="usuario"
            placeholder="Usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />

          <div className="password-container">
            <input
              type={mostrarContrasena ? "text" : "password"}
              name="contrasena"
              id="contrasena"
              placeholder="Contraseña"
              value={contrasenna}
              onChange={(e) => setContrasenna(e.target.value)}
              required
            />
            <i
              className={mostrarContrasena ? "bi bi-eye-slash" : "bi bi-eye"}
              id="togglePassword"
              onClick={() => setMostrarContrasena((v) => !v)}
            ></i>
          </div>

          <button type="submit" disabled={cargando}>
            {cargando ? "Validando..." : "Aceptar"}
          </button>
        </form>
      </div>

      {mensaje && mostrarModal && (
        <>
          <div
            className="modal fade show d-block"
            tabIndex="-1"
            aria-labelledby="mensajeModalLabel"
            aria-modal="true"
            role="dialog"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className={`modal-header ${tipoClaseHeader}`}>
                  <h5 className="modal-title" id="mensajeModalLabel">
                    {tipoMensaje}
                  </h5>
                  <button
                    type="button"
                    className={claseBtnClose}
                    aria-label="Cerrar"
                    onClick={cerrarModal}
                  ></button>
                </div>
                <div className="modal-body text-center">{mensaje}</div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={cerrarModal}
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </div>
  );
}
