import { Box, Button, Divider, Grid, Typography } from '@mui/material'
import NosotrosImage from '../assets/nosotros_image.png'
import { RedSocial } from './Contactos'
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid'
import EmailIcon from '@mui/icons-material/Email'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'

const iconComponents = {
    PhoneAndroidIcon,
    EmailIcon,
    FacebookIcon,
    InstagramIcon,
}

const iconColors = {
    PhoneAndroidIcon: 'rgb(233 59 129)',
    EmailIcon: 'rgb(253 117 144)',
    FacebookIcon: 'rgb((8 102 255)',
    InstagramIcon: 'inherit',
}

const Horarios = [
    {
        id: 1,
        dia: 'Lunes',
        Horario: ['10:00 - 14:00', '16:00 - 20:00'],
    },
    {
        id: 2,
        dia: 'Martes',
        Horario: ['10:00 - 14:00', '16:00 - 20:00'],
    },
    {
        id: 3,
        dia: 'Miércoles',
        Horario: ['10:00 - 14:00', '16:00 - 20:00'],
    },
    {
        id: 4,
        dia: 'Jueves',
        Horario: ['10:00 - 14:00', '16:00 - 20:00'],
    },
    {
        id: 5,
        dia: 'Viernes',
        Horario: ['10:00 - 14:00', '16:00 - 20:00'],
    },
    {
        id: 6,
        dia: 'Sábado',
        Horario: ['10:00 - 14:00'],
    },
    {
        id: 7,
        dia: 'Domingo',
        Horario: ['Cerrado'],
    },
]

const Contacto = [
    {
        id: 1,
        url: 'https://www.facebook.com/arservicepalermo/?locale=es_LA',
        text: 'facebook.com/arservicepalermo',
        icon: 'FacebookIcon',
    },
    {
        id: 2,
        url: 'https://www.instagram.com/arservicepalermo/?hl=es',
        text: 'instagram.com/arservicepalermo',
        icon: 'InstagramIcon',
    },
]

const Contactenos = () => {
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
                        marginBottom: '2rem',
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
                    Comunícate con nosotros para obtener más información sobre
                    nuestros servicios.
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        minHeight: '425px',
                        justifyContent:'space-evenly',
                        '@media (max-width:1024px)': {
                            flexDirection: 'column',
                        },
                    }}
                >
                    <Box
                        sx={{
                            '@media (max-width:1024px)': {
                                width: '100%',
                                alignItems: 'baseline',
                            },
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '1.5rem',
                                marginBottom:'0.85rem',
                                '@media (max-width:600px)': {
                                    marginTop: '0.85rem',
                                },
                            }}
                        >
                            Horarios
                        </Typography>
                        {Horarios.map((horario, index) => {
                            return (
                                <>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            width: '200px',
                                        }}
                                    >
                                        <Typography>{horario.dia}</Typography>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'flex-end',
                                                flex: 1,
                                            }}
                                        >
                                            {horario.Horario.map((franja) => {
                                                return (
                                                    <Typography>
                                                        {franja}
                                                    </Typography>
                                                )
                                            })}
                                        </Box>
                                    </Box>
                                    {index !== Horarios.length - 1 && (
                                        <Divider
                                            sx={{ margin: '0.45rem' }}
                                            orientation="horizontal"
                                            variant="middle"
                                            flexItem
                                        />
                                    )}
                                </>
                            )
                        })}
                    </Box>
                    <Box
                        sx={{
                            marginLeft: '2rem',
                            '@media (max-width:1024px)': {
                                marginLeft: '0',

                                width: '100%',
                                alignItems: 'baseline',
                            },
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '1.5rem',
                                marginBottom:'0.85rem',
                                '@media (max-width:600px)': {
                                    marginTop: '0.85rem',
                                },
                            }}
                        >
                            Contactos
                        </Typography>
                        <Typography sx={{
                                            marginBottom:'0.85rem'

                        }}>011 - 4775-6044</Typography>
                        <Typography sx={{
                                            marginBottom:'0.85rem'

                        }}>
                            arservicepalermo@hotmail.com
                        </Typography>
                        <Typography sx={{
                                            marginBottom:'0.85rem'

                        }}>
                            Paraguay 5101, CABA, Buenos Aires
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            marginLeft: '2rem',
                            '@media (max-width:1024px)': {
                                marginLeft: '0',

                                width: '100%',
                                alignItems: 'baseline',
                            },
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '1.5rem',
                                marginBottom:'0.85rem',

                                '@media (max-width:600px)': {
                                    marginTop: '0.85rem',
                                },
                            }}
                        >
                            Redes sociales
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            {Contacto.map((icono) => {
                                const IconComponent = iconComponents[icono.icon]

                                return (
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            marginBottom:'1rem'
                                        }}
                                    >
                                        <a
                                            style={{
                                                display: 'flex',
                                                color: iconColors[icono.icon],
                                                textDecoration:'none',
                                            }}
                                            href={icono.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {IconComponent && <IconComponent />}

                                        {icono.text}
                                        </a>
                                    </Box>
                                )
                            })}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </div>
    )
}

export { Contactenos }
