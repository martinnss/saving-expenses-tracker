import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import { auth , provider} from '../config/firebase'; 
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

import firebase from 'firebase/app';
import 'firebase/auth';


import '../Styles/login.css'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const login = async (e) => {
        e.preventDefault()

        try{
            //await signInWithEmailAndPassword(auth, email, password)
            
            const loginWithEmailAndPassword = await fetch('http://localhost:8000/login-with-credentials', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email:email, password:password }),
            });
            console.log(loginWithEmailAndPassword)
            if (loginWithEmailAndPassword.status === 200) {
                navigate('/Tracker');
            }
        } catch (error) {
            console.log("login error:", error)
        }
    }

    
    const loginWithGoogle = async () => {
        try {
            //await signInWithPopup(auth, provider)

            const loginWithPopup = await fetch('http://localhost:8000/login-with-popup', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            navigate("/Tracker")   
        } catch (error){
            console.log("google login error:")
        }
      }
return (
    <div className="login-container">
        <header>
        <div className="header headerlogin">
            <div className="logo" id='logo'>
                <img id='logo-login' src="https://firebasestorage.googleapis.com/v0/b/saving-expenses-tracker.appspot.com/o/logos%2Foutput-onlinepngtools%20(1).png?alt=media&token=3cc14b4a-0b1f-4fd8-8bd1-b54a2861b3ef" alt="walleton logo, a pig" />
                <h1 className='logo-text'>Walleton</h1>
            </div>
        </div>
        </header>
        <div className="login-box">
            <h2>Iniciar Sesión</h2>
            <form>
            <button type="button" onClick={loginWithGoogle} className='login-with-google-btn btn-google'>Acceder con Google</button> <br />
            <div className="form-group">
                <label htmlFor="username">Correo Electrónico</label>
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
            
            </form>
        </div>
    </div>
);
};

export default Login;
