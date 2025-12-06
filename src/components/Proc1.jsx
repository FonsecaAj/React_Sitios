import React from "react";
import { useProc1 } from "../hooks/useProc1";
import "../styles/Proc1.css";

export default function Proc1() {

    const {
        fechaInicio, setFechaInicio,
        fechaFin, setFechaFin,
        areaId, setAreaId,
        usuarioId, setUsuarioId,
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

                    {/* 🔹 Aquí se añadió col-area */}
                    <div className="col-md-3 col-area">
                        <label className="form-label">Área (opcional)</label>
                        <select
                            className="form-select"
                            value={areaId ?? ""}
                            onChange={(e) => setAreaId(e.target.value || null)}
                        >
                            <option value="">-- Todas --</option>
                        </select>
                    </div>

                    <div className="col-md-3">
                        <label className="form-label">Funcionario (opcional)</label>
                        <select
                            className="form-select"
                            value={usuarioId ?? ""}
                            onChange={(e) => setUsuarioId(e.target.value || null)}
                        >
                            <option value="">-- Todos --</option>
                        </select>
                    </div>
                </div>

                <div className="actions">
                    <button className="btn btn-primary px-4" onClick={ejecutarProceso}>
                        Ejecutar proceso
                    </button>
                </div>
            </div>

            {modal.show && (
                <>
                    <div className="modal-backdrop fade show"></div>

                    <div className="modal fade show d-block">
                        <div className="modal-dialog modal-top">
                            <div className="modal-content">

                                <div className={`modal-header text-white ${modal.type === "success" ? "bg-success" : "bg-danger"}`}>
                                    <h5 className="modal-title fw-semibold">
                                        {modal.title}
                                    </h5>
                                    <button className="btn-close" onClick={closeModal}></button>
                                </div>

                                <div className="modal-body text-center">
                                    <p className="mb-0">{modal.message}</p>
                                </div>

                                <div className="modal-footer justify-content-center">
                                    <button
                                        className={`btn px-4 ${modal.type === "success" ? "btn-success" : "btn-secondary"}`}
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
