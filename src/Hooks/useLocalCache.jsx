import { useState, useEffect } from 'react';

const useLocalCache = (key, initialValue) => {
  // Estado para almacenar el caché local
  const [data, setData] = useState(() => {
    // Intenta obtener la data desde el almacenamiento local
    const cachedData = localStorage.getItem(key);
    return cachedData ? JSON.parse(cachedData) : initialValue;
  });

  // Efecto para guardar la data en el almacenamiento local cuando cambia
  useEffect(() => {
    // Convierte la data a cadena JSON y guárdala en el almacenamiento local
    localStorage.setItem(key, JSON.stringify(data));
  }, [data, key]); // Se ejecutará cada vez que la data o la clave cambien

  // Devuelve la data y una función para actualizarla
  return [data, setData];
};

export default useLocalCache;
