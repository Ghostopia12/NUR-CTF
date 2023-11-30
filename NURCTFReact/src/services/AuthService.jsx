import axios from "axios"
import { BASE_URL } from "./CONSTANTS"

export const postLogin = (username, password) => {
    return new Promise((resolve, reject) => {
        axios.post(BASE_URL + "/api/token/", {
            username,
            password,
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


export const curretUser = (token) => {
    return new Promise((resolve, reject) => {
        axios.get(BASE_URL + "/administracion/user/current_user/", {
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

export const postRegister = (username, password) => {
    return new Promise((resolve, reject) => {
        axios.post(BASE_URL + "/administracion/user/", {
            username,
            password,
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