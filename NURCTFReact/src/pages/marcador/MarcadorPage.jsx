import React, { useEffect, useState } from 'react';
import ScoreTable from '../../components/ScoreTable';
import Menu from '../../components/Menu';
import { getListaUsuariosPorPuntos } from '../../services/UsuarioService';

const MarcadorPage = () => {
    const [listaUsuarios, setListaUsuarios] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchUsuarios();
    }, []);

    const fetchUsuarios = () => {
        getListaUsuariosPorPuntos(localStorage.getItem('token'))
            .then((data) => {
                setListaUsuarios(data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching usuarios:', error);
                setIsLoading(false);
            });
    };

    return (
        <>
            <Menu />
            <div style={{ maxWidth: '800px', margin: 'auto' }}>
                <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Tabla de Puntuaciones</h1>
                {isLoading ? (
                    <p style={{ textAlign: 'center' }}>Cargando usuarios...</p>
                ) : (
                    <ScoreTable listaUsuarios={listaUsuarios} />
                )}
            </div>
        </>
    );
};

export default MarcadorPage;
