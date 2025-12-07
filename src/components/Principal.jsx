// src/components/Layout.jsx
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function Layout({ user, seccion, onChangeSeccion, onLogout, children }) {
  return (
    <div className="layout-rm">
      <Sidebar
        rol={user.rol}
        seccion={seccion}
        onChangeSeccion={onChangeSeccion}
        onLogout={onLogout}
      />

      <div className="layout-main">
        <Topbar nombreCompleto={user.nombreCompleto} />
        <main className="layout-content">
          {children}
        </main>
      </div>
    </div>
  );
}
