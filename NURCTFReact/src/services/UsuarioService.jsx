import axios from "axios"
import { BASE_URL } from "./CONSTANTS"

export const getListaUsuarios = (token) => {
    return new Promise((resolve, reject) => {
        axios.get(BASE_URL + "/administracion/user/", {
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

export const getUsuario = (token, id) => {
    return new Promise((resolve, reject) => {
        axios.get(BASE_URL + "/administracion/user/"+id+"/", {
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
