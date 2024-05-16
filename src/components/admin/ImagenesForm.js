import { Box, Button, Typography } from '@mui/material'

import { createProducto } from '../../reducers/productosReducer'

const NuevoProducto = () => {
   

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
            
            <input type="file" name="image" onChange={handleImageChange} />

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
                    CREAR PRODRUDCTO
                </Button>
            </Box>
        </div>
    )
}

export { NuevoProducto }
