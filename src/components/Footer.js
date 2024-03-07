import { Box, Grid, Typography } from '@mui/material'
import { RedSocial } from './Contactos'


const Navegacion = [
    {
        id: 1,
        text: 'Inicio',
    },
    {
        id: 2,
        text: 'Tienda',
    },
    {
        id: 3,
        text: 'Contacto',
    },
    {
        id: 4,
        text: 'Quienes somos',
    },
    {
        id: 5,
        text: 'Preguntas frecuentes',
    },
]

const Contacto = [
    {
        id: 1,
        url: 'https://www.facebook.com/arservicepalermo/?locale=es_LA',
        icon: 'FacebookIcon'
    },
    {
        id: 2,
        url: 'https://www.instagram.com/arservicepalermo/?hl=es',
        icon: 'InstagramIcon'
    }
]

function Footer() {
    return (
        <Box
            sx={{
                marginTop: 'auto',
                backgroundColor: 'primary.main',
                width: '100%',
            }}
        >
            <Grid
                container
                sx={{
                    margin: '25px auto 0 auto',
                    width: '1280px',
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    alignItems: 'flex-start',
                    paddingLeft: '1.5rem',
                    paddingRight: '1.5rem',

                    '@media (max-width: 1300px)': {
                        width: '992px',
                    },
                    '@media (max-width:1024px)': {
                        width: '100%',
                    },
                }}
            >
                <Grid
                    item
                    xs={12}
                    sm={4}
                    sx={{
                        
                        alignItems: 'center',
                    }}
                >
                    <Typography
                        sx={{
                            fontWeight: 'bold',
                            fontSize: '1rem',
                            '@media (max-width:600px)': {
                                fontSize: '0.85rem',
                            },
                        }}
                    >
                        Navegacion
                    </Typography>

                    {Navegacion.map((nav) => {
                        return (
                            <Typography
                                sx={{
                                    fontSize: '0.85rem',
                                }}
                            >
                                {nav.text}
                            </Typography>
                        )
                    })}
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={4}
                    sx={{
                        alignItems: 'center',
                    }}
                >
                    <Typography
                        sx={{
                            fontWeight: 'bold',
                            fontSize: '1rem',
                            '@media (max-width:600px)': {
                                marginTop: '0.85rem',
                            }
                        }}
                    >
                        Contactos
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: '0.85rem',
                        }}
                    >
                        011 - 4775-6044
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: '0.85rem',
                        }}
                    >
                        arservicepalermo@hotmail.com
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: '0.85rem',
                        }}
                    >
                        Paraguay 5101, CABA, Buenos Aires
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={4}
                    sx={{
                        alignItems: 'center',
                    }}
                >
                    <Typography
                        sx={{
                            fontWeight: 'bold',
                            fontSize: '1rem',
                            '@media (max-width:600px)': {
                                marginTop: '0.85rem',
                            }
                        }}
                    >
                        Redes sociales
                    </Typography>
                    <Box sx={{display:'flex', }}>

                        {Contacto.map(icono => {return (
                            <RedSocial contacto={icono} key={icono.id} />
                        )} )}
                    </Box>
                </Grid>
            </Grid>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    paddingTop: '1rem',
                    paddingBottom: '1rem',
                }}
            >
                <Typography
                    variant="h2"
                    fontSize="1rem"
                    fontWeight="500"
                    opacity="0.85"
                >
                    Hecho por Martin Ponce
                </Typography>
            </Box>
        </Box>
    )
}

export default Footer
