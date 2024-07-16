import axios from 'axios'

const baseUrl = process.env.NODE_ENV === 'production' 
? 'https://ar-service-api.vercel.app/api/productos'
: '/api/productos'


let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const getAll = () => {
    const config = {
        headers: { Authorization: token },
    }
    const request = axios.get(`${baseUrl}`, config)
    return request.then(response => response.data)
}

const getMarcas = () => {
    const config = {
        headers: { Authorization: token },
    }
    const request = axios.get(`${baseUrl}/marcas`, config)
    return request.then(response => response.data)
}

const getMonedas = () => {
    const config = {
        headers: { Authorization: token },
    }
    const request = axios.get(`${baseUrl}/monedas`, config)
    return request.then(response => response.data)
}

const getOrigenes = () => {
    const config = {
        headers: { Authorization: token },
    }
    const request = axios.get(`${baseUrl}/origenes`, config)
    return request.then(response => response.data)
}

const getTipos = () => {
    const config = {
        headers: { Authorization: token },
    }
    const request = axios.get(`${baseUrl}/tipos`, config)
    return request.then(response => response.data)
}

const getSubtipos = () => {
    const config = {
        headers: { Authorization: token },
    }
    const request = axios.get(`${baseUrl}/subtipos`, config)
    return request.then(response => response.data)
}

const getCaracteristicas = () => {
    const config = {
        headers: { Authorization: token },
    }
    const request = axios.get(`${baseUrl}/caracteristicas`, config)
    return request.then(response => response.data)
}

const create = async newObject => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

const update = async (id, newObject) => {
    
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.put(`${baseUrl}/${id}`, newObject, config)
    return response.data
}


const updateEstado = async (id, newObject) => {
    
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.put(`${baseUrl}/${id}/change-state`, newObject, config)
    return response.data
}

const addPortada = async (producto_id, portada) => {
    const formData = new FormData();
    for (let i = 0; i < portada.length; i++) {
    formData.append('portada', portada[i]);
}

    const config = {
        headers: {
            Authorization: `Bearer ${token}`, // Ensure you have the correct token
        },
    };

    console.log(formData);

    const response = await axios.put(`${baseUrl}/${producto_id}/change-portada`, formData, config);
    return response.data;
}

const addImagenes = async (producto_id, imagenes) => {
    const formData = new FormData();
    for (let i = 0; i < imagenes.length; i++) {
    formData.append('imagenes', imagenes[i]);
}

    const config = {
        headers: {
            Authorization: `Bearer ${token}`, // Ensure you have the correct token
        },
    };

    console.log(formData);

    const response = await axios.put(`${baseUrl}/${producto_id}/change-imagenes`, formData, config);
    return response.data;
}

const appendObservacion = async ({producto_id, observacion}) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`, // Ensure you have the correct token
        },
    };

    console.log('en el servicio' + observacion);

    const newObservacion = {observacion}

    const response = await axios.put(`${baseUrl}/${producto_id}/append-observacion`, newObservacion, config);
    return response.data;
}

const removeObservacion = async (producto_id, observacion_id) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`, // Ensure you have the correct token
        },
    };

    const observacion = {observacion_id}

    const response = await axios.put(`${baseUrl}/${producto_id}/delete-observacion`, observacion, config);
    return response.data;
}

const remove = async (producto) => {
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.delete(`${baseUrl}/${producto}`, config)

    return response.data
}

export default {getAll, create, setToken, update, remove, getMarcas, getOrigenes, getMonedas, getTipos, getSubtipos, getCaracteristicas, addPortada, addImagenes, appendObservacion, removeObservacion, updateEstado}