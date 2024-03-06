import React, { useState } from 'react';
import axios from 'axios';
import '../src/STYLE/UserRegister.css'; // Import CSS file for styling
import { useNavigate } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaUserAlt } from "react-icons/fa";
import Navbar1 from './Navbar';



const UserRegister = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/signup', { username, password });
      console.log('Registration response status:', response.status);
      console.log('Registration successful:', response.data);
      if(response.data.status===200){
        alert("registration successfully")
        navigate("/");

      }
      if(response.data.status===409){
        alert("username is already registerd!");
        setUsername("");
        setPassword("")

      }
      // Handle successful registration (e.g., show success message)
    } catch (error) {
      console.error('Registration failed:', error);
      console.error('Registration error response:', error.response);
      console.error('Registration error data:', error.response.data);
    }
  };
  return (
    <>
    <Navbar1 />

    <div className="register-container mt-2">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Register</button>
      </form>
    </div>
    </>
  );
};

export default UserRegister;
