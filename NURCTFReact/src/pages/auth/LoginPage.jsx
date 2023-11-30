import { Alert, Button, Card, Container, Form, FormControl, FormGroup } from "react-bootstrap";
import Menu from "../../components/Menu";
import { useState } from "react";
import { postLogin, getUsuario  } from "../../services"; //, curretUser
import { useNavigate } from "react-router-dom";
import { HOME_URL, REGISTER_URL } from "../../navigation/CONSTANTS";
import jwt_decode from 'jwt-decode';


export default function LoginPage() {
    const navigate = useNavigate();

    const [validated, setValidated] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showAlertError, setShowAlertError] = useState(false)

    const onLoginSubmit = (e) => {
        const form = e.currentTarget;

        let isValid = form.checkValidity();

        e.preventDefault();
        e.stopPropagation();

        setValidated(true);
        
        if (!isValid) return;
        doLogin();
    }

    const doLogin = () => {
        setShowAlertError(false);
        postLogin(username, password)
            .then((data) => {
                localStorage.setItem("token", data.access);
                localStorage.setItem("refresh", data.refresh);
                const token = localStorage.getItem("token");
                const decode = jwt_decode(token);
                const user = decode.user_id;
                getUsuario(token, user).then((data) => {
                    console.log(data);
                    localStorage.setItem("is_superuser", data.is_superuser);
                    localStorage.setItem("user_id", data.id);
                });
                navigate(HOME_URL);
/*                 curretUser(data.access).then((user) => {
                    localStorage.setItem("user", user);
                    navigate(HOME_URL);
                }) */
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
                            Inicio de Sesión
                        </Card.Title>
                        <div>
                            {showAlertError && <Alert variant="danger">
                                Usuario o contraseña incorrectas
                            </Alert>}
                            <Form noValidate onSubmit={onLoginSubmit} validated={validated}>
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
                                    <Button type="submit">Iniciar Sesión</Button>
                                </div>
                                <div className="mt-3">
                                    <Button href={'http://127.0.0.1:5173'+REGISTER_URL}>Registrarse</Button>
                                </div>
                            </Form>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}
