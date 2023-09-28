import React, { useState } from 'react';
import '../Styles/login.css';
import { auth } from '../config/firebase'; 
import { createUserWithEmailAndPassword} from 'firebase/auth'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = async (e) => {
    e.preventDefault();
    
    try {
      // Sign in the user using Firebase authentication
      await createUserWithEmailAndPassword(auth,email, password);
      // If successful, you can redirect the user or perform other actions here
      console.log('User signed in successfully');
    } catch (error) {
      // Handle authentication errors here (e.g., display an error message)
      console.error('Error signed in:', error);
    }
  };

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
      </form>
    </div>
  );
}

export default Login;
