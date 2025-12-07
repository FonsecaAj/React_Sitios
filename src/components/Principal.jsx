// src/components/Principal.jsx
import logo from "../assets/logo.jpg";

export default function Principal({ nombreCompleto }) {
  const nombreMostrar = nombreCompleto || "";

  return (
    <div className="principal-rm">
      <div className="principal-logo-wrapper">
        <img
          src={logo}                
          alt="Logo de la empresa"
          className="principal-logo"
        />
      </div>
      <h2 className="principal-title">{nombreMostrar}</h2>
    </div>
  );
}
