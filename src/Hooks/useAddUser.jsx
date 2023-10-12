import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase'; // Importa la instancia de Firebase

export const useAddUser = () => {
  const [error, setError] = useState(null);

  const addUser = async (uid, email, name) => {
    try {
      const usersRef = collection(db, 'users');
      const santiagoTimeZone = 'America/Santiago'; // Zona horaria de Santiago de Chile
        const horaActualSantiago = new Date().toLocaleString('es-CL', { timeZone: santiagoTimeZone });

      // Agregar el usuario a la colección "users" con UID como identificador
      await addDoc(usersRef, {
        uid: uid,
        email: email,
        name: name,
        createdAt:horaActualSantiago
      });
    } catch (error) {
      console.error('Error al agregar usuario a Firebase:', error);
      setError('Error al agregar usuario');
    }
  };

  return { addUser, error };
};
