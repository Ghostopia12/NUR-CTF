import { Alert, Button, Card, Container, Form, FormControl, FormGroup } from "react-bootstrap";
import Menu from "../../components/Menu";
import { useState, useEffect } from "react";
import { postSaveDesafio, getDesafio, putDesafio, getListaTipo } from "../../services"; //, getDesafioParticipants
import { useNavigate, useParams } from "react-router-dom";
import { HOME_URL } from "../../navigation/CONSTANTS";
import { getAuthToken, validateLogin } from "../../utilities/TokenUtilities";

export default function DesafioFormPage() {
    const navigate = useNavigate();


    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [tipoLista, setTipoLista] = useState([]);
    const [tipos, setTipo] = useState('');
    const [puntos, setPuntos] = useState(0);
    const [respuesta, setRespuesta] = useState('');
    const [archivo, setArchivo] = useState(null);
    const [intentos, setIntentos] = useState(0);
    const [url, setUrl] = useState('');

    let { id } = useParams();

    useEffect(() => {
        const loginValid = validateLogin(navigate);
        if (!loginValid) {
            return;
        }
        loadTipo()
        if(id){
            loadDesafio(id);
        }
    }, [])

    const loadTipo = () => {
        getListaTipo(getAuthToken()).then((data) => {
            setTipoLista(data);
        });
    }

    const [validated, setValidated] = useState(false);
    const [showAlertError, setShowAlertError] = useState(false)

    const loadDesafio = (id) => {
        getDesafio(getAuthToken(),id).then((data) => {
            console.log(data);
            debugger
            setTitulo(data.titulo);
            setDescripcion(data.descripcion);
            setTipo(data.tipo);
            setPuntos(data.puntos);
            setIntentos(data.intentos);
            setRespuesta(data.respuesta);
            setUrl(data.url);
            setArchivo(data.archivo);
/*             getDesafioParticipants(getAuthToken(),data.id).then((data) => {
                setParticipantesDesafio(data);
            }); */
        });
    }

    const onDesafiosFormSubmit = (e) => {
        const form = e.currentTarget;
        let isValid = form.checkValidity();
        e.preventDefault();
        e.stopPropagation();

        setValidated(true);

        if (!isValid) return;
        if(id){
            updateDesafios();
        }else{
            createDesafios();
        }
    }
    
    const updateDesafios = () => {
        setShowAlertError(false);
        const tipo_id = tipoLista.map((tipo) => tipo.id);
        putDesafio(getAuthToken(), {
            titulo,
            descripcion,
            tipo_id: tipos,
            puntos,
            intentos,
            respuesta,
            url,
            archivo,
            id
        })
            .then((data) => {
                if (!data.id) {
                    setShowAlertError(true);
                    return;
                }
                navigate(HOME_URL);
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    setShowAlertError(true);
                } else {
                    console.log(error);
                }
            });
    }

    const onTipoSeleccionado = (e) => {
        setTipo(e.target.value);
        console.log(tipos)
    }

    const createDesafios = () => {
        setShowAlertError(false);
        const tipo_id = tipoLista.map((tipo) => tipo.id);
        postSaveDesafio(getAuthToken(), {
            titulo,
            descripcion,
            tipo_id: tipos,
            puntos,
            intentos,
            respuesta,
            url,
            archivo
        })
            .then((data) => {
                if (!data.id) {
                    setShowAlertError(true);
                    return;
                }
                navigate(HOME_URL);
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    setShowAlertError(true);
                } else {
                    console.log(error);
                }
            });
    }
    return (
        <>
            <Menu />
            <Container>
                <Card className="mt-3">
                    <Card.Body>
                        <Card.Title>
                            Formulario de desafio
                        </Card.Title>
                        <div>
                            {showAlertError && <Alert variant="danger">
                                Error al enviar enviar datos, por favor intente nuevamente
                            </Alert>}
                            <Form noValidate onSubmit={onDesafiosFormSubmit} validated={validated}>
                                <FormGroup>
                                    <label>Titulo</label>
                                    <FormControl value={titulo} required
                                        onChange={(e) => {
                                            setTitulo(e.target.value);
                                        }} />
                                    <Form.Control.Feedback type="invalid">Necesitas un titulo</Form.Control.Feedback>
                                </FormGroup>
                                <FormGroup>
                                    <label>Descripcion</label>
                                    <FormControl value={descripcion} required
                                        onChange={(e) => {
                                            setDescripcion(e.target.value);
                                        }} />
                                    <Form.Control.Feedback type="invalid">Necesitas un descripcion</Form.Control.Feedback>
                                </FormGroup>
                                <FormGroup>
                                    <label>URL</label>
                                    <FormControl value={url} required
                                        onChange={(e) => {
                                            setUrl(e.target.value);
                                        }} />
                                </FormGroup>
                                <FormGroup>
                                    <label>Respuesta</label>
                                    <FormControl value={respuesta} required
                                        onChange={(e) => {
                                            setRespuesta(e.target.value);
                                        }} />
                                    <Form.Control.Feedback type="invalid">Necesitas un respuesta</Form.Control.Feedback>
                                </FormGroup>
                                <FormGroup>
                                    <label>Puntos</label>
                                    <FormControl value={puntos} required
                                        onChange={(e) => {
                                            setPuntos(e.target.value);
                                        }} type="number" />
                                    <Form.Control.Feedback type="invalid">Necesitas un puntos</Form.Control.Feedback>
                                </FormGroup>
                                <FormGroup>
                                    <label>Intentos</label>
                                    <p>Si no quieres limite, dejalo en 0</p>
                                    <FormControl value={intentos} required
                                        onChange={(e) => {
                                            setIntentos(e.target.value);
                                        }} type="number" />
                                    <Form.Control.Feedback type="invalid">Necesitas un intentos</Form.Control.Feedback>
                                </FormGroup>
                                <FormGroup>
                                <label>Tipo</label>
                                <Form.Control as="select" value={tipos} onChange={onTipoSeleccionado}>
                                <option value="">Seleccione una opción</option>
                                {tipoLista.map((tipo) => (
                                    <option key={tipo.id} value={tipo.id}>{tipo.nombre}</option>
                                ))}
                                </Form.Control>
                                </FormGroup>
                                <FormGroup>
                                    <label>Archivo</label>
                                    <FormControl 
                                        onChange={(e) => {
                                            setArchivo(e.target.files[0]);
                                        }} type="file"/>
                                </FormGroup>
                                {/* lista de participantes, es decir usuarios marcados por un checkbox los que esten parcados son participantes y los que no no */}
                                <div className="mt-3">
                                    <Button type="submit">Guardar desafio</Button>
                                </div>
                            </Form>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}
