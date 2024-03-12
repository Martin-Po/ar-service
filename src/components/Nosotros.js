import { Box, Button, Grid, Typography } from '@mui/material'
import NosotrosImage from '../assets/nosotros_image.png'

const Nosotros = () => {
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
            <Box
                sx={{
                    display: 'flex',
                    alignContent: 'center',
                    width: '1280px',
                    height: 'fit-content',
                    direction: 'column',
                    flexDirection: 'column',

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
                <Typography
                    sx={{
                        margin: '1rem',

                        display: 'flex',
                        justifyContent: 'center',
                        width: '100%',
                        fontWeight: 'bold',
                        fontSize: '2rem',
                        '@media (max-width:600px)': { fontSize: '1.25rem' },
                    }}
                >
                    ¿QUIENES SOMOS?
                </Typography>
                <Box
                    sx={{ display: 'flex', minHeight: '425px', height: '50vh',
                     '@media (max-width:1024px)': {
                        flexDirection:'column'
                    }, }}
                >
                    <Box
                        sx={{
                            width: '40%',
                            '@media (max-width:1024px)': {
                                width: '100%',
                                alignItems: 'baseline',
                            },
                        }}
                    >
                        <Typography
                            sx={{
                                marginTop: '1rem',
                                fontWeight: '300',
                                fontSize: '1.25rem',
                                '@media (max-width:600px)': {
                                    fontSize: '1rem',
                                },
                            }}
                        >
                            AR Service se encuentra en la localidad de Palermo
                            atendiedo a sus clientes desde 1980. Somos Alfredo y
                            Rodolfo, juntos tenemos más de 40 años de
                            experiencia en el rubro y somos apacionados por los
                            tocadiscos. Fanatico de la Academia.
                        </Typography>
                    </Box>
                    <Box sx={{ flex: 1,
                      '@media (max-width:1024px)': {
                        flexDirection:'column',
                        maxWidth: '992px',
                        width:'100%',
                        paddingLeft: '1.5rem',
                        paddingRight: '1.5rem',
                        display: 'flex',
                        marginTop: '1.5rem',

                    }}}>
                        <img
                            style={{
                                width: '100%',
                            }}
                            src={NosotrosImage}
                            alt="nosotros"
                        />
                    </Box>
                </Box>
            </Box>
        </div>
    )
}

export { Nosotros }
