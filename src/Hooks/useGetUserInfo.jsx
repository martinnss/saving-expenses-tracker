import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export const useGetUserInfo =  () => {
  const [userInfo, setUserInfo] = useState(null);

  const navigate = useNavigate()



    /*
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
        navigate('/login')
        console.log("nope")
      }
    });
    */




    const getUser = async (e) => {
      
      try{
        //await signInWithEmailAndPassword(auth, email, password)
        
        const getUserInfo = await fetch('http://localhost:8000/get-user-info', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        console.log(getUserInfo)
        setUserInfo({
          uid: getUserInfo.uid,
          displayName: getUserInfo.displayName,
          email: getUserInfo.email,
          // Agrega otros campos de usuario que necesites aquí.
        });
        console.log(getUserInfo)
    } catch (error) {
        console.log("login error:", error)
        navigate('/login')
    }
    };

    
    // Devolvemos una función de limpieza para detener la suscripción cuando el componente se desmonte.
    return getUser()
};
