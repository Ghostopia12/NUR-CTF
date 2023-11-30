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

export const getTiposXDesafio = (token, id) => {
    return new Promise((resolve, reject) => {
        axios.get(BASE_URL + "/administracion/desafio/tipos_x_desafio/"+id+"/", {
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

export const getDesafiosXTipo = (token, id) => {
    return new Promise((resolve, reject) => {
        axios.get(BASE_URL + "/administracion/desafio/desafios_x_tipo/"+id+"/", {
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

    formData.append("nombre", desafio.nombre);
    formData.append("tipos", desafio.tipos);
    formData.append("precio", desafio.precio);
    formData.append("foto", desafio.foto);
    formData.append("owner_id", desafio.owner_id);
    formData.append("tipos", desafio.tipos);


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

export const buscarXNombre = (token, name) => {
    return new Promise((resolve, reject) => {
        axios.post(BASE_URL + "/administracion/desafio/buscar_desafios_x_nombre/", name, {
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