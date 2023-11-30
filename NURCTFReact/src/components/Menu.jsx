import { Container, Nav, Navbar, Form, FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { DESAFIO_CREATE_URL, HOME_URL, TIPO_CREATE_URL, ABOUT_URL, PERFIL_URL } from "../navigation/CONSTANTS";//LOGIN_URL
import { useState } from "react";
//import { buscarXNombre } from "../services";

export default function Menu () {
    //const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (event) => {
      event.preventDefault();
      console.log('Realizar búsqueda:', searchQuery);
      /*buscarXNombre(localStorage.getItem('token'),searchQuery).then((data) => {
        console.log(data);        
        });*/
      setSearchQuery('');
    };

    function logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh');
        localStorage.removeItem('is_superuser');
        localStorage.removeItem("user");
        window.location.reload()
    }

    const AdminComponent = ({ owner }) => {
        let content = null;
      
        if (owner) {
          content =                      
          <>   
        <Link className="nav-link" to={DESAFIO_CREATE_URL}>Crear Desafio</Link>
        <Link className="nav-link" to={TIPO_CREATE_URL}>Crear Desafio</Link>
        </>;
        }
      
        return (
            {content}
        );
      };
    const isAdmin = localStorage.getItem('is_superuser') === 'true';
    return (
        <>
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container fluid>
                <Navbar.Brand to={HOME_URL}>NUR CTF</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Form inline onSubmit={handleSearch}>
                </Form>
                    <Nav className="me-auto">
                        <Link className="nav-link" to={ABOUT_URL}>Inicio</Link>
{/*                         <AdminComponent owner={isAdmin} />
 */}                        
         <Link className="nav-link" to={HOME_URL}>Desafios</Link>
         <Link className="nav-link" to={PERFIL_URL}>Perfil</Link>
         <Link className="nav-link" to={DESAFIO_CREATE_URL}>Crear Desafio</Link>
        <Link className="nav-link" to={TIPO_CREATE_URL}>Crear Tipo</Link>
        <Link className="nav-link" to={TIPO_CREATE_URL}>Crear Pista</Link>
                        <Link className="nav-link" onClick={ logout }>
                            Cerrar sesión
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        </>
    );
}