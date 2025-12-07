export default function Sidebar({ rol, seccion, onChangeSeccion, onLogout }) {
  return (
    <aside className="sidebar-rm">
      <div className="sidebar-header">
        <span className="sidebar-logo-icon">🕒</span>
        <span className="sidebar-logo-text">Reloj Marcador</span>
      </div>

      <nav className="sidebar-nav">
        <a
          href="#inicio"
          onClick={(e) => {
            e.preventDefault();
            onChangeSeccion("inicio");
          }}
          style={
            seccion === "inicio"
              ? { background: "#e5f0ff", color: "#0f59c3" }
              : undefined
          }
        >
          Inicio
        </a>

        {rol === 2 && (
          <a
            href="#marcas"
            onClick={(e) => {
              e.preventDefault();
              onChangeSeccion("marcas");
            }}
            style={
              seccion === "marcas"
                ? { background: "#e5f0ff", color: "#0f59c3" }
                : undefined
            }
          >
            Marcas
          </a>
        )}

        {rol === 3 && (
          <a
            href="#proc1"
            onClick={(e) => {
              e.preventDefault();
              onChangeSeccion("proc1");
            }}
            style={
              seccion === "proc1"
                ? { background: "#e5f0ff", color: "#0f59c3" }
                : undefined
            }
          >
            Proc1
          </a>
        )}
      </nav>

      <span className="sidebar-logout" onClick={onLogout}>
        Cerrar sesión
      </span>
    </aside>
  );
}