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

  const datos = user?.datos || {};

  const rolNormalizado = Number(
    datos.ID_Rol_Usuario ??
      datos.iD_Rol_Usuario ??   
      datos.IdRolUsuario ??
      datos.idRolUsuario ??
      datos.idRol ??
      datos.rol ??
      datos.Rol ??
      datos.rolUsuario ??
      datos.id_rol_usuario ??
      user?.rol ?? // por si acaso
      0
  );

  console.log(" user.datos desde Layout:", datos);
  console.log(" ROL normalizado que mandamos al Sidebar:", rolNormalizado);

  return (
    <div className="layout-rm">
      <Sidebar
        rol={rolNormalizado}              
        seccion={seccion}
        onChangeSeccion={onChangeSeccion}
        onLogout={onLogout}
      />

      <div className="layout-main">
        <Topbar nombreCompleto={user.nombreCompleto} />
        <main className="layout-content">{children}</main>
      </div>
    </div>
  );
}
