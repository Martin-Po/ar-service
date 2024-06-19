import { CssBaseline} from '@mui/material'
import './App.css'
import AppBar from './components/AppBar'
import Footer from './components/Footer'
import { Hero_2 } from './components/Hero_2'
import { Banner } from './components/Banner'
import { Marcas } from './components/Marcas'
import { Testimonios } from './components/Testimonios'
import { Route, Routes} from 'react-router-dom'
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
import caracteristicasService from './services/caracteristicas'
import loginService from './services/login'
import caracteristicasxproducto from './services/caracteristicasxproducto'
import { initializeProductos, setProductos } from './reducers/productosReducer'
import { PrivateRoutes } from './components/PrivateRoutes'
import { NuevoProductoForm } from './components/admin/NuevoProductoForm'



function App() {

    const dispatch = useDispatch()

    const loggeduser = useSelector((state) => state.loggeduser)
    const productos = useSelector((state) => state.productos)

   

    // const PrivateRoutes = () => {
    //     const [authorized, setAuthorized] = useState(true);
      
    //       // Función para ejecutar fetchUser solo una vez por renderización
    //       const fetchUserOnce = async () => {
    //         try {
    //             console.log('esta entrando');
    //           await loginService.checkUser();
    //           setAuthorized(true);
    //         } catch (error) {
    //           setAuthorized(false);
    //         }
    //       };
      
      
    //     console.log('final');
    //     console.log(authorized);
    //     console.log('final3');
      
      
    //     return authorized ? <Outlet /> : <Navigate to="/login" />;
    //   };


    const [loaded, setloaded] = useState(false)


    useEffect(() => {   
        dispatch(initializeLoggedUser())
    }, [dispatch])


    useEffect(() => {
        if (!loggeduser.user){
            productosService.setToken(null);
            caracteristicasService.setToken(null);
            loginService.setToken(null);
            caracteristicasxproducto.setToken(null);
            dispatch(setProductos(null))   
            console.log('borrando todo');
        }
        else{
            console.log('seteando el token' + loggeduser.user.token);
            productosService.setToken(loggeduser.user.token);
            caracteristicasService.setToken(loggeduser.user.token);
            loginService.setToken(loggeduser.user.token);
            caracteristicasxproducto.setToken(loggeduser.user.token);
            console.log('entro a la carga');
            dispatch(initializeProductos()).then(() => {
                setloaded(true);
            });
            console.log(productos);
            
        }
    }, [loggeduser])


    const Home = () => {
        return (
            <>
                <Hero_2 />
                <Banner />
                <Marcas />
                <Testimonios />
                <EncontranosMaps/>
            </>
        )
    }
  

    const ContactenosSite = () => {
        return (
            <>
                <Contactenos />
                <EncontranosMaps/>
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
                <Route path="/nosotros" element={<Nosotros/>}/>
                <Route path="/faqs" element={<FAQs/>}/>
                <Route path="/contactenos" element={<ContactenosSite/>}/>
                <Route path="/login" element={<LoginForm />}/>
                <Route element={<PrivateRoutes />}>
                    <Route path="/admin/home" element={<Adminhome/>}/>
                    <Route path="/admin/nuevo-producto" element={<NuevoProductoForm  />} />
                </Route>
                <Route path="/*" element={<Home />}/>
            </Routes>
            <Footer />
        </div>
    )
}

export default App
