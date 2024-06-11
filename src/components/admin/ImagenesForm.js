import { Box, Button, Typography } from '@mui/material'

import { AddPortada} from '../../reducers/productosReducer'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

const ImagenesForm = ({NuevoProducto}) => {
    const [portada, setPortada] = useState(null)
    const [name, setName] = useState('')
    const [status, setStatus] = useState('')

const dispatch = useDispatch()


    const handleSubmit = async (event) => {
        setStatus('') // Reset status
        event.preventDefault()
        const formData = new FormData()
        formData.append('avatar', portada)
        formData.append('name', name)
    }

    const AgregarImagenes = async (event) => {
        try {
                await dispatch(AddPortada(NuevoProducto.id, portada))
            } catch (exception) {
                console.log('dio error')
            }
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
                IMÁGENES
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
                    background: 'white',
                    padding: '0.5rem',

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


            <Box sx={{ display: 'flex', flex: '1' }}>
                    <input
                        type="file"
                        multiple="multiple"
                        onChange={(e) => setPortada(e.target.files)}
                    />
                    <input
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                   
            </Box>
            </Box>
            <Box sx={{ display: 'flex', flex: '1' }}>
                <Button
                    onClick={AgregarImagenes}
                    sx={{
                        paddingBottom: '0.75rem',
                        marginLeft: '2rem',
                        paddingLeft: '2rem',
                        marginBottom: '2rem',

                        paddingRight: '2rem',
                        borderRadius: '35px',
                        fontSize: '1.125rem',
                        backgroundColor: 'primary.main',
                        '@media (max-width:600px)': {
                            paddingLeft: '1rem',
                            paddingRight: '1rem',
                        },
                    }}
                    variant="contained"
                >
                    {' '}
                    CREAR PRODRUDCTO
                </Button>
            </Box>
        </div>
    )
}

export { ImagenesForm }
