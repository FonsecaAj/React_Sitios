import "./styles/App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import ListadoInconsistencias from "./components/ListadoInconsistencias";
import Personas from "./components/Personas";
import Proc1 from "./components/Proc1";

function App() {
  return (
    <Router>
      <div className="app-root">
        <header className="app-header">
          <div className="header-inner">
            <div className="brand">
              <h1>Administración de Personas</h1>
              <p className="subtitle">Datos de personas</p>
            </div>

            {/* 🚀 Menú simple */}
            <nav>
              <Link to="/inconsistencias" className="me-3">Inconsistencias</Link>
              <Link to="/proc1">PROC1</Link>
            </nav>
          </div>
        </header>

        <main className="app-main">
          <Routes>
            <Route path="/" element={<ListadoInconsistencias />} />
            <Route path="/inconsistencias" element={<ListadoInconsistencias />} />
            <Route path="/proc1" element={<Proc1 />} />
          </Routes>
        </main>

        <footer className="app-footer">
          <small>CUC - 2025 &copy; Todos los derechos reservados</small>
        </footer>
      </div>
    </Router>
  );
}

export default App;
