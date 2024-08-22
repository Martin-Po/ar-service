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
        editarEstado(state, action) {
            const { productoId, estado } = action.payload

            return state.map((producto) => {
                if (producto.id === productoId) {
                    return {
                        ...producto,
                        estado_activo: estado,
                    }
                }
                return producto
            })
        },
        addCaracteristica(state, action) {
            const { producto_id, newCaracteristicas } = action.payload

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
        eraseCaracteristica(state, action) {
            const { producto_id, caracteristica_id } = action.payload

            return state.map((producto) => {
                if (producto.id === producto_id) {
                    return {
                        ...producto,
                        caracteristicas: producto.caracteristicas.filter(caracteristica => {
                            return caracteristica.id !== caracteristica_id
                        }),
                    }
                }
                return producto
            })
        },

        appendObservacion(state, action) {
            const { producto_id, newObservacion } = action.payload

            return state.map((producto) => {
                if (producto.id === producto_id) {
                    return {
                        ...producto,
                        observaciones: [...producto.observaciones, newObservacion],
                    }
                }
                return producto
            })
        },

        eraseObservacion(state, action) {
            const { producto_id, observacion_id } = action.payload

            return state.map((producto) => {
                if (producto.id === producto_id) {
                    return {
                        ...producto,
                        observaciones: producto.observaciones.filter(observacion => {
                            return observacion._id !== observacion_id
                        }),
                    }
                }
                return producto
            })
        },

        addPortada(state, action) {
            const { producto_id, newPortada } = action.payload
            return state.map((producto) => {
                if (producto.id === producto_id) {
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
                if (producto.id === producto_id) {
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
    editarEstado,
    addCaracteristica,
    eraseCaracteristica,
    appendObservacion,
    eraseObservacion,
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

export const updateEstado = (productoId, nuevoEstado) => {
    return async (dispatch) => {
        try {
            const newEstado = await productoService.updateEstado(productoId, {estado: nuevoEstado})
            dispatch(editarEstado({ productoId, estado: newEstado.estado_activo }))
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

export const DeleteCaracteristica = (caracteristica) => {
    return async (dispatch) => {
        
        const producto_id = caracteristica.producto
        const caracteristica_id = caracteristica.id
        
        try {
            await caracteristicasService.remove(caracteristica_id)
            dispatch(eraseCaracteristica({ producto_id, caracteristica_id}))
        } catch (error) {
            // Handle error
            console.error('Error al borrar caracteristica:', error)
            throw error
        }
    }
}

export const createObservacion = (producto_id, observacion) => {
    return async (dispatch) => {
        try {            
            const newObservacion = await productoService.appendObservacion({
                producto_id,
                observacion,
            })
      
            dispatch(appendObservacion({ producto_id, newObservacion}))
        } catch (error) {
            // Handle error
            console.error('Error al crear observacion:', error)
            throw error
        }
    }
}

export const DeleteObservacion = (observacion, producto_id) => {
    return async (dispatch) => {
        
        try {
            const observacion_id = observacion._id

            await productoService.removeObservacion(producto_id, observacion_id )
            dispatch(eraseObservacion({ observacion_id: observacion._id, producto_id}))
        } catch (error) {
            // Handle error
            console.error('Error al borrar caracteristica:', error)
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
            dispatch(addImagenes({ producto_id, newImagenes}))
        } catch (error) {
            // Handle error
            console.error('Error al crear portada:', error)
            throw error
        }
    }
}

export default productoSlice.reducer
