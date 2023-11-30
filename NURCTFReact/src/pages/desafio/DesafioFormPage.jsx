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
    const [tipo, setTipo] = useState('');
    const [puntos, setPuntos] = useState(0);
    const [respuesta, setRespuesta] = useState(0);
    const [archivo, setArchivo] = useState(null);

    let { id } = useParams();

    useEffect(() => {
        const loginValid = validateLogin(navigate);
        if (!loginValid) {
            return;
        }
        loadDescripcion()
        if(id){
            loadDesafio(id);
        }
    }, [])

    const loadDescripcion = () => {
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
            setRespuesta(data.respuesta);
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
            tipo,
            puntos,
            respuesta,
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

    const createDesafios = () => {
        setShowAlertError(false);
        const tipo_id = tipoLista.map((tipo) => tipo.id);
        postSaveDesafio(getAuthToken(), {
            titulo,
            descripcion,
            tipo,
            puntos,
            respuesta,
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
                                    <label>Respuesta</label>
                                    <FormControl value={respuesta} required
                                        onChange={(e) => {
                                            setRespuesta(e.target.value);
                                        }} type="number" />
                                    <Form.Control.Feedback type="invalid">Necesitas un respuesta</Form.Control.Feedback>
                                </FormGroup>
                                <FormGroup>
                                    <label>Archivo</label>
                                    <FormControl required
                                        onChange={(e) => {
                                            setArchivo(e.target.files[0]);
                                        }} type="file"/>
                                    <Form.Control.Feedback type="invalid">Necesitas una archivo</Form.Control.Feedback>
                                </FormGroup>
                                {tipoLista.map((tipo) => {

                                    //const participaEnDesafio = participantesDesafio.some(participante => participante.id === usuario.id);

                                    return (
                                        <label key={tipo.id}>
                                        <input
                                            type="checkbox"
/*                                             checked={participantesDesafio.some((p) => p.id === usuario.id)}
 *//*                                             disabled={
                                                participantesDesafio.some((p) => p.id === usuario.id && p.id === puntos_id)
                                            } */
                                            value={tipo.id}
                                        />
                                        {tipo.titulo}
                                        </label>
                                    )
                                })}
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
