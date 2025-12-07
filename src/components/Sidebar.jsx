// src/components/Sidebar.jsx

export default function Sidebar({ rol, seccion, onChangeSeccion }) {
  return (
    <aside className="sidebar-rm">
      <div className="sidebar-header">
        <span className="sidebar-logo-icon">🕒</span>
        <span className="sidebar-logo-text">Reloj Marcador</span>
      </div>

      <nav className="sidebar-nav">
        {rol === 2 && (
          <>
            <button
              type="button"
              className={`sidebar-link ${seccion === "inicio" ? "active" : ""}`}
              onClick={() => onChangeSeccion("inicio")}
            >
              Inicio
            </button>
            <button
              type="button"
              className={`sidebar-link ${seccion === "marcas" ? "active" : ""}`}
              onClick={() => onChangeSeccion("marcas")}
            >
               Marcas
            </button>
            <button
              type="button"
              className={`sidebar-link ${
                seccion === "inconsistencias" ? "active" : ""
              }`}
              onClick={() => onChangeSeccion("inconsistencias")}
            >
              Inconsistencias
            </button>
            <button
              type="button"
              className="sidebar-link"
              onClick={() => onChangeSeccion("permisos")}
            >
              📅Permisos
            </button>
            <button
              type="button"
              className="sidebar-link"
              onClick={() => onChangeSeccion("nueva-vacacion")}
            >
               Nueva Vacación
            </button>
            <button
              type="button"
              className="sidebar-link"
              onClick={() => onChangeSeccion("mis-solicitudes")}
            >
               Mis Solicitudes
            </button>
          </>
        )}

        {rol === 3 && (
          <>
            <button
              type="button"
              className={`sidebar-link ${seccion === "inicio" ? "active" : ""}`}
              onClick={() => onChangeSeccion("inicio")}
            >
               Inicio
            </button>
            <button
              type="button"
              className="sidebar-link"
              onClick={() => onChangeSeccion("bandeja")}
            >
              Bandeja de solicitudes
            </button>
            <button
              type="button"
              className="sidebar-link"
              onClick={() => onChangeSeccion("resoluciones")}
            >
              📋 Ver Resoluciones
            </button>
          </>
        )}
      </nav>

      <span className="sidebar-logout">Cerrar sesión</span>
    </aside>
  );
}
