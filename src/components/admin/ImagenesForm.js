import { Box, Button, Divider, Typography } from '@mui/material'

import { CreatePortada, CreateImagenes } from '../../reducers/productosReducer'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import AddImage from '../../assets/add_image.png'
import { useNavigate } from 'react-router-dom'


const ImagenesForm = ({ NuevoProducto }) => {
    const [portada, setPortada] = useState(null)
    const [imagenes, setImagenes] = useState(null)
    const [status, setStatus] = useState(true)
    const [portadapreview, setPortadaPreview] = useState([AddImage])
    const [imagenesapreview, setImagenesPreview] = useState([AddImage])


    const dispatch = useDispatch()

    const navigate = useNavigate()


    const AgregarPortada = async (event) => {
        try {
            await dispatch(CreatePortada(NuevoProducto.id, portada)).then(setStatus(false))
        } catch (exception) {
            console.log('dio error')
        }
    }

    const AgregarImagenes = async (event) => {
        try {
            await dispatch(CreateImagenes(NuevoProducto.id, imagenes)).then(navigate('/admin/home')
        )
        } catch (exception) {
            console.log('dio error')
        }
    }


    const handlePortadaChange = (e) => {
        const files = e.target.files
        setPortada(files)

        if (files.length > 0) {
            const file = files[0]
            const reader = new FileReader()
            reader.onloadend = () => {
                setPortadaPreview(reader.result)
            }
            reader.readAsDataURL(file)
        } else {
            setPortadaPreview(AddImage)
        }
    }

    const handleImagenesChange = (e) => {
        
        const files = e.target.files;    
        setImagenes(files)
        const previews = [];
    
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const reader = new FileReader();
    
          reader.onloadend = () => {
            previews.push(reader.result);
            if (previews.length === files.length) {
              setImagenesPreview(previews);
            }
          };
          reader.readAsDataURL(file);
        }
    
        if (files.length === 0) {
          setImagenesPreview([AddImage]);
        }
      };
    

    const triggerPortadaInput = () => {
        document.getElementById('portadaInput').click()
    }

    const triggerImagenesInput = () => {
        document.getElementById('imagenesInput').click()
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
                    flexDirection: 'row',
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
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        width: '50%',
                        flexDirection: 'column',
                        alignItems: 'center',
                        '@media (max-width:1024px)': {},
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
                        Elegí la imagen de portada
                    </Typography>
                    <Box
                        sx={{
                            justifyContent: 'center',
                            alignContent: 'center',
                            margin: '1rem',
                        }}
                    >
                        <img
                            style={{
                                width: '100%',
                                maxWidth: '250px',
                                maxHeight: '250px',
                            }}
                            onClick={triggerPortadaInput}
                            src={portadapreview}
                            alt="Hero"
                        />
                        <input
                            disabled = {!status}
                            id="portadaInput"
                            type="file"
                            accept="image/png, image/jpeg"
                            style={{ display: 'none' }}
                            onChange={handlePortadaChange}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', flex: '1' }}>
                        <Button
                            onClick={AgregarPortada}
                            disabled = {!status}

                            sx={{
                                paddingBottom: '0.75rem',
                                marginLeft: '2rem',
                                paddingLeft: '2rem',
                                marginBottom: '2rem',

                                paddingRight: '2rem',
                                borderRadius: '35px',
                                fontSize: '1.125rem',
                                width:'250px',
                                height:'50px',
                                backgroundColor: 'primary.main',
                                alignSelf:'flex-end',

                                '@media (max-width:600px)': {
                                    paddingLeft: '1rem',
                                    paddingRight: '1rem',
                                },
                            }}
                            variant="contained"
                        >
                            {' '}
                            AGREGAR IMAGEN
                        </Button>
                    </Box>
                </Box>
                <Divider
                    sx={{ margin: '0.45rem' }}
                    orientation="vertical"
                    variant="middle"
                    flexItem                    
                />
                <Box
                
                    sx={{
                        
                        display: 'flex',
                        justifyContent: 'center',
                        width: '50%',
                        flexDirection: 'column',
                        alignItems: 'center',
                        '@media (max-width:1024px)': {},
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
                        Elegí una o varias imágenes del producto
                    </Typography>
                    <Box
                        sx={{
                            justifyContent: 'center',
                            alignContent: 'center',
                            margin: '1rem',
                        }}
                    >
                        {imagenesapreview.map((imagen, index) => {
                            return(
                                <img key={index}
                                style={{                                    
                                    width: '128px',
                                    height: '128px',
                                    margin: '0.25rem'
                                }}
                                onClick={triggerImagenesInput}
                                src={imagen}
                                alt="Hero"
                            />
                            )
                        })}
                        
                        <input
                            id="imagenesInput"
                            type="file"
                            multiple
                            accept="image/png, image/jpeg"
                            style={{ display: 'none' }}
                            disabled = {status}

                            onChange={handleImagenesChange}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', flex: '1' }}>
                        <Button
                            onClick={AgregarImagenes}
                            disabled = {status}
                            sx={{
                                
                                paddingBottom: '0.75rem',
                                marginLeft: '2rem',
                                paddingLeft: '2rem',
                                marginBottom: '2rem',
                                width:'250px',
                                height:'50px',
                                alignSelf:'flex-end',

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
                            AGREGAR IMAGENES
                        </Button>
                    </Box>
                    </Box>
                    
            </Box>
        </div>
    )
}

export { ImagenesForm }
