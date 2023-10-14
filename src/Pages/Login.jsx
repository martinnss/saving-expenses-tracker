import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import { auth , provider} from '../config/firebase'; 
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

import '../Styles/login.css'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const login = async (e) => {
        e.preventDefault()

        try{
            await signInWithEmailAndPassword(auth, email, password)

            navigate('/Tracker');
        } catch (error) {
            console.log("login error:", error)
        }
    }

    
    const loginWithGoogle = async () => {
        try {
            await signInWithPopup(auth, provider)

            navigate("/Tracker")   
        } catch (error){
            console.log("google login error:")
        }
      }
return (
    <div className="login-container">
        <div className="login-box">
            <h2>Iniciar Sesión</h2>
            <form>
            <div className="form-group">
                <label htmlFor="username">Correo Electronico</label>
                <input 
                    type="text" 
                    id="username" 
                    name="username" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <input 
                    type="password" 
                    id="password" 
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button type="submit" onClick={login}>Ingresar</button>
            <button type="button" onClick={loginWithGoogle}>Iniciar Sesión con Google</button>
            </form>
        </div>
    </div>
);
};

export default Login;
