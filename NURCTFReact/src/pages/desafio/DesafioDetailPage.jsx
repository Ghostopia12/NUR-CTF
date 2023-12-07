import { Card, Container, Image } from "react-bootstrap";
import Menu from "../../components/Menu";
import { useState, useEffect } from "react";
import { getDesafio } from "../../services";
import { useNavigate, useParams } from "react-router-dom";
import { HOME_URL } from "../../navigation/CONSTANTS";
import { getAuthToken, validateLogin,  } from "../../utilities/TokenUtilities";

export default function DesafioDetailPage() {
    const navigate = useNavigate();

    const [nombre, setNombre] = useState('');
    const [tipos, setTipos] = useState([]);
    const [precio, setPrecio] = useState(0);
    const [foto, setFoto] = useState('');

    let { id } = useParams();

    useEffect(() => {
        const loginValid = validateLogin(navigate);
        if (!loginValid) {
            return;
        }
        
        //loadTiposGame()
        if(id){
            loadDesafio(id);
        }
    }, [])


    const loadDesafio = (id) => {
        getDesafio(getAuthToken(),id).then((data) => {
            console.log(data);
            debugger
            setNombre(data.nombre);
            setTipos(data.tipos);
            setPrecio(data.precio);
            setFoto(data.foto);
/*             getDesafioParticipants(getAuthToken(),data.id).then((data) => {
                setParticipantesDesafio(data);
            }); */
        });
    }

    return (
        <>
            <Menu />
            <Container>
                <Card className="mt-3">
                    <Card.Body>
                        <Card.Title>
                            {nombre}
                        </Card.Title>
                        <Image src={foto} alt={nombre}></Image>
                        <Card.Text>
                            {precio}
                        </Card.Text>
                        {tipos.map((tipo) => {
                            return (
                                <label key={tipo.id}>
                                {tipo.nombre}
                                </label>
                            )
                            })}
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}
