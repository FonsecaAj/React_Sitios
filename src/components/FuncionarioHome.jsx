// src/components/FuncionarioHome.jsx

export default function FuncionarioHome({ user, onLogout }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#f3f4f6",
      }}
    >
      <header
        style={{
          background: "#111827",
          color: "#fff",
          padding: "0.75rem 1.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <strong>Reloj Marcador – Funcionario</strong>
        </div>
        <div>
          <span style={{ marginRight: "0.75rem" }}>{user.nombreCompleto}</span>
          <button onClick={onLogout}>Cerrar sesión</button>
        </div>
      </header>

      <main style={{ flex: 1, padding: "2rem" }}>
        <h2>Bienvenido(a), {user.nombreCompleto}</h2>
        <p>
          Esta es la pantalla del módulo de funcionario. Aquí irán las opciones
          de Marcas, Inconsistencias, Permisos, etc.
        </p>
      </main>
    </div>
  );
}
