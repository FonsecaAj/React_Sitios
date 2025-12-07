import { useState, useEffect } from "react";
import { ejecutarPROC1 } from "../services/proc1Service";

export function useProc1() {

    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");

    const [areaId, setAreaId] = useState(null);
    const [usuarioId, setUsuarioId] = useState(null);

    const [areas, setAreas] = useState([]);
    const [funcionarios, setFuncionarios] = useState([]);

    const [modal, setModal] = useState({
        show: false,
        type: "",
        title: "",
        message: ""
    });

    const openModal = (type, title, message) => {
        setModal({ show: true, type, title, message });
    };

    const closeModal = () => {
        setModal({ show: false, type: "", title: "", message: "" });
    };

    // ================================
    // Cargar Áreas
    // ================================
    const cargarAreas = async () => {
        try {
            const resp = await fetch("/proc1-api/areas");
            const data = await resp.json();

            console.log("API Áreas:", data);

            const mapped = (data.responseObject || []).map(a => ({
                id: a.iD_Area,
                nombre: a.nombre_Area
            }));

            console.log("Áreas mapeadas:", mapped);
            setAreas(mapped);

        } catch (error) {
            console.warn("Error cargando áreas", error);
        }
    };

    // ================================
    // Cargar Funcionarios
    // ================================
    const cargarFuncionarios = async () => {
        try {
            const resp = await fetch("/proc1-api/funcionarios");
            const data = await resp.json();

            const mapped = (data.responseObject || []).map(f => ({
                id: f.iD_Usuario,
                nombreCompleto: f.nombre
            }));

            setFuncionarios(mapped);

        } catch (error) {
            console.warn("Error cargando funcionarios", error);
        }
    };

    // Se ejecuta al montar el componente
    useEffect(() => {
        cargarAreas();
        cargarFuncionarios();
    }, []);

    // ================================
    // Ejecutar Proceso
    // ================================
    const ejecutarProceso = async () => {

        if (!fechaInicio || !fechaFin) {
            openModal("error", "Error", "Debes seleccionar ambas fechas.");
            return;
        }

        const payload = {
            fechaInicio: `${fechaInicio}T00:00:00Z`,
            fechaFin: `${fechaFin}T23:59:59Z`,
            areaId: areaId ? Number(areaId) : null,
            usuarioId: usuarioId ? Number(usuarioId) : null
        };

        console.log("Payload enviado:", payload);

        try {
            const response = await ejecutarPROC1(payload);

            openModal("success", "Proceso completado", response.message);

        } catch (err) {
            openModal("error", "Fallo", err.message);
        }
    };

    return {
        fechaInicio, setFechaInicio,
        fechaFin, setFechaFin,
        areaId, setAreaId,
        usuarioId, setUsuarioId,
        areas,
        funcionarios,
        modal,
        closeModal,
        ejecutarProceso
    };
}
