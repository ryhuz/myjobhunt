import React from 'react'
import { Button, Nav, Navbar } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

function NavBarLoggedOut({ modalSetting }) {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">My Job Hunt</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Button variant='' className="mx-2" onClick={()=>modalSetting('login', true)} >Log In</Button>
                    <Button variant='' className="mx-2" onClick={()=>modalSetting('register', true)}>Register</Button>
                    <NavLink to="/" className="btn mx-2">About</NavLink>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBarLoggedOut
