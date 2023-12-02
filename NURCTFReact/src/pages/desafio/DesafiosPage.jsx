import React, { useEffect, useState } from "react";
import Menu from "../../components/Menu";
import { getListaDesafios, getListaDesafiosUsuariosResueltos, getListaTipo, postRespuestaDesafio } from "../../services";
import { Alert, Button, Card, Container, Form, FormControl, FormGroup, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { validateLogin } from "../../utilities/TokenUtilities";


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
    const [showAlertError, setShowAlertError] = useState(false);
    const [mensajeError, setMensajeError] = useState('');
    const [showMessageCorrect, setShowMessageCorrect] = useState(false);
    const [listaDesafiosIntentosDispobles, setListaDesafiosIntentosDispobles] = useState([]);



    useEffect(() => {
        const loginValid = validateLogin(navigate);
        if (!loginValid) {
            return;
        }
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
        setRespuesta('');
        setShowAlertError(false);
    };

    const cerrarModal = () => {
        setMostrarModal(false);
        setValidated(false);
        setRespuesta('');
        setShowAlertError(false);
    };

    const handleClickDesafio = (desafio, tipo) => {
        // navigate(`/desafio/${desafioId}`);
        abrirModal();
        obtenerIntentosDisponibles(desafio.id);
        setDesafioActual(desafio);
        setTipoActual(tipo);
    }
    
    const obtenerIntentosDisponibles = (desafioId) => {
        let intentos = 0;
        listaDesafiosIntentosDispobles.forEach((item) => {
            if (item.desafio_u === desafioId) {
                intentos = item.intentos;
            }
        });
        desafioActual.intentosDisponibles = intentos;
    }

    const onSubmitFlag = (e) => {
        setShowAlertError(false);
        console.log(respuesta);
        const form = e.currentTarget;
        let isValid = form.checkValidity();
        e.preventDefault();
        e.stopPropagation();
        setValidated(true);
        if (!isValid) return;
        saveRespuesta();
    }
    
    const mensajeMotivacional = () => {
        setTimeout(() => {
            setShowMessageCorrect(false);
        }, 3000);
    }

    const saveRespuesta = () => {
        postRespuestaDesafio(localStorage.getItem('token'), {
            desafio_id: desafioActual.id,
            usuario_id: localStorage.getItem('user_id'),
            respuesta: respuesta
        })
            .then((data) => {
                setRespuesta('');
                console.log(data);
                fetchResueltos();
                cerrarModal();
                setShowMessageCorrect(true);
                mensajeMotivacional();
            })
            .catch((error) => {
                setMensajeError("Respuesta incorrecta");
                setShowAlertError(true);
                console.error('Error saving respuesta:', error);
            });
    }

    return (
        <>
            <Card>
                <Menu />
                <h1 className="text-center bg-dark text-white">Desafios</h1>
                {showMessageCorrect && <Alert variant="success" className="mt-2 text-center">
                    Respuesta Correcta  + {desafioActual.puntos} puntos
                </Alert>}
                <Container>
                    {listaTipos.map((tipo) => (
                        <div key={tipo.id}>
                            <Card.Header className="text-center">{tipo.nombre}</Card.Header>
                            <div className="row justify-content-center">
                                {listaDesafios.map((desafio) => (
                                    <React.Fragment key={desafio.id}>
                                        {desafio.tipo.id === tipo.id && (
                                            <Card
                                                className={`col-md-3 mb-2 m-3 
                                                
                                                ${listaResueltos.some(item => item.desafio_u === desafio.id) ? 'bg-success' : ''}
                                                `}
                                                // ${desafio.intentos === 3 ? 'bg-danger' : ''}
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
                        {desafioActual.intentos !== 0 && (
                            <b>Limitado a {desafioActual.intentos} intentos.</b>
                        )}
                        <br />
                        <br />

                        {/* {desafioActual.intentos === 3 ? (
                            <Alert variant="danger" className="mt-4">
                                No tienes más intentos
                            </Alert>
                        ) : ( */}
                            <FormGroup>
                                <FormControl value={respuesta} required placeholder="NurCTF{flag}"
                                    onChange={(e) => {
                                        setRespuesta(e.target.value);
                                    }} />
                                <Form.Control.Feedback type="invalid">Insert flag</Form.Control.Feedback>
                            </FormGroup>
                        {/* )} */}
                        {showAlertError && <Alert variant="danger" className="mt-4">
                            {mensajeError}
                        </Alert>}
                    </Modal.Body>
                    <Modal.Footer>
                        {/* {desafioActual.intentos < 3 && ( */}
                            <Button variant="primary" type="submit">
                                Enviar
                            </Button>
                        {/* )} */}
                        <Button variant="secondary" onClick={cerrarModal}>
                            Cerrar
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );

};

export default DesafiosPage;