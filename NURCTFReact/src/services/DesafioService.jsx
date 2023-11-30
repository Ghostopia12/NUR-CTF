import axios from "axios"
import { BASE_URL } from "./CONSTANTS"

export const getListaDesafios = (token) => {
    return new Promise((resolve, reject) => {
        axios.get(BASE_URL + "/administracion/desafio/", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `JWT ${token}`
            },
        })
            .then((response) => {
                console.log(response);
                resolve(response.data);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
}

export const getDesafio = (token, id) => {
    return new Promise((resolve, reject) => {
        axios.get(BASE_URL + "/administracion/desafio/"+id+"/", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `JWT ${token}`
            },
        })
            .then((response) => {
                console.log(response);
                resolve(response.data);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
}



export const delDesafio = (token, id) => {
    return new Promise((resolve, reject) => {
        axios.delete(BASE_URL + "/administracion/desafio/"+id+"/", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `JWT ${token}`
            },
        })
            .then((response) => {
                console.log(response);
                resolve(response.data);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
}

export const postSaveDesafio = (token, desafio) => {
    const formData = new FormData();

    formData.append("titulo", desafio.titulo);
    formData.append("descripcion", desafio.descripcion);
    formData.append("puntos", desafio.puntos);
    formData.append("respuesta", desafio.respuesta);
    formData.append("archivo", desafio.archivo);
    formData.append("tipo", desafio.tipo);


    console.log(formData);
    return new Promise((resolve, reject) => {
        axios.post(BASE_URL + "/administracion/desafio/", formData, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `JWT ${token}`
            },
        })
            .then((response) => {
                console.log(response);
                resolve(response.data);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
}

export const putDesafio = (token, desafio) => {
    return new Promise((resolve, reject) => {
        axios.put(BASE_URL + "/administracion/desafio/"+desafio.id+"/", desafio, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `JWT ${token}`
            },
        })
            .then((response) => {
                console.log(response);
                resolve(response.data);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
}