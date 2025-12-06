// src/components/Topbar.jsx

export default function Topbar({ nombreCompleto, onLogout }) {
  return (
    <div className="topbar">
      <div className="user-info">
        <span>{nombreCompleto}</span>
        <img src="/imagen/avatar.png" alt="Avatar del usuario" />
        <button className="btn-topbar-logout" onClick={onLogout}>
          Salir
        </button>
      </div>
    </div>
  );
}
