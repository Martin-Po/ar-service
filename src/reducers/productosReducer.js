import { createSlice } from '@reduxjs/toolkit'
import productoService from '../services/productos'
import caracteristicasService from '../services/caracteristicasxproducto'


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
        addCaracteristica(state, action) {
            const { producto_id, newCaracteristicas } = action.payload
            console.log('en el dispatch');
            console.log(newCaracteristicas);

            return state.map((producto) => {
                if (producto.id === producto_id) {
                    return {
                        ...producto,
                        caracteristicas: [...producto.caracteristicas, ...newCaracteristicas],
                    }
                }
                return producto
            })
        },
        addPortada(state, action) {
            const { producto_id, newPortada } = action.payload
            return state.map((producto) => {
                if (producto._id === producto_id) {
                    return {
                        ...producto,
                        portada: newPortada.url,
                    }
                }
                return producto
            })
        },

        addImagenes(state, action) {
            const { producto_id, newImagenes } = action.payload
            return state.map((producto) => {
                if (producto._id === producto_id) {
                    return {
                        ...producto,
                        imagenes: newImagenes.url,
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
    addCaracteristica,
    addPortada,
    addImagenes
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
            console.log('el producto se creo correctamente');
            dispatch(appendProducto(newProductoPopulated))
            return newProductoPopulated
        } catch (error) {
            console.error('Error creating producto:', error)
            throw error
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

export const createCaracteristicas = (producto_id, caracteristica) => {
    return async (dispatch) => {
        try {
            const newCaracteristicas = await caracteristicasService.create({
                producto_id,
                caracteristica,
            })
            dispatch(addCaracteristica({ producto_id, newCaracteristicas}))
        } catch (error) {
            // Handle error
            console.error('Error al crear caracteristica:', error)
            throw error
        }
    }
}

export const CreatePortada = (producto_id, portada) => {
    return async (dispatch) => {
        try {

            const newPortada = await productoService.addPortada(
                producto_id,
                portada)                
                console.log('CreatePortada');
            dispatch(addPortada({ producto_id, newPortada}))
        } catch (error) {
            // Handle error
            console.error('Error al crear portada:', error)
            throw error
        }
    }
}

export const CreateImagenes = (producto_id, imagenes) => {
    return async (dispatch) => {
        try {

            const newImagenes = await productoService.addImagenes(
                producto_id,
                imagenes)
                console.log('CreateImagenes');
            dispatch(addImagenes({ producto_id, newImagenes}))
        } catch (error) {
            // Handle error
            console.error('Error al crear portada:', error)
            throw error
        }
    }
}

export default productoSlice.reducer
