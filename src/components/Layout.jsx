// src/components/Layout.jsx
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function Layout({ user, onLogout, children }) {
  return (
    <div className="layout-root">
      <Sidebar rol={user.rol} />
      <Topbar nombreCompleto={user.nombreCompleto} onLogout={onLogout} />
      <div className="contenido">{children}</div>
    </div>
  );
}
