import React, { useEffect, useState } from "react";
import Menu from "../../components/Menu";
import { getListaDesafios, getListaTipo } from "../../services";
import { Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const DesafiosPage = () => {
    const navigate = useNavigate();
    const [listaTipos, setListaTipos] = useState([]);
    const [listaDesafios, setListaDesafios] = useState([]);


    useEffect(() => {
        fetchDesafios();
        fetchTiposDeDesafios();
    }, []);

    const fetchTiposDeDesafios = () => {
        getListaTipo(localStorage.getItem('token'))
            .then((data) => {
                setListaTipos(data);
            })
            .catch((error) => {
                console.error('Error fetching tipos:', error);
            });
    };

    const fetchDesafios = () => {
        getListaDesafios(localStorage.getItem('token'))
            .then((data) => {
                setListaDesafios(data);
            })
            .catch((error) => {
                console.error('Error fetching desafios:', error);
            });
    };

    const handleClickDesafio = (desafioId) => {
        navigate(`/desafio/${desafioId}`);
    }

    return (
        <>
            <Card>
                <Menu />
                <h1 className="text-center bg-dark text-white">Desafios</h1>
                <Container>
                    {listaTipos.map((tipo) => (
                        <div key={tipo.id}>
                            <Card.Header>{tipo.nombre} {tipo.id}</Card.Header>
                            <div className="row justify-content-center">
                                {listaDesafios.map((desafio) => (
                                    <React.Fragment key={desafio.id}>
                                        {desafio.tipo.id === tipo.id && (
                                            <Card
                                                className="col-md-3 mb-2 m-3"
                                                onClick={() => handleClickDesafio(desafio.id)}
                                            >
                                                <Card.Body className="text-center">
                                                    <Card.Title>{desafio.titulo}</Card.Title>
                                                    <Card.Text>{desafio.puntos}</Card.Text>
                                                </Card.Body>
                                            </Card>
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    ))}
                </Container>
            </Card>
        </>
    );
};

export default DesafiosPage;