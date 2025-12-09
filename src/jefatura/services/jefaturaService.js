import axios from "axios";

const API_URL = "/jefatura-api";

export const getPendientes = async () => {
  let permisos = [];
  let justificaciones = [];
  let vacaciones = [];

  try {
    const p = await axios.get(`${API_URL}/pendientes/permisos`);
    permisos = Array.isArray(p.data) ? p.data : [];
    console.log("Pendientes PERMISOS (raw):", permisos);
  } catch (err) {
    console.error(
      "Error permisos pendientes:",
      err.response?.status,
      err.response?.data || err.message
    );
  }

  try {
    const j = await axios.get(`${API_URL}/pendientes/justificaciones`);
    justificaciones = Array.isArray(j.data) ? j.data : [];
    console.log("Pendientes JUSTIFICACIONES (raw):", justificaciones);
  } catch (err) {
    console.error(
      "Error justificaciones pendientes:",
      err.response?.status,
      err.response?.data || err.message
    );
  }

  try {
    const v = await axios.get(`${API_URL}/pendientes/vacaciones`);
    vacaciones = Array.isArray(v.data) ? v.data : [];
    console.log("Pendientes VACACIONES (raw):", vacaciones);
  } catch (err) {
    console.error(
      "Error vacaciones pendientes:",
      err.response?.status,
      err.response?.data || err.message
    );
  }

  return { data: { permisos, justificaciones, vacaciones } };
};

export const resolverPermiso = async (registro, decision, observacion) => {
  let idPermiso =
    typeof registro === "number"
      ? registro
      : (
          registro.ID_Permiso ??
          registro.IdPermiso ??
          registro.idPermiso ??
          registro.id_Permiso ??
          registro.iD_Permiso ??
          null
        );

  console.log("resolverPermiso -> base (registro):", registro);
  console.log("resolverPermiso -> idPermiso calculado:", idPermiso);

  if (!idPermiso) {
    console.error(
      "resolverPermiso: no se pudo determinar el ID_Permiso a partir del registro:",
      registro
    );
    throw new Error(
      "No se pudo determinar el ID del permiso a resolver. Revisa la consola para ver la fila completa."
    );
  }

  const payload = {
    IdPermiso: idPermiso,
    IdJefatura: 14, 
    Decision: decision,
    Observacion: observacion,
  };

  console.log("resolverPermiso -> payload enviado a backend:", payload);

  return axios.post(`${API_URL}/permisos/resolver`, payload);
};

export const resolverJustificacion = async (
  idRegistro,
  decision,
  observacion
) => {
  const payload = {
    IdInconsistenciaUsuario: idRegistro,
    IdJefatura: 14,
    Decision: decision,
    Observacion: observacion,
  };

  console.log("resolverJustificacion -> payload:", payload);

  return axios.post(`${API_URL}/justificaciones/resolver`, payload);
};

export const resolverVacacion = async (idRegistro, decision, observacion) => {
  const payload = {
    IdVacacion: idRegistro,
    IdJefatura: 14,
    Decision: decision,
    Observacion: observacion,
  };

  console.log("resolverVacacion -> payload:", payload);

  return axios.post(`${API_URL}/vacaciones/resolver`, payload);
};

export const getResoluciones = async (filtros = {}) => {
  const params = {
    page: 1,
    pageSize: 10,
    ...filtros,
  };

  try {
    const { data } = await axios.get(`${API_URL}/resoluciones`, { params });
    console.log("getResoluciones ->", data);
    return data;
  } catch (err) {
    console.error(
      "Error Resoluciones:",
      err.response?.status,
      err.response?.data || err.message
    );
    throw err;
  }
};
