import { createSlice } from '@reduxjs/toolkit'
import productoService from '../services/productos'

const productoSlice = createSlice({
    name: 'productos',
    initialState: [],
    reducers: {
        eraseProducto(state, action) {
            const { id } = action.payload
            return state.filter((producto) => producto.id !== id)
        },
        appendProducto(state, action) {
            state.push(action.payload)
        },
        setProductos(state, action) {
            return action.payload
        },

        changeProducto(state, action) {
            const { productoId, NewName } = action.payload

            return state.map((producto) => {
                if (producto.id === productoId) {
                    return {
                        ...producto,
                        name: NewName,
                    }
                }
                return producto
            })
        },
    },
})

export const {
    appendProducto,
    setProductos,
    eraseProducto,
    changeProducto,
} = productoSlice.actions

export const initializeProductos = () => {
    return async (dispatch) => {
        const productos = await productoService.getAll()
        dispatch(setProductos(productos))
        return Promise.resolve()
    }
}

export const createProducto = (productoObject) => {
    return async (dispatch) => {
        try {
            const subtipos = productoObject.subtipos.map(subtipo => subtipo.id)
            const newproductoObject = { ...productoObject, subtipos: subtipos }

            const newProductoPopulated = await productoService.create(newproductoObject)
            dispatch(appendProducto(newProductoPopulated))
        } catch (error) {
            console.error('Error creatin producto:', error)
        }
    }
}

export const updateProducto = (productoId, NewName) => {
    return async (dispatch) => {
        try {
            await productoService.update(productoId, {name: NewName})
            dispatch(changeProducto({ productoId, NewName }))
        } catch (error) {
            // Handle error
            console.error('Error deleting producto element:', error)
        }
    }
}


export const deleteProductoById = (id) => {
    return async (dispatch) => {
        try {
            await productoService.remove(id)
            dispatch(eraseProducto({ id }))
        } catch (error) {
            // Handle error
            console.error('Error deleting producto:', error)
        }
    }
}

export default productoSlice.reducer
