import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; 

/**
 * Componente de Modal de Mensaje reutilizable con estilos de Bootstrap.
 *
 * @param {object} props - Propiedades del componente.
 * @param {boolean} props.show - Controla la visibilidad del modal.
 * @param {'success' | 'error' | 'info'} props.type - Determina el color del encabezado y el tipo de botón.
 * @param {string} props.title - Título del modal.
 * @param {string} props.message - Mensaje principal del modal.
 * @param {function} props.onClose - Función para cerrar el modal (ej. closeModal).
 */
export default function MessageModal({ show, type, title, message, onClose }) {

    // useEffect para controlar la clase 'modal-open' en el <body> y bloquear el scroll
    useEffect(() => {
        if (show) {
            document.body.classList.add("modal-open");
        } else {
            document.body.classList.remove("modal-open");
        }
        
        // Función de limpieza para asegurar que la clase se elimine cuando el componente se desmonte
        return () => {
            document.body.classList.remove("modal-open");
        };
    }, [show]);

    // Si 'show' es falso, no renderiza nada
    if (!show) return null;

    // Determina las clases de estilo para el encabezado
    const headerClass =
        type === "success"
            ? "bg-success text-white"
            : type === "error"
            ? "bg-danger text-white"
            : "bg-info text-white";

    // Determina el texto y la clase del botón del pie de página
    const buttonText = type === "success" ? "Aceptar" : "Cerrar";
    const buttonClass = type === "success" ? "btn-success" : "btn-secondary";

    return (
        <>
            {/* Backdrop: Fonde oscuro y semi-transparente */}
            <div className="modal-backdrop fade show"></div>

            {/* Modal principal: Clases d-block y show para forzar la visibilidad */}
            <div 
                className="modal fade show d-block" 
                tabIndex="-1" 
                role="dialog" 
                aria-labelledby="messageModalLabel"
                aria-modal="true" // Importante para la accesibilidad
            >
                {/* modal-dialog-top: Centra el modal verticalmente en la parte superior */}
                <div className="modal-dialog modal-top"> 
                    <div className="modal-content">

                        {/* HEADER: Color dinámico y título */}
                        <div className={`modal-header ${headerClass}`} id="modalHeader">
                            <h5 className="modal-title fw-semibold" id="messageModalLabel">{title}</h5>
                            <button 
                                type="button" 
                                className="btn-close" 
                                onClick={onClose} 
                                aria-label="Cerrar"
                            ></button>
                        </div>

                        {/* BODY: Mensaje */}
                        <div className="modal-body text-center">
                            <p className="mb-0">{message}</p>
                        </div>

                        {/* FOOTER: Botón dinámico centrado */}
                        <div className="modal-footer justify-content-center">
                            <button
                                type="button" 
                                className={`btn px-4 ${buttonClass}`}
                                onClick={onClose}
                            >
                                {buttonText}
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}