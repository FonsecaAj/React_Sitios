import { useEffect, useState } from "react";
import { fetchFuncionarios } from "../services/funcionarioService";

export function useFuncionarios() {
  const [funcionarios, setFuncionarios] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await fetchFuncionarios();
      setFuncionarios(data);
    };

    load();
  }, []);

  return { funcionarios };
}