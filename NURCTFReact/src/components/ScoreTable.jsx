import React, { useEffect } from 'react';
import { Table } from 'react-bootstrap';

const ScoreTable = ({ listaUsuarios }) => {
    
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Posición</th>
                    <th>Username</th>
                    <th>Puntos</th>
                </tr>
            </thead>
            <tbody>
                {listaUsuarios.map((user, index) => (
                    <tr key={user.username}>
                        <td>{index + 1}</td>
                        <td>{user.username}</td>
                        <td>{user.puntos}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default ScoreTable;