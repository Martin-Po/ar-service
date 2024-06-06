import { Box, Button, Typography } from '@mui/material'

import { createProducto } from '../../reducers/productosReducer'

const ImagenesForm = () => {
   

    const handleImageChange = (event) => {
   
    };

    const handleClick = async (event) => {
       
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
            <input type="file" name="image" onChange={handleImageChange} />

            </Box>
            <Box sx={{ display: 'flex', flex: '1' }}>
                <Button
                    onClick={handleClick}
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
                    AGREGAR IMAGENES
                </Button>
            </Box>

        </div>
    )
}

export { ImagenesForm }
