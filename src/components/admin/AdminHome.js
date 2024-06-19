import { Box, Typography } from '@mui/material'
import { AdminProductos } from './AdminProductos'
import { useEffect, useState } from 'react'
import productosService from '../../services/productos'
import { AdminCaracteristicas } from './AdminCaracteristicas'

const Adminhome = () => {
    const [caracteristicasList, setCaracteristicasList] = useState([])

    useEffect(() => {
        productosService
            .getCaracteristicas()
            .then((response) => setCaracteristicasList(response))
    }, [])

    const agregarCaracteristica = (caracteristica) => {
        setCaracteristicasList(caracteristicasList.concat(caracteristica))
    }

    const eliminarCaracteristica = (caracteristica) => {
        
        const newCaracteristicasList = caracteristicasList.filter(element => { 
            return(element.id !== caracteristica.id)})
        setCaracteristicasList(newCaracteristicasList)
    }

 

    return (
        <div
            style={{
                width: '100vw',
                maxWidth: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Typography
                sx={{
                    margin: '1rem',

                    display: 'flex',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontSize: '2rem',

                    '@media (max-width:600px)': { fontSize: '1.25rem' },
                }}
            >
                SECCION ADMINISTRADOR
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    alignContent: 'center',
                    width: '1280px',
                    height: 'fit-content',
                    direction: 'column',
                    flexDirection: 'column',
                    marginBottom: '1.5rem',

                    '@media (max-width: 1300px)': {
                        width: '992px',
                        paddingLeft: '1.5rem',
                        paddingRight: '1.5rem',
                        display: 'flex',
                    },
                    '@media (max-width:1024px)': {
                        width: '100%',
                        alignItems: 'baseline',
                    },
                }}
            >
                <AdminProductos caracteristicasList={caracteristicasList} />

                <AdminCaracteristicas caracteristicasList={caracteristicasList} eliminarCaracteristica={eliminarCaracteristica} agregarCaracteristica={agregarCaracteristica} />
            </Box>
        </div>
    )
}

export { Adminhome }
