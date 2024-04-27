import axios from 'axios'
// const baseUrl = '/api/login'
const baseUrl = 'https://ar-service-api.vercel.app/api/login'


let token = null

const setToken = (newToken) => {
    token = `Bearer ${newToken}`
}

const login = async (credentials) => {
    const response = await axios.post(baseUrl, credentials)
    return response.data
}

const checkUser = async (credentials) => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    const user = JSON.parse(loggedUserJSON)
    console.log('en servicio')
    console.log(user)
    console.log(JSON.parse(loggedUserJSON))
    let token = ''
    if (user) {
        console.log('prueba asignar el token');
        token = user.token
    }
    try {
        console.log('intento asignar el header');
        const config = {
            headers: { Authorization: 'Bearer ' + token },
        }

        console.log('por hacer la request')
        const request = axios.post(`${baseUrl}/checkuser`, user, config)
        return request.then((response) => response.data)
    } catch (error) {
        console.log('aca dio el error')
        console.log(error)
    }
}

export default { login, setToken, checkUser }
