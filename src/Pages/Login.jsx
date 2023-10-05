import React, { useState } from 'react';
import {useNavigate} from "react-router-dom"
import '../Styles/login.css';
import { auth , provider} from '../config/firebase'; 
import { createUserWithEmailAndPassword , signInWithPopup} from 'firebase/auth'




function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate()

  const signIn = async (e) => {
    e.preventDefault();
    
    try {
      // Sign in the user using Firebase authentication
      await createUserWithEmailAndPassword(auth,email, password);
      // If successful, you can redirect the user or perform other actions here
      navigate("/Tracker")
    } catch (error) {
      // Handle authentication errors here (e.g., display an error message)
      console.error('Error signed in:', error);
    }
  };

  const signInWithGoogle = async () => {
    const results = await signInWithPopup(auth, provider)
    const authInfo = {
      userID: results.user.uid,
      name: results.user.displayName,
      profilePhoto: results.user.photoURL,
      isAuth: true,
    }
    localStorage.setItem("auth", JSON.stringify( authInfo))
    navigate("/Tracker")
  }

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form >
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
        <button type="submit" onClick={signIn}>Sign In</button>
        <button className='login-with-google-btn' onClick={signInWithGoogle}> Sign in With Google </button>
      </form>
    </div>
  );
}

export default Login;
