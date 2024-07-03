import axios from 'axios'
const baseUrl = process.env.NODE_ENV === 'production' 
? 'https://ar-service-api.vercel.app/api/tipos' 
: '/api/tipos'



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

const addSubtipo = async (id, subtipo) => {
    
    const config = {
        headers: { Authorization: token },
    }

    const subtipoID = {subtipo}

    const response = await axios.put(`${baseUrl}/${id}/add-subtipo`, subtipoID, config)
    return response.data
}


const quitarSubtipo = async (id, subtipo) => {
    
    const config = {
        headers: { Authorization: token },
    }

    const subtipoID = {subtipo}
    const response = await axios.put(`${baseUrl}/${id}/remove-subtipo`, subtipoID, config)
    return response.data
}

const remove = async (tipo) => {
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.delete(`${baseUrl}/${tipo}`, config)

    return response.data
}

export default {getAll, create, setToken, update, remove, quitarSubtipo, addSubtipo}