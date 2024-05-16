import { Avatar, Box, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { NuevoProducto } from './NuevoProducto'

const Steps = ({ selected, step, last, index }) => {
    return (
        <>
            <Box sx={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                <Avatar
                    sx={{
                        '@media (max-width:600px)': {
                            width: '1.85rem', height: '1.85rem', 

                        },
                        backgroundColor: selected
                            ? 'secondary.dark'
                            : 'primary.dark',
                    }}
                >
                   <Box sx={{fontSize:'1.25rem',
                            '@media (max-width:600px)': {
                                fontSize: '0.65rem', // El texto se muestra en una sola línea
                            },}}>

                        {index}
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
            <NuevoProducto />

            <Box sx={{ display: 'flex', alignItems: 'baseline', '@media (max-width:1024px)': {
                    marginLeft:'1rem',
                    marginRight:'1rem',

                }, }}>
                {pasos.map((paso, index) => {
                    return (
                        <Steps
                            selected={selectedStep === index}
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
