import '../utilities/HomePage.css';
import { Card, Container, Button, Nav, Navbar, Image } from "react-bootstrap";
import Menu from "../components/Menu";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getListaDesafios, delDesafio, getListaTipo, delTipo } from "../services";
import { getAuthToken, validateLogin } from "../utilities/TokenUtilities";
import { useNavigate } from "react-router-dom";
import { DESAFIO_DETAIL_URL, DESAFIO_EDIT_URL, LOGIN_URL, TIPO_EDIT_URL } from "../navigation/CONSTANTS";


export default function HomePage() {
    const navigate = useNavigate();
    const [listaTipos, setListaTipos] = useState([]);
    const [listaDesafios, setListaDesafios] = useState({});

    const AdminGameComponent = ({ owner, game }) => {
        let content = <></>;

        if (owner) {
            content =
                <>
                    <Button onClick={() => {
                        deleteDesafio(game.id)
                    }}>Eliminar</Button>
                    <Link to={'http://localhost:5173' + DESAFIO_EDIT_URL + game.id}>Editar</Link>
                </>;
        }

        return (
            { content }
        );
    };

    const AdminTipoComponent = ({ owner, tipo }) => {



        return (owner ?
            <>
                <Button onClick={() => {
                    deleteTipo(tipo.id)
                }}>Eliminar</Button>
                <Link to={'http://localhost:5173' + TIPO_EDIT_URL + tipo.id}>Editar</Link>
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
        delDesafio(getAuthToken(), id).then((data) => {
            //setListaDesafios(data);
        });
    }

    const deleteTipo = (id) => {
        delTipo(getAuthToken(), id).then((data) => {
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
            <Container className="mt-5" >
                <Card className="home-card">
                    <Card.Body className="text-center">
                        <img
                            src="src/assets/Ing_sistemas.png"
                            alt="Imagen Principal"
                            className="home-image"
                        />
                        <Card.Title className="home-title">
                            Bienvenido a la Plataforma de Desafíos
                        </Card.Title>
                        <Card.Text className="home-text">
                            Aquí encontrarás emocionantes desafíos para poner a prueba tus habilidades de seguridad informática.
                        </Card.Text>
                        <Button href={LOGIN_URL} variant="danger">
                            Iniciar Sesión
                        </Button>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}
