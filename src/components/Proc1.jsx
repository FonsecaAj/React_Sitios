// src/components/Proc1.jsx

import React from "react";
import { useProc1 } from "../hooks/useProc1";
import MessageModal from "./MessageModal"; // Importamos el componente MessageModal
import "../styles/Proc1.css"; 

export default function Proc1() {

    // Destructuramos todas las props necesarias de useProc1()
    const {
        fechaInicio, setFechaInicio,
        fechaFin, setFechaFin,
        areaId, setAreaId,
        usuarioId, setUsuarioId,
        areas, funcionarios,
        modal, closeModal, // Estado del modal y su función de cierre
        ejecutarProceso // Función que maneja la lógica y puede abrir el modal
    } = useProc1();
    
    // Función para manejar el clic en el botón (opcional, podrías dejar onClick={ejecutarProceso})
    const handleExecute = () => {
        ejecutarProceso();
    };

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
                        onClick={handleExecute}
                    >
                        Ejecutar proceso
                    </button>
                </div>
            </div>

            {/* =================================================== */}
            {/* INVOCACIÓN DEL COMPONENTE MESSAGE MODAL */}
            {/* Reemplazamos todo el markup anterior con el componente */}
            {/* =================================================== */}
            <MessageModal
                show={modal.show}
                type={modal.type}
                title={modal.title}
                message={modal.message}
                onClose={closeModal} // Pasamos la función del hook
            />

        </div>
    );
}