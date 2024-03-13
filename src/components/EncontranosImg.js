import { Box, Typography } from '@mui/material'
import React from 'react'
import ImgMapa from '../assets/mapas/mapa.png'

const Encontranos = () => {
    return (
        <div style={{ width: '100vw', maxWidth: '100%' }}>
            <Box
                sx={{
                    margin: '50px auto 0 auto',
                    width: '1280px',
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    paddingLeft: '1.5rem',
                    paddingRight: '1.5rem',
                    flexWrap: 'wrap',

                    '@media (max-width: 1300px)': {
                        width: '992px',
                    },
                    '@media (max-width:1024px)': {
                        width: '100%',
                    },
                }}
            >
                <Typography
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        fontSize: '2.5rem',
                        margin: '2rem',
                        width: '100%',
                        '@media (max-width:960px)': {
                            marginLeft: '0px',
                            marginRight: '0px',
                            fontSize: '2rem',
                        },
                        '@media (max-width:700px)': {
                            marginLeft: '0px',
                            marginRight: '0px',
                            fontSize: '1.65rem',
                        },
                        '@media (max-width:600px)': {
                            marginLeft: '0px',
                            marginRight: '0px',
                            fontSize: '1.35rem',
                        },
                    }}
                >
                    Encontranos en Paraguay 5101, Palermo
                </Typography>
            </Box>
            <Box
                sx={{
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '425px',
                    height: '50vh',
                }}
            >
                <img
                    style={{
                        width: '100%',
                        minWidth: '1904px',
                    }}
                    loading="lazy"
                    src={ImgMapa}
                    alt="Testimonial"
                />
            </Box>
        </div>
    )
}
export { Encontranos }
