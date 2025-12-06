// src/components/Home.jsx

export default function Home({ nombreCompleto }) {
  return (
    <div className="text-center home-welcome">
      <img
        src="/imagen/logo.jpg"
        alt="Logo de la empresa"
        width="130"
        className="mb-4 rounded-circle shadow-sm home-logo"
      />
      <h2 className="fw-semibold text-primary">
        Bienvenido, {nombreCompleto}
      </h2>
    </div>
  );
}
