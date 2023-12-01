import { Card, Container, Button, Nav, Navbar, Image } from "react-bootstrap";
import Menu from "../components/Menu";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getListaDesafios, delDesafio, getListaTipo, delTipo } from "../services";
import { getAuthToken, validateLogin } from "../utilities/TokenUtilities";
import {  useNavigate } from "react-router-dom";
import { DESAFIO_DETAIL_URL, DESAFIO_EDIT_URL, TIPO_EDIT_URL } from "../navigation/CONSTANTS";


export default function HomePage(){
    const navigate = useNavigate();
    const [listaTipos, setListaTipos] = useState([]);
    const [listaDesafios, setListaDesafios] = useState({});

    const AdminGameComponent = ({ owner, game }) => {
        let content = <></>;
      
        if (owner) {
          content =                      
          <>   
          <Button onClick={()=> {
                  deleteDesafio(game.id)
          }}>Eliminar</Button>
          <Link to={'http://localhost:5173'+DESAFIO_EDIT_URL+game.id}>Editar</Link>
        </>;
        }
      
        return (
            {content}
        );
      };
      
    const AdminTipoComponent = ({ owner, tipo }) => {
      
    
      
        return (owner ?
              <>   
              <Button onClick={()=> {
                      deleteTipo(tipo.id)
              }}>Eliminar</Button>
              <Link to={'http://localhost:5173'+TIPO_EDIT_URL+tipo.id}>Editar</Link>
            </> : <></>
      );    

    };

    useEffect(() => {
        const loginValid = validateLogin(navigate);
        if (!loginValid) {
            return;
        }
        loadDesafios()
        loadTipos()
    }, [])
    

    const loadDesafios = () => {
        getListaDesafios(getAuthToken()).then((data) => {
            setListaDesafios(data);
            console.log(data);
        });
    }
    const loadTipos = () => {
        getListaTipo(getAuthToken()).then((data) => {
            setListaTipos(data);
        });
    }

    const deleteDesafio = (id) => {
        delDesafio(getAuthToken(),id).then((data) => {
            //setListaDesafios(data);
        });
    }

    const deleteTipo = (id) => {
      delTipo(getAuthToken(),id).then((data) => {
          //setListaTipos(data);
      });
  }

    const GameDetail = ({ game }) => {
        return (
          <div>
            <h2>{game.nombre}</h2>
            <p>Precio: {game.precio}</p>
            <img src={game.foto} alt={game.nombre} />
          </div>
        );
      };
      

    return (
        <>
            <Menu />
            <Container>
                <Card>
                    <Card.Body>
                        <Card.Title>
                            Home
                            Aqui se coloca la informacion de la pagina principal de que se trata el juego
                        </Card.Title>
                        <ul>
                            {listaTipos.map((tipo) => (
                            <li key={tipo.id}>
                                      <Navbar  expand="lg">
                                <Container fluid>
                                    <Navbar.Brand >
                                    {tipo.nombre}
                                    <Image src={tipo.foto} alt={tipo.nombre}/>
                                    <Button onClick={()=> {
                                            deleteTipo(tipo.id)
                                    }}>Eliminar</Button>
                                    <Link to={'http://localhost:5173'+TIPO_EDIT_URL+tipo.id}>Editar</Link>
                                    <AdminTipoComponent owner={localStorage.getItem('is_admin')} tipo={tipo}/>
                                    </Navbar.Brand>
                                    <Navbar.Toggle aria-controls="basic-navbar-nav"  />
                                                      <Navbar.Collapse id="basic-navbar-nav">
                                                      <Nav className="me-auto">
                                                        <Link>xd</Link>
                                                      {listaDesafios.map((desafio) => (
                                                        <li key={desafio.id}>
                                                        <Link to={'http://localhost:5173'+DESAFIO_DETAIL_URL+desafio.id}>
                                                          <h1>{desafio.nombre}</h1>
                                                          <Image alt={desafio.nombre} src={desafio.foto}/>
                                                          <p>{desafio.precio}</p>
                                                        </Link>
{/*                                                         <AdminGameComponent owner={localStorage.getItem('is_admin')} game={desafio}/>
 */}                                                        </li>
                                                      ))}
                                        </Nav>
                                    </Navbar.Collapse>
                                </Container>
                            </Navbar>
                            </li>
                            ))}
                        </ul>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}
