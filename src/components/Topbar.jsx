// src/components/Topbar.jsx
import avatar from "../assets/avatar.png";

export default function Topbar({ nombreCompleto }) {
  const bruto = nombreCompleto || "";

  // Quitar el "Bienvenido," si viene así desde la API
  const nombre = bruto.replace(/^bienvenido,\s*/i, "").trim();

  return (
    <header className="topbar-rm">
      <div className="topbar-user">
        <span className="topbar-user-name">{nombre}</span>
        <div className="topbar-avatar">
          <img
            src={avatar}
            alt="Avatar del usuario"
            className="topbar-avatar-img"
          />
        </div>
      </div>
    </header>
  );
}
