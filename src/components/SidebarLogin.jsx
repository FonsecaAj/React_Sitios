// src/components/Sidebar.jsx

export default function Sidebar({ rol }) {
  return (
    <div className="sidebar">
      <h4>
        <i className="bi bi-clock-history"></i> Reloj Marcador
      </h4>

      {rol === 2 && (
        <>
          <a href="#inicio">
            <i className="bi bi-house"></i> Inicio
          </a>
          <a href="#marcas">
            <i className="bi bi-stopwatch"></i> Marcas
          </a>
          <a href="#inconsistencias">
            <i className="bi bi-exclamation-circle"></i> Inconsistencias
          </a>
          <a href="#permisos">
            <i className="bi bi-calendar-check"></i> Permisos
          </a>
          <a href="#nueva-vacacion">
            <i className="bi bi-calendar-plus"></i> Nueva Vacación
          </a>
          <a href="#mis-solicitudes">
            <i className="bi bi-ui-checks"></i> Mis Solicitudes
          </a>
        </>
      )}

      {rol === 3 && (
        <>
          <a href="#inicio">
            <i className="bi bi-house"></i> Inicio
          </a>
          <a href="#bandeja">
            <i className="bi bi-inboxes"></i> Bandeja de solicitudes
          </a>
          <a href="#resoluciones">
            <i className="bi bi-clipboard2-check"></i> Ver Resoluciones
          </a>
        </>
      )}

      <a href="#logout" className="text-danger">
        <i className="bi bi-box-arrow-right"></i> Cerrar sesión
      </a>
    </div>
  );
}
