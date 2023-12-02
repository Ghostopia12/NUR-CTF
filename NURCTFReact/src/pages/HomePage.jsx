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
                        <p>Todas las respuestas seran en mayusculas sin tilde y con espacios</p>
                        <Button href={LOGIN_URL} variant="danger">
                            Iniciar Sesión
                        </Button>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}
