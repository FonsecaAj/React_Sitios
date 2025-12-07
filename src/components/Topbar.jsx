// src/components/Topbar.jsx

export default function Topbar({ nombreCompleto }) {
  return (
    <header className="topbar-rm">
      <div className="topbar-spacer" />
      <div className="topbar-user">
        <span className="topbar-user-name">{nombreCompleto}</span>
        <img
          src="/imagen/avatar.png"
          alt="Avatar del usuario"
          className="topbar-avatar"
        />
      </div>
    </header>
  );
}
