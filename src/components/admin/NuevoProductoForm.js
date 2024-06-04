import { Avatar, Box, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { NuevoProducto } from './NuevoProducto'
import { CaracteristicasForm } from './CaracteristicasForm';
import CheckIcon from '@mui/icons-material/Check';

const Steps = ({ selected, step, last, index }) => {
    return (
        <>
            <Box sx={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                <Avatar
                    sx={{
                        '@media (max-width:600px)': {
                            width: '1.85rem', height: '1.85rem', 

                        },
                        backgroundColor: selected < index  ? 'primary.dark' : selected === index
                            ? 'secondary.dark'
                            : 'status.ok',
                    }}
                >
                   <Box sx={{fontSize:'1.25rem',
                            '@media (max-width:600px)': {
                                fontSize: '0.65rem', // El texto se muestra en una sola línea
                            },}}>

                        {selected > index ?  <CheckIcon sx={{fontSize:'1.1.2rem'}}/> : index}
                   </Box>
                </Avatar>
                <Box>

                <Typography
                        sx={{
                            textAlign: 'center',
                            '@media (min-width:600px)': {
                                whiteSpace: 'nowrap', // El texto se muestra en una sola línea
                            },
                            '@media (max-width:600px)': {
                                fontSize: '0.85rem', // El texto se muestra en una sola línea
                            },
                        }}
                    >
                {step}
                </Typography>
                </Box>

            </Box>
            {!last && (
                <Box
                    sx={{
                        marginLeft: '2rem',
                        marginRight: '2rem',
                        width: '100%',
                        height: '0.2rem',
                        background: 'black',
                        
                            '@media (max-width:600px)': {
                        margin: '0',

                                height: '0.1rem',

                            },
                    }}
                />
            )}
        </>
    );
    
}

const NuevoProductoForm = () => {
    const [selectedStep, setSelectedStep] = useState(0)
    const [ProductoNuevo, setProductoNuevo] = useState({id: '6616c4209acac7cd24d10d57', name: '',
    descripcion: '',})

    console.log('se está renderizando devuelta');


const advanceStep = () => {
    console.log(selectedStep);
    setSelectedStep(prevStep => prevStep + 1)
    console.log(selectedStep);
    }

    const pasos = [
        'Crear Producto',
        'Agregar Características',
        'Agregar imágenes',
    ]

    return (
        <Box
            sx={{
                display: 'flex',
                width: '1280px',
                flexDirection: 'column',

                '@media (max-width: 1300px)': {
                    width: '992px',
                    display: 'flex',
                },
                '@media (max-width:1024px)': {
                    width: '100%',
                },
            }}
        >
            {selectedStep === 0 &&  <NuevoProducto advanceStep = {advanceStep}/>}
            {selectedStep === 1 &&  <CaracteristicasForm NuevoProducto = {ProductoNuevo} />}
            

            <Box sx={{ display: 'flex', alignItems: 'baseline', '@media (max-width:1024px)': {
                    marginLeft:'1rem',
                    marginRight:'1rem',

                }, }}>
                {pasos.map((paso, index) => {
                    return (
                        <Steps
                            selected={selectedStep + 1}
                            step={paso}
                            index={index + 1}
                            last={index === pasos.length - 1}
                        />
                    )
                })}
            </Box>
        </Box>
    )
}
export { NuevoProductoForm }
