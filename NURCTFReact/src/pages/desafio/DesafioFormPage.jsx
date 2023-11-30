import { Alert, Button, Card, Container, Form, FormControl, FormGroup } from "react-bootstrap";
import Menu from "../../components/Menu";
import { useState, useEffect } from "react";
import { postSaveDesafio, getDesafio, putDesafio, getListaTipo } from "../../services"; //, getDesafioParticipants
import { useNavigate, useParams } from "react-router-dom";
import { HOME_URL } from "../../navigation/CONSTANTS";
import { getAuthToken, validateLogin } from "../../utilities/TokenUtilities";

export default function DesafioFormPage() {
    const navigate = useNavigate();

    const [nombre, setNombre] = useState('');
    const [tipos, setTipos] = useState([]);
    const [listaTipos, setListaTipos] = useState([]);
    const [owner_id, setOwner] = useState('');
    const [precio, setPrecio] = useState(0);
    const [foto, setFoto] = useState('');

    let { id } = useParams();

    useEffect(() => {
        const loginValid = validateLogin(navigate);
        if (!loginValid) {
            return;
        }
        loadTipos()
        if(id){
            loadDesafio(id);
        }
    }, [])

    const loadTipos = () => {
        getListaTipo(getAuthToken()).then((data) => {
            setListaTipos(data);
        });
    }

    const [validated, setValidated] = useState(false);
    const [showAlertError, setShowAlertError] = useState(false)

    const loadDesafio = (id) => {
        getDesafio(getAuthToken(),id).then((data) => {
            console.log(data);
            debugger
            setNombre(data.nombre);
            setTipos(data.tipos);
            setOwner(data.owner_id);
            setPrecio(data.precio);
            setFoto(data.foto);
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
        const tipo_id = listaTipos.map((tipo) => tipo.id);
        putDesafio(getAuthToken(), {
            nombre,
            tipos: tipo_id,
            precio,
            foto,
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
        const tipo_id = listaTipos.map((tipo) => tipo.id);
        postSaveDesafio(getAuthToken(), {
            nombre,
            precio,
            foto,
            owner_id: localStorage.getItem("user_id"),
            tipos: tipo_id
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
                                    <label>Nombre</label>
                                    <FormControl value={nombre} required
                                        onChange={(e) => {
                                            setNombre(e.target.value);
                                        }} />
                                    <Form.Control.Feedback type="invalid">Necesitas un nombre</Form.Control.Feedback>
                                </FormGroup>
                                <FormGroup>
                                    <label>Precio</label>
                                    <FormControl value={precio} required
                                        onChange={(e) => {
                                            setPrecio(e.target.value);
                                        }} type="number" />
                                    <Form.Control.Feedback type="invalid">Necesitas un precio</Form.Control.Feedback>
                                </FormGroup>
                                <FormGroup>
                                    <label>Foto</label>
                                    <FormControl required
                                        onChange={(e) => {
                                            setFoto(e.target.files[0]);
                                        }} type="file"/>
                                    <Form.Control.Feedback type="invalid">Necesitas una foto</Form.Control.Feedback>
                                </FormGroup>
                                {listaTipos.map((tipo) => {

                                    //const participaEnDesafio = participantesDesafio.some(participante => participante.id === usuario.id);

                                    return (
                                        <label key={tipo.id}>
                                        <input
                                            type="checkbox"
/*                                             checked={participantesDesafio.some((p) => p.id === usuario.id)}
 *//*                                             disabled={
                                                participantesDesafio.some((p) => p.id === usuario.id && p.id === owner_id_id)
                                            } */
                                            value={tipo.id}
                                        />
                                        {tipo.nombre}
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
