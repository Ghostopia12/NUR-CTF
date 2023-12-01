import axios from "axios"
import { BASE_URL } from "./CONSTANTS"

export const getListaDesafiosUsuariosResueltos = (token) => {
    return new Promise((resolve, reject) => {
        axios.get(BASE_URL + "/administracion/desafio-usuario/resueltos/", {
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
    formData.append("intentos", desafio.intentos);
    formData.append("puntos", desafio.puntos);
    formData.append("respuesta", desafio.respuesta);
    formData.append("archivo", desafio.archivo);
    console.log(desafio.archivo);
    formData.append("tipo_id", desafio.tipo_id);


    console.log(formData);
    return new Promise((resolve, reject) => {
        axios.post(BASE_URL + "/administracion/desafio/", formData, {
            headers: {
                //"Content-Type": "application/json",
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

export const postRespuestaDesafio = (token, obj) => {
    const formData = new FormData();

    formData.append("desafio_id", obj.desafio_id);
    formData.append("usuario_id", obj.usuario_id);
    formData.append("respuesta", obj.respuesta);


    console.log(formData);
    return new Promise((resolve, reject) => {
        axios.post(BASE_URL + "/administracion/desafio/respuesta/", formData, {
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