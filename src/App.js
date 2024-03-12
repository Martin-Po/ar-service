import { Box, CssBaseline, Grid } from '@mui/material'
import './App.css'
import AppBar from './components/AppBar'
import Footer from './components/Footer'
import { Hero_2 } from './components/Hero_2'
import { Banner } from './components/Banner'
import { Marcas } from './components/Marcas'
import { Testimonios } from './components/Testimonios'
import { Encontranos } from './components/Encontranos'
import { Route, Routes } from 'react-router-dom'
import { Nosotros } from './components/Nosotros'
import { FAQs } from './components/FAQs'

function App() {
    const Home = () => {
        return (
            <>
                <Hero_2 />
                <Banner />
                <Marcas />
                <Testimonios />
                <Encontranos />
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
                <Route path="/nosotros" element={<Nosotros />} />
                <Route path="/faqs" element={<FAQs />} />
                <Route path="/*" element={<Home />} />
            </Routes>
            <Footer />
        </div>
    )
}

export default App
