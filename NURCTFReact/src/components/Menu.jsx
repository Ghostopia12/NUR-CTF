import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { DESAFIO_CREATE_URL, HOME_URL, TIPO_CREATE_URL, PISTA_CREATE_URL, MARCADOR_URL, LOGIN_URL, DESAFIOS_URL } from "../navigation/CONSTANTS";

export default function Menu() {

    function logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh');
        localStorage.removeItem('is_superuser');
        localStorage.removeItem("user");
        window.location.reload()
    }

    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container fluid>
                    <Navbar.Brand href={HOME_URL}>NUR CTF</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Link className="nav-link" to={HOME_URL}>Inicio</Link>
                            <Link className="nav-link" to={DESAFIOS_URL}>Desafios</Link>
                            <Link className="nav-link" to={MARCADOR_URL}>Marcador Puntos</Link>
                            <Link className="nav-link" to={DESAFIO_CREATE_URL}>Crear Desafio</Link>
                            <Link className="nav-link" to={TIPO_CREATE_URL}>Crear Tipo</Link>
                            <Link className="nav-link" to={PISTA_CREATE_URL}>Crear Pista</Link>
                            <Link className="nav-link" to={LOGIN_URL} onClick={logout}>Logout</Link>
                        
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}