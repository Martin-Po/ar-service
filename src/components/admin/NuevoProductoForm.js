import { Avatar, Box, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { NuevoProducto } from './NuevoProducto'
import { CaracteristicasForm } from './CaracteristicasForm';
import CheckIcon from '@mui/icons-material/Check';
import { ImagenesForm } from './ImagenesForm';
import { Steps } from '../reutilizables/Steps';




const NuevoProductoForm = () => {
    const [selectedStep, setSelectedStep] = useState(0)
    const [ProductoNuevo, setProductoNuevo] = useState({id: '', name: '',
    descripcion: '',})

    console.log('se está renderizando devuelta');

const changeProductoNuevo = (producto) => {
    setProductoNuevo({id: producto.id, name: producto.name})
        }    


const advanceStep = () => {
    setSelectedStep(prevStep => prevStep + 1)
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
            {selectedStep === 0 &&  <NuevoProducto advanceStep = {advanceStep} changeProductoNuevo = {changeProductoNuevo}/>}
            {selectedStep === 1 &&  <CaracteristicasForm advanceStep = {advanceStep} NuevoProducto = {ProductoNuevo} />}
            {selectedStep === 2 &&  <ImagenesForm NuevoProducto = {ProductoNuevo} />}
            

            <Box sx={{ display: 'flex', alignItems: 'baseline', '@media (max-width:1024px)': {
                    marginLeft:'1rem',
                    marginRight:'1rem',

                }, }}>
                {pasos.map((paso, index) => {
                    return (
                        <Steps
                            key={index}
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
