// src/services/loginService.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://tiusr25pl.cuc-carrera-ti.ac.cr/ApiLogin",
});


export async function login(usuario, contrasenna) {
  const url = "/api/auth/login"; 

  console.log("Llamando a:", api.defaults.baseURL + url);

  const response = await api.post(
    url,
    null, 
    {
      headers: {
        usuario: usuario,
        contrasenna: contrasenna,
      },
    }
  );

  return response.data;
}
