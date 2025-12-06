// src/App.jsx
import { useState } from "react";
import "./styles/Login.css";

import ListadoMarcas from "./components/ListadoMarcas";
import ListadoInconsistencias from "./components/ListadoInconsistencias";
import Personas from "./components/Personas";
import RelojMarcadorApp from "./RelojMarcadorApp"; 

function App() {
  // vista puede ser "personas" o "reloj"
  const [vista, setVista] = useState("personas");

  const esPersonas = vista === "personas";

  return (
    <div className="app-root">

      <header className="app-header">
        <div className="header-inner">
          <div className="brand">
            <h1>
              {esPersonas ? "Administración de Personas" : "Reloj Marcador"}
            </h1>
            <p className="subtitle">
              {esPersonas
                ? "Datos de personas"
                : "Módulo de marcas, permisos e inconsistencias"}
            </p>
          </div>

          <div className="header-actions">
            <button
              className={`tab-btn ${esPersonas ? "active" : ""}`}
              onClick={() => setVista("personas")}
            >
              Personas
            </button>
            <button
              className={`tab-btn ${!esPersonas ? "active" : ""}`}
              onClick={() => setVista("reloj")}
            >
              Reloj Marcador
            </button>
          </div>
        </div>
      </header>

      <main className="app-main">
        {esPersonas ? (
          <>
        
            <ListadoInconsistencias />
            {/* <ListadoMarcas /> */}
          </>
        ) : (
    
          <RelojMarcadorApp />
        )}
      </main>

      <footer className="app-footer">
        <small>CUC - 2025 &copy; Todos los derechos reservados</small>
      </footer>
    </div>
  );
}

export default App;
