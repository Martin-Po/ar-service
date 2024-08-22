import { Button, Grid, Typography } from '@mui/material'
import BannerImage from '../assets/banner_image.png'
import React from 'react'

const Banner = () => {
    return (
        <div style={{ width: '100vw', maxWidth: '100%' }}>

            <Grid
                container
                sx={{
                    margin: '50px auto 0 auto',
                    width: '1280px',
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
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
                    lg={6}
                    sx={{
                        display: { xs: 'none', lg: 'flex' },

                        flexDirection: 'column',
                        alignItems: 'center',
                        marginBottom: '20px',

                        '@media (max-width:500px)': {
                            marginBottom: '70px',
                        },
                    }}
                >
                    <img
                        style={{
                            width: '100%',
                            maxWidth: '471px',
                            maxHeight: '471px',
                        }}
                        loading="lazy"
                        src={BannerImage}
                        alt="Testimonial"
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                    lg={6}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginBottom: '20px',
                    }}
                >
                    <Typography
                        sx={{
                            fontWeight: 'bold',
                            fontSize: '3rem',
                            '@media (max-width:600px)': { fontSize: '2rem' },
                        }}
                    >
                        Encuentra tu Sonido Único
                    </Typography>
                    <Typography
                        sx={{
                            marginTop: '1rem',
                            fontWeight: '300',
                            fontSize: '1.5rem',
                            '@media (max-width:600px)': {
                                fontSize: '1.25rem',
                            },
                        }}
                    >
                        Explora nuestra selección única de equipos de audio
                        vintage y encuentra la pieza perfecta para tu colección.
                        Ya sea que estés buscando comprar, vender o canjear,
                        nuestra plataforma te ofrece una experiencia intuitiva y
                        emocionante.
                    </Typography>
                    <Button
                        sx={{
                            marginTop: '1.5rem',
                            paddingTop: '0.75rem',
                            paddingBottom: '0.75rem',
                            paddingLeft: '2rem',
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
                        <Typography
                            sx={{
                                color: 'secondary.contrastText',
                                fontWeight: 'bold',
                                '@media (max-width:600px)': {
                                    fontSize: '0.85rem',
                                },
                            }}
                        >
                            Mirá nuestros equipos
                        </Typography>
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}
export { Banner }
