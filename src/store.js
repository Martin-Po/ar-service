import { configureStore } from '@reduxjs/toolkit'

import loginuserReducer from './reducers/loginuserReducer'
import productosReducer from './reducers/productosReducer'




const store = configureStore({
    reducer: {
        loggeduser: loginuserReducer,
        productos: productosReducer,



    },
})

export default store
