
import axios from "axios";

const api = axios.create({
  baseURL: "https://tiusr25pl.cuc-carrera-ti.ac.cr/ApiLogin",
});


export async function login(usuario, contrasenna) {
  const response = await api.post(
    "/login",
    null,
    {
      headers: {
        usuario,
        contrasenna,
      },
    }
  );


  return response.data;
}
