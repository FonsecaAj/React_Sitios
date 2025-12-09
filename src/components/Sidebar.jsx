// src/components/Sidebar.jsx
export default function Sidebar({ rol, seccion, onChangeSeccion, onLogout }) {
  const rolNumero = Number(rol || 0);

  console.log("ROL dentro del Sidebar:", rolNumero);

  return (
    <aside className="sidebar-rm">
      <div className="sidebar-header">
        <span className="sidebar-logo-icon">🕒</span>
        <span className="sidebar-logo-text">Reloj Marcador</span>
      </div>

      <nav className="sidebar-nav">
        {/* Siempre Inicio */}
        <a
          href="#inicio"
          className="inicio-link"
          onClick={(e) => {
            e.preventDefault();
            onChangeSeccion("inicio");
          }}
          style={
            seccion === "inicio" ? { background: "#e5f0ff" } : undefined
          }
        >
          Inicio
        </a>

        {/* Solo FUNCIONARIO (rol 2) */}
        {rolNumero === 2 && (
          <>
            <a
              href="#marcas"
              onClick={(e) => {
                e.preventDefault();
                onChangeSeccion("marcas");
              }}
              style={seccion === "marcas" ? { background: "#e5f0ff" } : undefined}
            >
              Marcas
            </a>

            {/* USR5 */}
            <a
              href="#justificaciones"
              onClick={(e) => {
                e.preventDefault();
                onChangeSeccion("usr5-inconsistencias");
              }}
              style={
                seccion === "usr5-inconsistencias" ? { background: "#e5f0ff" } : undefined
              }
            >
              Justificaciones
            </a>

            {/* USR6 */}
            <a
              href="#permisos"
              onClick={(e) => {
                e.preventDefault();
                onChangeSeccion("usr6-permisos");
              }}
              style={
                seccion === "usr6-permisos" ? { background: "#e5f0ff" } : undefined
              }
            >
              Permisos
            </a>

            {/* USR7 */}
            <a
              href="#nueva-vacacion"
              onClick={(e) => {
                e.preventDefault();
                onChangeSeccion("usr7-nueva");
              }}
              style={seccion === "usr7-nueva" ? { background: "#e5f0ff" } : undefined}
            >
              Solicitar Vacación
            </a>

            {/* USR7 */}
            <a
              href="#mis-vacaciones"
              onClick={(e) => {
                e.preventDefault();
                onChangeSeccion("usr7-mis");
              }}
              style={seccion === "usr7-mis" ? { background: "#e5f0ff" } : undefined}
            >
              Mis Vacaciones
            </a>
          </>
        )}


        {/* Solo JEFATURA (rol 3) */}
        {rolNumero === 3 && (
          <>
            {/* Inconsistencias (ya existente) */}
            <a
              href="#proc1"
              onClick={(e) => {
                e.preventDefault();
                onChangeSeccion("proc1");
              }}
              style={
                seccion === "proc1" ? { background: "#e5f0ff" } : undefined
              }
            >
              Inconsistencias
            </a>

            <a
              href="#pendientes"
              onClick={(e) => {
                e.preventDefault();
                onChangeSeccion("jefatura-pendientes");
              }}
              style={
                seccion === "jefatura-pendientes"
                  ? { background: "#e5f0ff" }
                  : undefined
              }
            >
              Pendientes Jefatura
            </a>

            <a
              href="#resoluciones"
              onClick={(e) => {
                e.preventDefault();
                onChangeSeccion("jefatura-resoluciones");
              }}
              style={
                seccion === "jefatura-resoluciones"
                  ? { background: "#e5f0ff" }
                  : undefined
              }
            >
              Resoluciones
            </a>
          </>
        )}
      </nav>

      <span className="sidebar-logout" onClick={onLogout}>
        Cerrar sesión
      </span>
    </aside>
  );
}
