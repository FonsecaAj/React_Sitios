import React from "react";
import { useProc1 } from "../hooks/useProc1";
import "../styles/Proc1.css";

export default function Proc1() {

    const {
        fechaInicio, setFechaInicio,
        fechaFin, setFechaFin,
        areaId, setAreaId,
        usuarioId, setUsuarioId,
        areas, funcionarios,
        modal, closeModal,
        ejecutarProceso
    } = useProc1();

    return (
        <div className="container">
            <h2 className="titulo-seccion">
                Procesos administrativos de generación de inconsistencias
            </h2>

            <div className="card">
                <div className="row">

                    {/* Fecha inicio */}
                    <div className="col-md-3">
                        <label className="form-label">Fecha inicio</label>
                        <input
                            type="date"
                            className="form-control"
                            value={fechaInicio}
                            onChange={(e) => setFechaInicio(e.target.value)}
                            required
                        />
                    </div>

                    {/* Fecha fin */}
                    <div className="col-md-3">
                        <label className="form-label">Fecha fin</label>
                        <input
                            type="date"
                            className="form-control"
                            value={fechaFin}
                            onChange={(e) => setFechaFin(e.target.value)}
                            required
                        />
                    </div>

                    {/* Área */}
                    <div className="col-md-3 col-area">
                        <label className="form-label">Área (opcional)</label>
                        <select
                            className="form-select"
                            value={areaId ?? ""}
                            onChange={(e) => setAreaId(e.target.value || null)}
                        >
                            <option value="">-- Todas --</option>
                            {areas.map(area => (
                                <option key={area.id} value={area.id}>
                                    {area.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Funcionario */}
                    <div className="col-md-3">
                        <label className="form-label">Funcionario (opcional)</label>
                        <select
                            className="form-select"
                            value={usuarioId ?? ""}
                            onChange={(e) => setUsuarioId(e.target.value || null)}
                        >
                            <option value="">-- Todos --</option>
                            {funcionarios.map(f => (
                                <option key={f.id} value={f.id}>
                                    {f.nombreCompleto}
                                </option>
                            ))}
                        </select>
                    </div>

                </div>

                {/* Botón ejecutar */}
                <div className="actions">
                    <button
                        className="btn btn-primary px-4"
                        onClick={ejecutarProceso}
                    >
                        Ejecutar proceso
                    </button>
                </div>
            </div>

            {/* Modal */}
            {modal.show && (
                <>
                    <div className="modal-backdrop fade show"></div>

                    <div className="modal fade show d-block">
                        <div className="modal-dialog modal-top">
                            <div className="modal-content">

                                {/* Encabezado */}
                                <div
                                    className={`modal-header text-white ${
                                        modal.type === "success" ? "bg-success" : "bg-danger"
                                    }`}
                                >
                                    <h5 className="modal-title fw-semibold">
                                        {modal.title}
                                    </h5>
                                    <button className="btn-close" onClick={closeModal}></button>
                                </div>

                                {/* Cuerpo */}
                                <div className="modal-body text-center">
                                    <p className="mb-0">{modal.message}</p>
                                </div>

                                {/* Footer */}
                                <div className="modal-footer justify-content-center">
                                    <button
                                        className={`btn px-4 ${
                                            modal.type === "success"
                                                ? "btn-success"
                                                : "btn-secondary"
                                        }`}
                                        onClick={closeModal}
                                    >
                                        Cerrar
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
