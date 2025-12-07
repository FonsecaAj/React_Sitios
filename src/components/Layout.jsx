// src/components/Layout.jsx
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function Layout({
  user,
  onLogout,
  seccion,
  onChangeSeccion,
  children,
}) {
  return (
    <div className="layout">
      <Sidebar rol={user.rol} seccion={seccion} onChangeSeccion={onChangeSeccion} />
      <div className="layout-main">
        <Topbar nombreCompleto={user.nombreCompleto} onLogout={onLogout} />
        <div className="layout-content">{children}</div>
      </div>
    </div>
  );
}
