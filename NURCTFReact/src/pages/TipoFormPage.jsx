import { Alert, Button, Card, Container, Form, FormControl, FormGroup } from "react-bootstrap";
import Menu from "../components/Menu";
import { useState, useEffect } from "react";
import { postSaveTipo, getTipo, putTipo } from "../services"; //, getTipoParticipants
import { useNavigate, useParams } from "react-router-dom";
import { HOME_URL } from "../navigation/CONSTANTS";
import { getAuthToken, validateLogin, checkIfUserIsAdmin } from "../utilities/TokenUtilities";

export default function TipoFormPage() {
    const navigate = useNavigate();

    const [nombre, setNombre] = useState('');

    let { id } = useParams();

    useEffect(() => {
        const loginValid = validateLogin(navigate);
        if (!loginValid) {
            return;
        }
        if(!checkIfUserIsAdmin()){
            navigate(HOME_URL);
            return;
        }
        if(id){
            loadTipo(id);
        }
    }, [])


    const [validated, setValidated] = useState(false);
    const [showAlertError, setShowAlertError] = useState(false)

    const loadTipo = (id) => {
        getTipo(getAuthToken(),id).then((data) => {
            console.log(data);
            //debugger
            setNombre(data.nombre);
/*             getTipoParticipants(getAuthToken(),data.id).then((data) => {
                setParticipantesTipo(data);
            }); */
        });
    }

    const onTiposFormSubmit = (e) => {
        const form = e.currentTarget;
        let isValid = form.checkValidity();
        e.preventDefault();
        e.stopPropagation();

        setValidated(true);

        if (!isValid) return;
        if(id){
            updateTipos();
        }else{
            createTipos();
        }
    }
    
    const updateTipos = () => {
        setShowAlertError(false);
        putTipo(getAuthToken(), {
            nombre,
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

    const createTipos = () => {
        setShowAlertError(false);
        postSaveTipo(getAuthToken(), {
            nombre
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
                            Formulario de tipo
                        </Card.Title>
                        <div>
                            {showAlertError && <Alert variant="danger">
                                Error al enviar enviar datos, por favor intente nuevamente
                            </Alert>}
                            <Form noValidate onSubmit={onTiposFormSubmit} validated={validated}>
                                <FormGroup>
                                    <label>Nombre</label>
                                    <FormControl value={nombre} required
                                        onChange={(e) => {
                                            setNombre(e.target.value);
                                        }} />
                                    <Form.Control.Feedback type="invalid">Necesitas un nombre</Form.Control.Feedback>
                                </FormGroup>
                                <div className="mt-3">
                                    <Button type="submit">Guardar tipo</Button>
                                </div>
                            </Form>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}
