import axios from "axios"
import { BASE_URL } from "./CONSTANTS"

export const getListaPista = (token) => {
    return new Promise((resolve, reject) => {
        axios.get(BASE_URL + "/administracion/pista/", {
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

export const getPista = (token, id) => {
    return new Promise((resolve, reject) => {
        axios.get(BASE_URL + "/administracion/pista/"+id+"/", {
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


export const delPista = (token, id) => {
    return new Promise((resolve, reject) => {
        axios.delete(BASE_URL + "/administracion/pista/"+id+"/", {
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

export const postSavePista = (token, pista) => {
    const formData = new FormData();

    formData.append("pista", pista.pista);
    formData.append("costo", pista.costo);
    formData.append("desafio_id", pista.desafio_id);

    console.log(formData);

    return new Promise((resolve, reject) => {
        axios.post(BASE_URL +  "/administracion/pista/",
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'JWT ' + token
                },
            })
            .then((response) => {
                console.log(response.data);
                resolve(response.data);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
}

export const putPista = (token, pista) => {
    return new Promise((resolve, reject) => {
        axios.put(BASE_URL + "/administracion/pista/"+pista.id+"/", pista, {
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