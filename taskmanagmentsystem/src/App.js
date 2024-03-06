import React,{useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserLogin from './UserLogin';
import UserRegister from './UserRegister';
import TaskManagement from './TaskManagement';
import { Link } from 'react-router-dom';
import "./App.css"

import { FaUserAlt } from "react-icons/fa";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { AuthProvider } from './UserLogin'; // Import the AuthProvider from AuthContext
import Wrap from './Wrap';
import UpdateTask from './UpdateTask';
function App({children}) {


  const [showMenu, setShowMenu] = useState(false); // State to manage menu visibility


  const toggleMenu = () => {
    setShowMenu(!showMenu); // Toggle menu visibility
  };
  return (
    <Router>
      
<Routes>
<Route path="/" element={<Wrap />} />
       <Route path="/userlogin" element={<UserLogin />} /> 
        <Route path="/register" element={<UserRegister />} />
        <Route path="/tasks" element={<TaskManagement />} />
        <Route path="/updatetask/:id" element={<UpdateTask />} />

        </Routes>
    </Router>
  )
}

export default App
