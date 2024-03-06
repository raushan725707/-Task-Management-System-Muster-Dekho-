import React, { useState, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../src/STYLE/UserAuth.css'; // Import CSS file for styling
import { Link } from 'react-router-dom';
import Navbar1 from './Navbar';



// Create AuthContext
const AuthContext = createContext();

const UserLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Initialize isLogged state and setIsLogged function
  const [isLogged, setIsLogged] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/login', { username, password });
      if (response.data.status === 200) {
        console.log('Login successful:', response.data);
        alert("Login Success")
        localStorage.setItem("username",username);
        setIsLogged(true)
        navigate("/tasks")
      } else if (response.data.status === 401) {
        alert("Invalid username or password")
        setUsername("")
        setPassword("")
      } else {
        alert("Invalid username or password")
        setUsername("")
        setPassword("")
      }
    } catch (error) {
      console.error('Login failed:', error.response.data);
    }
  };

  // Render the UserLogin component with AuthContext.Provider
  return (
    <AuthContext.Provider value={isLogged}>

       
    <Navbar1 />


      <div className="login-container">
        <h2>Login</h2>
        <input className="login-input" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input className="login-input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="login-button" onClick={handleLogin} type="submit">Login</button>
        <Link to="/register"><button className="signup-button">Signup</button></Link>
      </div>
    </AuthContext.Provider>
  );
};

export default UserLogin;

export {AuthContext}