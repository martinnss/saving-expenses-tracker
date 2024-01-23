import React, { useState } from 'react';
import {useNavigate} from "react-router-dom"
import '../Styles/signup.css';
import { auth , provider} from '../config/firebase'; 
import { createUserWithEmailAndPassword , signInWithPopup, updateProfile } from 'firebase/auth'

import { useAddUser } from '../Hooks/useAddUser';



function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const { addUser, error } = useAddUser(); // Usa el hook/ Pass userCredentials as an argument

  const navigate = useNavigate();

  const signIn = async (e) => {
    e.preventDefault();

    try {
      // Sign in the user using Firebase authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Actualiza el nombre del usuario
      await updateProfile(userCredential.user, {
        displayName: displayName,
      });

      addUser(userCredential.user.uid, email, displayName);
      navigate('/Tracker');
    } catch (error) {
      // Handle authentication errors here (e.g., display an error message)
      console.error('Error signed in:', error);
    }
  }

  const signInWithGoogle = async (e) => {
    e.preventDefault()

    try {
      const results = await signInWithPopup(auth, provider)
      const authInfo = {
        userID: results.user.uid,
        name: results.user.displayName,
        profilePhoto: results.user.photoURL,
        isAuth: true,
      }
      console.log(results)
      localStorage.setItem("auth", JSON.stringify( authInfo))
      addUser(results.user.uid, results.user.email, results.user.displayName);
      navigate("/Tracker")
      
    } catch(error){
      console.error('Error google sign in:', error);
    }
  }

  return (
    <div className="signup-container">
        <header>
        <div className="header">
            <div className="logo" id='logo'>
                <img id='logo-login' src="https://firebasestorage.googleapis.com/v0/b/saving-expenses-tracker.appspot.com/o/logos%2Foutput-onlinepngtools%20(1).png?alt=media&token=3cc14b4a-0b1f-4fd8-8bd1-b54a2861b3ef" alt="walleton logo, a pig" />
                <h1 className='logo-text'>Walleton</h1>
            </div>
        </div>
        </header>
      <h1>Regístrate</h1>
      <p>Obtén un control total de tus gastos ¡Ahora! </p> <br />
      <form id='signup-form' >
        <button className='login-with-google-btn btn-google' onClick={signInWithGoogle}> Registrarse con Google </button> 
        <br />

        <div className="form-group">
          <label>Correo Electrónico</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Contraseña</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Nombre</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
          />
        </div>
        <button type="submit" onClick={signIn}>Sign In</button>
      </form>
    </div>
  );
}

export default Signup;
