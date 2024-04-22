import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'

const loggedUserSlice = createSlice({
    name: 'loggeduser',
    initialState: { user: null, error: null },
    reducers: {
        eraseUser(state, action) {
            state.user = null
            state.error = null // clear any previous error
        },
        setUser(state, action) {
            state.user = action.payload
            state.error = null // clear any previous error
        },
        setError(state, action) {
            state.error = action.payload // set the error message
        },
    },
})

export const { setUser, eraseUser, setError } = loggedUserSlice.actions

export const initializeLoggedUser = () => {
    return async (dispatch) => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        console.log('buscando en memoria');
        console.log(loggedUserJSON);
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            dispatch(setUser(user))
        }
        return Promise.resolve()
    }
}

export const CheckUser = () => {
    return async (dispatch) => {
        console.log('haciendo el dispatch');
        try {
            console.log('probando check2');
            await loginService.checkUser()
            console.log('probando check4');

        } catch (error) {
            dispatch(
                setError({
                    Type: 'login',
                    ErrorMessage: 'Token expired',
                })
            )

            try {
                window.localStorage.removeItem('loggedUser')
                dispatch(eraseUser())
            } catch (error) {
                dispatch(
                    setError({
                        type: 'logout',
                        ErrorMessage: 'Error deleting user',
                    })
                ) // dispatch the error action
            }
        }
        return Promise.resolve()
    }
}

export const logIn = (credentials) => {
    return async (dispatch) => {
        try {
            const user = await loginService.login({
                username: credentials.username,
                password: credentials.password,
            })
            window.localStorage.setItem('loggedUser', JSON.stringify(user))
            dispatch(setUser(user))
        } catch (error) {
            dispatch(
                setError({
                    Type: 'login',
                    ErrorMessage: 'Usuario o clave incorrectos',
                })
            ) // dispatch the error action
        }
    }
}

export const logOut = () => {
    return async (dispatch) => {
        try {
            window.localStorage.removeItem('loggedUser')
            dispatch(eraseUser())
        } catch (error) {
            dispatch(
                setError({
                    type: 'logout',
                    ErrorMessage: 'Error deleting user',
                })
            ) // dispatch the error action
        }
    }
}

export default loggedUserSlice.reducer
