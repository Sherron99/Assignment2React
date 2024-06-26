import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavigationBar() {
    const [token, setToken] = useState("");
    const [hasToken, setHasToken] = useState(false);
    const [userRole, setUserRole] = useState("");
    const navigate = useNavigate();
    const storedToken = localStorage.getItem("token");
    const storedUserRole = localStorage.getItem("userRole");

    useEffect(() => {
        if (storedToken) {
            setToken(storedToken);
            setHasToken(true);
        }
        if (storedUserRole) {
            setUserRole(storedUserRole);
            console.log("Setting user role to:", storedUserRole);
        }
    }, [storedToken, storedUserRole]);

    useEffect(() => {
        console.log("User role updated:", userRole);
    }, [userRole]);

    const handleHomeClick = (e) => {
        e.preventDefault();
        console.log("Current user role:", userRole);
        switch(userRole) {
            case "administor":
                console.log("Navigating to /Administor");
                navigate("/Administor");
                break;
            case "student":
                console.log("Navigating to /Student");
                navigate("/Student");
                break;
            case "lecturer":
                console.log("Navigating to /Lecturer");
                navigate("/Lecturer");
                break;
            default:
                console.log("Navigating to /");
                navigate("/");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userRole");
        setToken("");
        setHasToken(false);
        setUserRole("");
        navigate("/");
    };

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link onClick={handleHomeClick}>Home</Nav.Link>
                        {hasToken ?
                            <Nav.Link onClick={handleLogout}>Logout</Nav.Link> :
                            <Nav.Link href="LogIn">Login</Nav.Link>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
            <div>Current User Role: {userRole}</div>
        </Navbar>
    );
}

export default NavigationBar;