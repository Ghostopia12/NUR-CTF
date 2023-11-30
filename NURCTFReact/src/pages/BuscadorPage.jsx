import { Card, Container, Button, Nav, Navbar, Image } from "react-bootstrap";
import Menu from "../components/Menu";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { buscarXNombre, delDesafio } from "../services";
import { getAuthToken, validateLogin } from "../utilities/TokenUtilities";
import {  useNavigate } from "react-router-dom";
import { DESAFIO_DETAIL_URL, DESAFIO_EDIT_URL, TIPO_EDIT_URL } from "../navigation/CONSTANTS";


export default function BuscadorPage(){
    const navigate = useNavigate();
    const [listaDesafios, setListaDesafios] = useState({});

    const AdminGameComponent = ({ owner, game }) => {
        let content = null;
      
        if (owner) {
          content =                      
          <>   
          <Button onClick={()=> {
                  deleteDesafio(game.id)
          }}>Eliminar</Button>
          <Link to={'http://127.0.0.1:5173'+DESAFIO_EDIT_URL+game.id}>Editar</Link>
        </>;
        }
      
        return (
            {content}
        );
      };
      

    useEffect(() => {
        const loginValid = validateLogin(navigate);
        if (!loginValid) {
            return;
        }
        loadDesafios()
    }, [])
    

    const loadDesafios = () => {
        buscarXNombre(getAuthToken(), 'data').then((data) => {
            setListaDesafios(data);
            console.log(data);
        });
    }

    const deleteDesafio = (id) => {
        delDesafio(getAuthToken(),id).then((data) => {
            //setListaDesafios(data);
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
                            Desafios
                        </Card.Title>
                        <ul>
                        {listaDesafios.map((desafio) => (
                            <li key={desafio.id}>
                            <Link to={'http://127.0.0.1:5173'+DESAFIO_DETAIL_URL+desafio.id}>
                              <h1>{desafio.nombre}</h1>
                              <Image alt={desafio.nombre} src={desafio.foto}/>
                              <p>{desafio.precio}</p>
                            </Link>
  {/*                                                         <AdminGameComponent owner={localStorage.getItem('is_admin')} game={desafio}/>
*/}                         </li>
                                ))}
                        </ul>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}
