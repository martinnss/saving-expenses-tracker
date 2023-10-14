import { useState, useEffect } from 'react';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


export const useGetUserInfo = () => {
  const [userInfo, setUserInfo] = useState(null);
  const auth = getAuth();
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // El usuario está autenticado, puedes acceder a su información aquí.
        setUserInfo({
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          // Agrega otros campos de usuario que necesites aquí.
        });
      } else {
        // El usuario no está autenticado, establece userInfo a null o toma alguna otra acción.
        navigate('/signup')
      }
    });

    // Devolvemos una función de limpieza para detener la suscripción cuando el componente se desmonte.
    return () => unsubscribe();
  }, [auth]);

  return userInfo;
};
