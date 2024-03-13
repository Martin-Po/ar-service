import { Box, Typography } from '@mui/material'
import React from 'react'
import ImgMapa from '../assets/mapas/mapa.png'

const EncontranosMaps = () => {
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
                <div className="google-map-code">
                <iframe
    title="map"
    
    
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.95807157507!2d-58.4325206237469!3d-34.57992745624306!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f11!3m3!1m2!1s0x95bcb5906bada421%3A0x3923f26fd1298fc2!2sParaguay%205101%2C%20C1425BTE%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1710286705158!5m2!1ses-419!2sar&q=Paraguay%205101%2C%20C1425BTE%20Buenos%20Aires"
    width="10000vw"
    height="450"
    style={{ border: 0 }}
    allowfullscreen=""
    loading="lazy"
    referrerpolicy="no-referrer-when-downgrade"
></iframe>
                   
                </div>
            </Box>
        </div>
    )
}
export { EncontranosMaps }
