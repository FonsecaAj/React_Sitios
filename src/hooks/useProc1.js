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
        type: "", // 'success', 'error', 'info'
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
            // Asegúrate de usar la URL que corresponde a tu servicio.
            const resp = await fetch("/proc1-api/areas");
            const data = await resp.json();

            const mapped = (data.responseObject || []).map(a => ({
                id: a.iD_Area,
                nombre: a.nombre_Area
            }));

            setAreas(mapped);

        } catch (error) {
            console.warn("Error cargando áreas", error);
            // Podrías mostrar un modal de error si la carga falla
            // openModal("error", "Error de carga", "No se pudieron obtener las áreas.");
        }
    };

    // ================================
    // Cargar Funcionarios
    // ================================
    const cargarFuncionarios = async () => {
        try {
            // Asegúrate de usar la URL que corresponde a tu servicio.
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

        // Validaciones de fechas requeridas
        if (!fechaInicio || !fechaFin) {
            openModal("error", "Error", "Debes seleccionar ambas fechas.");
            return;
        }

        // Lógica de validación de fechas (Migrada de C# OnPostAsync)
        const inicio = new Date(fechaInicio);
        const fin = new Date(fechaFin);
        const hoy = new Date();
        
        // Normalizar a inicio del día para la comparación de fechas
        hoy.setHours(0, 0, 0, 0); 
        inicio.setHours(0, 0, 0, 0);
        fin.setHours(0, 0, 0, 0);

        // Validación: No se permite fecha futura
        if (inicio > hoy || fin > hoy) {
            openModal("error", "Fechas no válidas", "No se puede ejecutar el proceso con fechas futuras.");
            return;
        }

        // Validación: Rango incorrecto
        if (inicio > fin) {
            openModal("error", "Rango incorrecto", "La fecha de inicio no puede ser posterior a la fecha de fin.");
            return;
        }
        
        // Creación del Payload para la API
        const payload = {
            // Se usa el formato ISO para el backend, asegurando zona horaria (T00:00:00Z y T23:59:59Z)
            fechaInicio: `${fechaInicio}T00:00:00Z`,
            fechaFin: `${fechaFin}T23:59:59Z`,
            // Se asegura que los IDs sean números o null
            areaId: areaId ? Number(areaId) : null,
            usuarioId: usuarioId ? Number(usuarioId) : null
        };

        console.log("Payload enviado:", payload);

        // Llamada al servicio
        try {
            const response = await ejecutarPROC1(payload);

                    // ============================
        // LIMPIAR CAMPOS AL EJECUTAR
        // ============================
            setFechaInicio("");
            setFechaFin("");
            setAreaId(null);
            setUsuarioId(null);

            // Éxito
            openModal(
                "success", 
                "Proceso completado", 
                response.message || `Proceso ejecutado correctamente del ${fechaInicio} al ${fechaFin}.`
            );

        } catch (err) {
            // Error
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