import React from 'react';
import { signOut , getAuth} from 'firebase/auth';
import {useNavigate} from "react-router-dom";


const Logout = () => {

    const navigate = useNavigate();
    const auth = getAuth();

    const logout = async (e) => {
        e.preventDefault()

        try{
            await signOut(auth);

            navigate('/');
        } catch (error) {
            console.log("logout error:", error)
        }
    }
    return (
        <button id="very-small-btn" onClick={logout}>Cerrar sesión</button>
    );
};

export default Logout;