import { Alert, Button, Card, Container, Form, FormControl, FormGroup } from "react-bootstrap";
import Menu from "../../components/Menu";
import { useState } from "react";
import { postRegister } from "../../services";
import { useNavigate } from "react-router-dom";
import { HOME_URL, LOGIN_URL } from "../../navigation/CONSTANTS";

export default function RegisterPage() {
    const navigate = useNavigate();

    const [validated, setValidated] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showAlertError, setShowAlertError] = useState(false)

    const onRegisterSubmit = (e) => {
        const form = e.currentTarget;

        let isValid = form.checkValidity();

        e.preventDefault();
        e.stopPropagation();

        setValidated(true);
        
        if (!isValid) return;
        doRegister();
    }

    const doRegister = () => {
        setShowAlertError(false);
        postRegister(username, password)
            .then((data) => {
                localStorage.setItem("token", data.access);
                localStorage.setItem("refresh", data.refresh);
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
                            Registro
                        </Card.Title>
                        <div>
                            {showAlertError && <Alert variant="danger">
                                Usuario o contraseña incorrectas
                            </Alert>}
                            <Form noValidate onSubmit={onRegisterSubmit} validated={validated}>
                                <FormGroup>
                                    <label>Usuario</label>
                                    <FormControl value={username} required
                                        onChange={(e) => {
                                            setUsername(e.target.value);
                                        }} />
                                    <Form.Control.Feedback type="invalid">Necesitas un usuario</Form.Control.Feedback>
                                </FormGroup>
                                <FormGroup>
                                    <label>Contraseña</label>
                                    <FormControl value={password} required
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                        }}
                                        type="password" />
                                    <Form.Control.Feedback type="invalid">Necesitas una contraseña</Form.Control.Feedback>
                                </FormGroup>
                                <div className="mt-3">
                                    <Button type="submit">Registrarse</Button>
                                </div>
                                <div className="mt-3">
                                    <Button href={'http://127.0.0.1:5173'+LOGIN_URL}>Ya tengo una cuenta</Button>
                                </div>
                            </Form>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}
