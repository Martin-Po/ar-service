import axios from 'axios'
const baseUrl = '/api/productos'
// const baseUrl = 'https://ar-service-api.vercel.app/api/productos'


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

const remove = async (producto) => {
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.delete(`${baseUrl}/${producto}`, config)

    return response.data
}

export default {getAll, create, setToken, update, remove, getMarcas, getOrigenes, getMonedas, getTipos, getSubtipos}