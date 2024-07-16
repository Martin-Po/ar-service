import { createSlice } from '@reduxjs/toolkit'
import comboService from '../services/combos'


const comboSlice = createSlice({
    name: 'combos',
    initialState: [],
    reducers: {
        eraseCombo(state, action) {
            const { id } = action.payload
            return state.filter((combo) => combo.id !== id)
        },
        appendCombo(state, action) {
            state.push(action.payload)
        },
        setCombos(state, action) {
            return action.payload
        },

        changeCombo(state, action) {
            const { comboId, NewName } = action.payload

            return state.map((combo) => {
                if (combo.id === comboId) {
                    return {
                        ...combo,
                        name: NewName,
                    }
                }
                return combo
            })
        },       
    },
})

export const {
    appendCombo,
    setCombos,
    eraseCombo,
    changeCombo,
} = comboSlice.actions

export const initializeCombos = () => {
    return async (dispatch) => {
        const combos = await comboService.getAll()
        dispatch(setCombos(combos))
        return Promise.resolve()
    }
}

export const createCombo = (comboObject) => {
    return async (dispatch) => {
        try {

            const newComboPopulated = await comboService.create(comboObject)
            console.log('el combo se creo correctamente');
            dispatch(appendCombo(newComboPopulated))
            return newComboPopulated
        } catch (error) {
            console.error('Error creating combo:', error)
            throw error
        }
    }
}

export const updateCombo = (comboId, NewName) => {
    return async (dispatch) => {
        try {
            await comboService.update(comboId, {name: NewName})
            dispatch(changeCombo({ comboId, NewName }))
        } catch (error) {
            // Handle error
            console.error('Error deleting combo element:', error)
        }
    }
}


export const deleteComboById = (id) => {
    return async (dispatch) => {
        try {
            await comboService.remove(id)
            dispatch(eraseCombo({ id }))
        } catch (error) {
            // Handle error
            console.error('Error deleting combo:', error)
        }
    }
}


export default comboSlice.reducer
