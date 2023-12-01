import React, { useEffect, useState } from "react";
import Menu from "../../components/Menu";
import { getListaDesafios, getListaDesafiosUsuariosResueltos, getListaTipo, postRespuestaDesafio } from "../../services";
import { Button, Card, Container, Form, FormControl, FormGroup, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const DesafiosPage = () => {
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);
    const [listaResueltos, setListaResueltos] = useState([]);
    const [listaTipos, setListaTipos] = useState([]);
    const [listaDesafios, setListaDesafios] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [desafioActual, setDesafioActual] = useState({});
    const [tipoActual, setTipoActual] = useState({});
    const [respuesta, setRespuesta] = useState('');


    useEffect(() => {
        fetchResueltos();
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

    const fetchResueltos = () => {
        getListaDesafiosUsuariosResueltos(localStorage.getItem('token'))
            .then((data) => {
                setListaResueltos(data);
            })
            .catch((error) => {
                console.error('Error fetching desafios:', error);
            });
    };

    const abrirModal = () => {
        setMostrarModal(true);
        setValidated(false);
    };

    const cerrarModal = () => {
        setMostrarModal(false);
        setValidated(false);
    };

    const handleClickDesafio = (desafio, tipo) => {
        // navigate(`/desafio/${desafioId}`);
        abrirModal();
        setDesafioActual(desafio);
        setTipoActual(tipo);
    }

    const onSubmitFlag = (e) => {
        console.log(respuesta);
        const form = e.currentTarget;
        let isValid = form.checkValidity();
        e.preventDefault();
        e.stopPropagation();
        setValidated(true);
        if (!isValid) return;
        saveRespuesta();
    }

    const saveRespuesta = () => {
        "desafio_id": [
            "This field is required."
        ],
        "usuario_id": [
            "This field is required."
        ],
        "intento": [
            "This field is required."
        ]
        postRespuestaDesafio(localStorage.getItem('token'), desafioActual.id, respuesta)
            .then((data) => {
                console.log(data);
                fetchResueltos();
                cerrarModal();
            })
            .catch((error) => {
                console.error('Error fetching desafios:', error);
            });
    }

    return (
        <>
            <Card>
                <Menu />
                <h1 className="text-center bg-dark text-white">Desafios</h1>
                <Container>
                    {listaTipos.map((tipo) => (
                        <div key={tipo.id}>
                            <Card.Header className="text-center">{tipo.nombre}</Card.Header>
                            <div className="row justify-content-center">
                                {listaDesafios.map((desafio) => (
                                    <React.Fragment key={desafio.id}>
                                        {desafio.tipo.id === tipo.id && (
                                            <Card
                                                className={`col-md-3 mb-2 m-3 ${listaResueltos.some(item => item.desafio_u === desafio.id) ? 'bg-success' : ''}`}
                                                onClick={() => handleClickDesafio(desafio, tipo)}
                                            >
                                                <Card.Body className="text-center">
                                                    <Card.Title>{desafio.titulo}</Card.Title>
                                                    <Card.Text>{desafio.puntos}</Card.Text>
                                                    {/* <Card.Text>{desafio.id}</Card.Text> */}
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

            <Modal show={mostrarModal} onHide={cerrarModal}>
                <Form noValidate onSubmit={onSubmitFlag} validated={validated}>
                    <Modal.Header closeButton>
                        <Modal.Title>{tipoActual.nombre}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body className="text-center">
                        <h1>{desafioActual.titulo}</h1>
                        <h4>{desafioActual.puntos}</h4>
                        <h7>
                            {desafioActual.descripcion}
                        </h7>
                        {desafioActual.archivo && !desafioActual.archivo.includes("null") && (
                            <>
                                <br />
                                <a
                                    href={desafioActual.archivo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    download
                                >
                                    Descargar Archivo
                                </a>
                            </>
                        )}
                        <br />
                        <br />

                        <FormGroup>
                            <FormControl value={respuesta} required placeholder="NurCTF{flag}"
                                onChange={(e) => {
                                    setRespuesta(e.target.value);
                                }} />
                            <Form.Control.Feedback type="invalid">Insert flag</Form.Control.Feedback>
                        </FormGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit" variant="primary">
                            Submit
                        </Button>
                        <Button variant="secondary" onClick={cerrarModal}>
                            Cerrar
                        </Button>
                        {/* Puedes agregar más botones según tus necesidades */}
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );

};

export default DesafiosPage;