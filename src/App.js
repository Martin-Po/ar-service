import { CssBaseline } from '@mui/material'
import './App.css'
import AppBar from './components/AppBar'
import Footer from './components/Footer'
import { Hero_2 } from './components/Hero_2'
import { Banner } from './components/Banner'
import { Marcas } from './components/Marcas'
import { Testimonios } from './components/Testimonios'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Nosotros } from './components/Nosotros'
import { FAQs } from './components/FAQs'
import { Contactenos } from './components/Contactenos'
import { EncontranosMaps } from './components/EncontranosMaps'
import LoginForm from './components/LoginForm'
import { Adminhome } from './components/admin/AdminHome'
import { useDispatch, useSelector } from 'react-redux'
import { initializeLoggedUser } from './reducers/loginuserReducer'
import { useEffect, useState } from 'react'
import productosService from './services/productos'
import combosService from './services/combos'
import caracteristicasService from './services/caracteristicas'
import monedasService from './services/monedas'
import tiposService from './services/tipos'
import subtiposService from './services/subtipos'
import loginService from './services/login'
import caracteristicasxproducto from './services/caracteristicasxproducto'
import { initializeProductos } from './reducers/productosReducer'
import { PrivateRoutes } from './components/PrivateRoutes'
import { NuevoProductoForm } from './components/admin/NuevoProductoForm'
import { initializeCombos } from './reducers/combosReducer'
import { Tienda } from './components/tienda/Tienda'
import { Producto } from './components/tienda/Producto'
import { useLayoutEffect } from 'react'
import { Combo } from './components/tienda/Combo'

function App() {
    const dispatch = useDispatch()

    const loggeduser = useSelector((state) => state.loggeduser)

    const location = useLocation()

    useLayoutEffect(() => {
        document.documentElement.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant',
        })
    }, [location.pathname])

    const [loaded, setloaded] = useState(false)

    useEffect(() => {
        dispatch(initializeLoggedUser())
        dispatch(initializeProductos()).then(() => {
            setloaded(true)
        })
        dispatch(initializeCombos()).then(() => {
            setloaded(true)
        })
    }, [dispatch])

    useEffect(() => {
        if (!loggeduser.user) {
            combosService.setToken(null)
            productosService.setToken(null)
            caracteristicasService.setToken(null)
            loginService.setToken(null)
            caracteristicasxproducto.setToken(null)
            monedasService.setToken(null)
            tiposService.setToken(null)
            subtiposService.setToken(null)
        } else {
            productosService.setToken(loggeduser.user.token)
            combosService.setToken(loggeduser.user.token)
            caracteristicasService.setToken(loggeduser.user.token)
            loginService.setToken(loggeduser.user.token)
            caracteristicasxproducto.setToken(loggeduser.user.token)
            monedasService.setToken(loggeduser.user.token)
            tiposService.setToken(loggeduser.user.token)
            subtiposService.setToken(loggeduser.user.token)
        }
    }, [loggeduser])

    const Home = () => {
        return (
            <>
                <Hero_2 />
                <Banner />
                <Marcas />
                <Testimonios />
                <EncontranosMaps />
            </>
        )
    }

    const ContactenosSite = () => {
        return (
            <>
                <Contactenos />
                <EncontranosMaps />
            </>
        )
    }

    return (
        <div
            style={{
                backgroundColor: '#B1DBED',
                minHeight: '100vh',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <CssBaseline />
            <AppBar />
            <Routes>
                <Route path="/tienda" element={<Tienda />} />
                <Route path="/tienda/combo/:id" element={<Combo />} />
                <Route path="/tienda/:id" element={<Producto />} />

                <Route path="/nosotros" element={<Nosotros />} />
                <Route path="/faqs" element={<FAQs />} />
                <Route path="/contactenos" element={<ContactenosSite />} />
                <Route path="/login" element={<LoginForm />} />
                <Route element={<PrivateRoutes />}>
                    <Route path="/admin/home" element={<Adminhome />} />
                    <Route
                        path="/admin/nuevo-producto"
                        element={<NuevoProductoForm />}
                    />
                </Route>
                <Route path="/*" element={<Home />} />
            </Routes>

            <Footer />
        </div>
    )
}

export default App
