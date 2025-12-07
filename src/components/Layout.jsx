// src/components/Layout.jsx
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function Layout({
  user,
  seccion,
  onChangeSeccion,
  onLogout,
  children,
}) {
  
  if (!user) return null;


  const displayName =
    user.datos?.Nombre_Completo ||
    user.datos?.NombreCompleto ||
    user.datos?.nombreCompleto ||
    user.datos?.nombre_completo ||
    user.datos?.Nombre ||
    user.datos?.nombre ||
    user.nombreCompleto ||
    user.usuario ||
    "";

  return (
    <div className="layout-rm">
      <Sidebar
        rol={user.rol}
        seccion={seccion}
        onChangeSeccion={onChangeSeccion}
        onLogout={onLogout}
      />

      <div className="layout-main">
        {/* Aquí ya mandamos el nombre “bonito” */}
        <Topbar nombreCompleto={displayName} />

        <main className="layout-content">
    
          {children}
        </main>
      </div>
    </div>
  );
}
