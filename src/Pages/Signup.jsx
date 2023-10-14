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
      <h1>Signup</h1>
      <form id='signup-form' >
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
          />
        </div>
        <button type="submit" onClick={signIn}>Sign In</button>
        <button className='signup-with-google-btn' onClick={signInWithGoogle}> Sign in With Google </button>
      </form>
    </div>
  );
}

export default Signup;
