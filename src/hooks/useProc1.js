import { useState } from "react";
import { ejecutarPROC1 } from "../services/proc1Service";

export function useProc1() {
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");
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

    const ejecutarProceso = async () => {

        if (!fechaInicio || !fechaFin) {
            
            openModal("error", "Error", "Debes seleccionar ambas fechas.");
            return;
        }

        const payload = {
            fechaInicio: `${fechaInicio}T00:00:00Z`,
            fechaFin: `${fechaFin}T23:59:59Z`
        };


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
        modal, closeModal,
        ejecutarProceso
    };
}
