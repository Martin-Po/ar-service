import axios from 'axios'
const baseUrl = process.env.NODE_ENV === 'production' 
? 'https://ar-service-api.vercel.app/api/subtipos' 
: '/api/subtipos'



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

const addTipo = async (id, tipo) => {
    
    const config = {
        headers: { Authorization: token },
    }

    const tipoID = {tipo}

    const response = await axios.put(`${baseUrl}/${id}/add-tipo`, tipoID, config)
    return response.data
}


const quitarTipo = async (id, tipo) => {
    
    const config = {
        headers: { Authorization: token },
    }

    const tipoID = {tipo}
    const response = await axios.put(`${baseUrl}/${id}/remove-tipo`, tipoID, config)
    return response.data
}

const remove = async (subtipo) => {
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.delete(`${baseUrl}/${subtipo}`, config)

    return response.data
}

export default {getAll, create, setToken, update, remove, quitarTipo, addTipo}