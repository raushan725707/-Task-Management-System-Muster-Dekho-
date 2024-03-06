import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaUserAlt } from "react-icons/fa";


function Navbar1() {
  return (
    <>
      
      <Navbar className="bg-body-tertiary text-white" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">Task Managment System</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">


        <NavDropdown title="User" id="basic-nav-dropdown">
              <NavDropdown.Item href="/register">signup</NavDropdown.Item>
              <NavDropdown.Item href="/userlogin">Login</NavDropdown.Item>
              
            </NavDropdown>
&nbsp;
          <Navbar.Text>
          <FaUserAlt />
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>


    </>
  )
}

export default Navbar1
