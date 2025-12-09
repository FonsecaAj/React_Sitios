import './styles/App.css'
import './styles/personas.css'
import Personas from './components/Personas'

function App() {
  return (
    <div className="app-root">
      <header className="app-header">
        <div className="header-inner">
          <div className="brand">
            <h1>Administración de Personas</h1>
            <p className="subtitle">Datos de personas</p>
          </div>
        </div>
      </header>

      <main className="app-main">
        <Personas />
      </main>

      <footer className="app-footer">
        <small>CUC - 2025 &copy; Todos los derechos reservados</small>
      </footer>
    </div>
  )
}

export default App

