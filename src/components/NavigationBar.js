import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';

function BasicExample() {
    const [token, setToken] = useState("");
    const [hasToken, setHasToken] = useState(false);
    const [userRole, setUserRole] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"));
            setHasToken(true);
            // Assuming you store the user role in localStorage as well
            setUserRole(localStorage.getItem("userRole"));
        }
    }, [token]);

    const handleHomeClick = (e) => {
        e.preventDefault();
        switch(userRole) {
            case "administor":
                navigate("/Administor");
                break;
            case "student":
                navigate("/Student");
                break;
            case "lecturer":
                navigate("/Lecturer");
                break;
            default:
                navigate("/");
        }
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
                            <Nav.Link href="login">Logout</Nav.Link> :
                            <Nav.Link href="LogIn">Login</Nav.Link>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default BasicExample;