import { useEffect, useState } from "react";
import { fetchAreas } from "../services/areaService";

export function useAreas() {
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await fetchAreas();
      setAreas(data);
    };
    load();
  }, []);

  return { areas };
}