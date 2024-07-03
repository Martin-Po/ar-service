import { Box, Typography } from '@mui/material'
import { AdminProductos } from './AdminProductos'
import { useEffect, useState } from 'react'
import productosService from '../../services/productos'
import { AdminCaracteristicas } from './AdminCaracteristicas'
import { AdminMonedas } from './AdminMonedas'
import { AdminTipos } from './AdminTipos'

const Adminhome = () => {
    const [caracteristicasList, setCaracteristicasList] = useState([])
    const [monedasList, setMonedasList] = useState([])
    const [tiposList, setTiposList] = useState([])
    const [subtiposList, setSubtiposList] = useState([])



    useEffect(() => {
        productosService
            .getCaracteristicas()
            .then((response) => setCaracteristicasList(response))

        productosService
            .getMonedas()
            .then((response) => setMonedasList(response))

        productosService
            .getTipos()
            .then((response) => setTiposList(response))

        productosService
            .getSubtipos()
            .then((response) => setSubtiposList(response))
    }, [])

    const agregarCaracteristica = (caracteristica) => {
        setCaracteristicasList(caracteristicasList.concat(caracteristica))
    }

    const eliminarCaracteristica = (caracteristica) => {        
        const newCaracteristicasList = caracteristicasList.filter(element => { 
            return(element.id !== caracteristica.id)})
        setCaracteristicasList(newCaracteristicasList)
    }

    const agregarMoneda = (moneda) => {
        setMonedasList(monedasList.concat(moneda))
    }

    const eliminarMoneda = (moneda) => {        
        const newMonedaList = monedasList.filter(element => { 
            return(element.id !== moneda.id)})
            setMonedasList(newMonedaList)
    }

    const agregarTipo = (tipo) => {
        setTiposList(tiposList.concat(tipo))
    }

    const eliminarTipo = (tipo) => {        
        const newTipoList = tiposList.filter(element => { 
            return(element.id !== tipo.id)})
            setTiposList(newTipoList)
    }

    const agregarSubtipo = (subtipo) => {
        setSubtiposList(subtiposList.concat(subtipo))
    }

    const vincularTipo = (subtipo, tipo ) => {

        console.log(subtipo);
        console.log(tipo);
        const newSubtipoList = subtiposList.map(element => {
            if (element.id === subtipo.id) {
                return {
                    ...element,
                    tipos: element.tipos.concat(tipo.id)
                }
            }
            return element
        })


        const newTipoList = tiposList.map(element => {
            if (element.id === tipo.id) {
                return {
                    ...element,
                    subtipos: element.subtipos.concat(subtipo.id)
                ,
                }
            }
            return element
        })

        console.log(newTipoList);


        setSubtiposList(newSubtipoList)
        setTiposList(newTipoList)
    }
    

    const vincularSubtipo = (tipo, subtipo) => {

        const newSubtipoList = subtiposList.map(element => {
            if (element.id === subtipo.id) {
                return {
                    ...element,
                    tipos: element.tipos.concat(tipo.id)
                }
            }
            return element
        })


        const newTipoList = tiposList.map(element => {
            if (element.id === tipo.id) {
                return {
                    ...element,
                    subtipos: element.subtipos.concat(subtipo.id)
                ,
                }
            }
            return element
        })

        console.log(newTipoList);


        setSubtiposList(newSubtipoList)
        setTiposList(newTipoList)
    }
    

    const quitarTipo = (subtipo, tipo) => {
        const newSubtipoList = subtiposList.map(element => {
            if (element.id === subtipo.id) {
                return {
                    ...element,
                    tipos: element.tipos.filter(t => { 
                        return(t !== tipo.id)})
                }
            }
            return element
        })

        const newTipoList = tiposList.map(element => {
                if (element.id === tipo.id) {
                    return {
                        ...element,
                        subtipos: element.subtipos.filter(element => { 
                            return(element.id !== subtipo.id)})
                    ,
                    }
                }
                return element
            })

        setSubtiposList(newSubtipoList)
        setTiposList(newTipoList)
    }

    const quitarSubtipo = (tipo, subtipo) => {
     
        console.log(tipo);
        console.log(subtipo);

        const newTipoList = tiposList.map(element => {
                if (element.id === tipo.id) {
                    return {
                        ...element,
                        subtipos: element.subtipos.filter(element => { 
                            return(element !== subtipo.id)})
                    ,
                    }
                }
                return element
            })

            console.log(tiposList);
            console.log(newTipoList);

        const newSubtipoList = subtiposList.map(element => {
                if (element.id === subtipo.id) {
                    return {
                        ...element,
                        tipos: element.tipos.filter(t => { 
                            return(t !== tipo.id)})
                    }
                }
                return element
            })

        setSubtiposList(newSubtipoList)
        setTiposList(newTipoList)
    }

    const eliminarSubtipo = (subtipo) => {        
        const newSubtipoList = subtiposList.filter(element => { 
            return(element.id !== subtipo.id)})
            setSubtiposList(newSubtipoList)
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

                {monedasList && <AdminMonedas monedasList={monedasList} eliminarMoneda={eliminarMoneda} agregarMoneda={agregarMoneda} />}

                <AdminTipos tiposList={tiposList} subtiposList={subtiposList} agregarTipo={agregarTipo} eliminarTipo={eliminarTipo} agregarSubtipo={agregarSubtipo} eliminarSubtipo={eliminarSubtipo} quitarTipo={quitarTipo} vincularTipo={vincularTipo} quitarSubtipo={quitarSubtipo} vincularSubtipo={vincularSubtipo}/>
            </Box>
        </div>
    )
}

export { Adminhome }
