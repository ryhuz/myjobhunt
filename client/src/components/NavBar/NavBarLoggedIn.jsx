import React from 'react'
import { NavLink } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap'


function NavBarLoggedIn() {

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">My Job Hunt</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <NavLink to="/dashboard" className="btn mx-2">Dashboard</NavLink>
                    <Nav.Link href="#home">Account</Nav.Link>
                    {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown> */}
                    <NavLink to='/logout' className="btn mx-2" >Log Out</NavLink>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBarLoggedIn
