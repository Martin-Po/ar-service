import { configureStore } from '@reduxjs/toolkit'

import loginuserReducer from './reducers/loginuserReducer'
import productosReducer from './reducers/productosReducer'
import combosReducer from './reducers/combosReducer'




const store = configureStore({
    reducer: {
        loggeduser: loginuserReducer,
        productos: productosReducer,
        combos: combosReducer
    },
})

export default store
