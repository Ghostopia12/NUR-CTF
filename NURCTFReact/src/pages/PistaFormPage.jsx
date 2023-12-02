import { Alert, Button, Card, Container, Form, FormControl, FormGroup } from "react-bootstrap";
import Menu from "../components/Menu";
import { useState, useEffect } from "react";
import { postSavePista, getPista, putPista, getListaDesafios } from "../services"; //, getPistaParticipants
import { useNavigate, useParams } from "react-router-dom";
import { HOME_URL } from "../navigation/CONSTANTS";
import { getAuthToken, validateLogin, checkIfUserIsAdmin } from "../utilities/TokenUtilities";

export default function PistaFormPage() {
    const navigate = useNavigate();

    /*    pista = models.CharField(max_length=50)
    costo = models.IntegerField()
    desafio = models.ForeignKey(Desafio, on_delete=models.CASCADE, related_name='desafio', null=False, default=1)
 */
    const [pista, setPista] = useState('');
    const [costo, setCosto] = useState(0);
    const [desafioLista, setDesafioLista] = useState([]);
    const [desafios, setDesafio] = useState([]);

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
        loadDesafios()
        if(id){
            loadPista(id);
        }
    }, [])

    const loadDesafios = () => {
        getListaDesafios(getAuthToken()).then((data) => {
            setDesafioLista(data);
        });
    }


    const [validated, setValidated] = useState(false);
    const [showAlertError, setShowAlertError] = useState(false)

    const loadPista = (id) => {
        getPista(getAuthToken(),id).then((data) => {
            console.log(data);
            //debugger
            setPista(data.pista);
/*             getPistaParticipants(getAuthToken(),data.id).then((data) => {
                setParticipantesPista(data);
            }); */
        });
    }

    const onPistasFormSubmit = (e) => {
        const form = e.currentTarget;
        let isValid = form.checkValidity();
        e.preventDefault();
        e.stopPropagation();

        setValidated(true);

        if (!isValid) return;
        if(id){
            updatePistas();
        }else{
            createPistas();
        }
    }

    const onDesafioSeleccionado = (e) => {
        setDesafio(e.target.value);
        console.log(desafios)
    }
    
    const updatePistas = () => {
        setShowAlertError(false);
        putPista(getAuthToken(), {
            pista,
            costo,
            desafio_id: desafios,
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

    const createPistas = () => {
        setShowAlertError(false);
        postSavePista(getAuthToken(), {
            pista,
            costo,
            desafio_id: desafios,
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
                            Formulario de pista
                        </Card.Title>
                        <div>
                            {showAlertError && <Alert variant="danger">
                                Error al enviar enviar datos, por favor intente nuevamente
                            </Alert>}
                            <Form noValidate onSubmit={onPistasFormSubmit} validated={validated}>
                                <FormGroup>
                                    <label>Pista</label>
                                    <FormControl value={pista} required
                                        onChange={(e) => {
                                            setPista(e.target.value);
                                        }} />
                                    <Form.Control.Feedback type="invalid">Necesitas un pista</Form.Control.Feedback>
                                </FormGroup>
                                <FormGroup>
                                    <label>Costo</label>
                                    <FormControl value={costo} required
                                        onChange={(e) => {
                                            setCosto(e.target.value);
                                        }} type="number" />
                                    <Form.Control.Feedback type="invalid">Necesitas un costo</Form.Control.Feedback>
                                </FormGroup>
                                <FormGroup>
                                <label>Desafio</label>
                                <Form.Control as="select" value={desafios} onChange={onDesafioSeleccionado}>
                                <option value="">Seleccione una opción</option>
                                {desafioLista.map((desafio) => (
                                    <option key={desafio.id} value={desafio.id}>{desafio.titulo}</option>
                                ))}
                                </Form.Control>
                                </FormGroup>
                                <div className="mt-3">
                                    <Button type="submit">Guardar pista</Button>
                                </div>
                            </Form>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}
