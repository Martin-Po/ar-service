import { Avatar, Box, Grid, Paper, Typography } from '@mui/material'
import ClientesImage from '../assets/testimonios/testimony_images.png'
import ClientAvatar1 from '../assets/testimonios/testimonial_avatar_1.png'
import ClientAvatar2 from '../assets/testimonios/testimonial_avatar_2.png'
import ClientAvatar3 from '../assets/testimonios/testimonial_avatar_3.png'
import React from 'react'

const AvatarImgs = {
    ClientAvatar1,
    ClientAvatar2,
    ClientAvatar3,
}

const testimonios = [
    {
        id: 1,
        avatar: 'ClientAvatar1',
        text: 'Quedé impresionado con la calidad del servicio. Desde la reparación de mi antiguo amplificador hasta la orientación sobre la compra de un reproductor de casetes vintage, demostraron un conocimiento profundo y un genuino interés en ayudarme.',
        name: 'Marta Gómez',
    },
    {
        id: 2,
        avatar: 'ClientAvatar2',
        text: 'Estaba a punto de desechar mi antiguo receptor de radio vintage, pero decidí darle una última oportunidad con su servicio de reparación. ¡Qué sorpresa! Ahora funciona mejor que nunca. ¡Gracias por salvar un pedazo de historia musical!',
        name: 'Carlos Pérez',
    },
    {
        id: 3,
        avatar: 'ClientAvatar3',
        text: 'Quedé asombrado por la calidad del trabajo en la reparación de mi viejo amplificador. El sonido ahora es nítido y potente, como en sus días de gloria. ¡Gracias por resucitar mi sistema de audio favorito!.',
        name: 'Lucía Rodríguez',
    },
]

const Testimonios = () => {
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
                    height: '100%',

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
                    sx={{
                        maxWidth: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography
                        sx={{
                            fontWeight: 'bold',
                            fontSize: '2rem',
                            margin: '2rem',
                            '@media (max-width:600px)': {
                                marginLeft: '0px',
                                marginRight: '0px',
                                fontSize: '1.25rem',
                            },
                        }}
                    >
                        ¿QUE OPINAN NUESTROS CLIENTES?
                    </Typography>
                </Grid>

                <Grid
                    container
                    direction="column"
                    spacing={6}
                    sx={{
                        alignItems: 'stretch',
                        display: 'flex',
                        flexDirection: 'row',
                        marginBottom: '20px',

                        '@media (max-width:800px)': {
                            flexDirection: 'column',
                        },
                    }}
                >
                    {testimonios.map((testimonio) => {
                        const AvatarImg = AvatarImgs[testimonio.avatar]
                        return (
                            <Grid
                                key={testimonio.id}
                                item
                                xs={4}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    '@media (max-width:500px)': {
                                        marginBottom: '40px',
                                    },
                                }}
                            >
                                <Paper
                                    sx={{
                                        
                                        padding: '1rem',
                                        margin: '10px',
                                        borderRadius: '30px',
                                        height: '100%',
                                        display:'flex',
                                        
                                        '@media (max-width:500px)': {
                                            width: '100%',
                                        },
                                    }}
                                >
                                    <Grid
                                        container
                                        sx={{
                                            
                                            display:'flex',
                                            alignItems: 'center',
                                            flexDirection: 'column',
                                            flexWrap:'nowrap',
                                        }}
                                    >
                                        <Grid
                                            item
                                            xs={3}
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',

                                                '@media (max-width:500px)': {
                                                    alignSelf: 'center',
                                                    marginTop: '-64px',
                                                },
                                            }}
                                        >
                                            <Avatar
                                                sx={{
                                                    backgroundColor:
                                                        'primary.main',
                                                    width: '5.5rem',
                                                    height: '5.5rem',
                                                }}
                                            >
                                                <img
                                                    style={{
                                                        width: '5.5rem',
                                                        height: '5.5rem',
                                                    }}
                                                    src={AvatarImg}
                                                    alt="Icono Carpintería"
                                                />
                                            </Avatar>
                                        </Grid>
                                        <Grid
                                            item xs="auto"
                                            style={{ flexGrow: 1 }}
                                            sx={{
                                                display: 'flex',
                                                justifyContent:'space-between',
                                                flexDirection: 'column',                                               
                                                
                                                '@media (max-width:500px)': {
                                                    maxWidth: '100%',
                                                },
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                   
                                                }}
                                            >
                                                {testimonio.text}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    fontWeight: 'bold',
                                                    placeSelf: 'flex-end',
                                                }}
                                            >
                                                {testimonio.name}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Grid>
        </div>
    )
}
export { Testimonios }
