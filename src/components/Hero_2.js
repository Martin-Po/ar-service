import { Button, Grid, Typography } from '@mui/material'
import Background from '../assets/hero_background_darken.png'

const Hero_2 = () => {
    return (
            <div
                style={{
                    width: '100vw', maxWidth: '100%', height: '100vh',
                    position: 'relative',
                    left: 0,
                    backgroundImage: `url(${Background})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Grid
                    container
                    direction="column"
                    sx={{
                        display: 'flex',
                        width: '1280px',
                        '@media (max-width: 1300px)': {
                            width: '992px',
                            paddingLeft: '1.5rem',
                            paddingRight: '1.5rem',
                            direction: 'column',
                            display: 'flex',
                            flexDirection: 'column',
                            marginBottom: '20px',
                        },
                        '@media (max-width:1024px)': {
                            width: '100%',
                            alignItems:'baseline'                            
                        },
                    }}
                >
                    <Grid
                        item
                        xs={3}
                        sx={{
                            alignItems: 'center',
                        }}
                    >
                        <Typography
                            sx={{
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: '5rem',
                                margin: '2rem',
                                '@media (max-width:600px)': {
                                    fontSize: '2rem',
                                    margin:'0',
                                    paddingTop:'1.25rem'
                                },
                            }}
                        >
                            Especialistas en Audio Vintage
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={3}
                        sx={{
                            alignItems: 'center',
                            marginBottom: '2rem'
                        }}
                    >
                        <Typography
                            sx={{
                                color: 'white',
                                marginTop: '1rem',
                                fontWeight: '300',
                                fontSize: '2rem',
                                '@media (max-width:600px)': {
                                    fontSize: '1.5rem',
                                },
                            }}
                        >
                            Preserva la calidad del pasado. Reparamos equipos de
                            audio vintage con precisión y pasión.
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={1}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Button
                            sx={{
                                marginTop: '1.5rem',
                                paddingTop: '0.75rem',
                                paddingBottom: '0.75rem',
                                paddingLeft: '2rem',
                                paddingRight: '2rem',
                                borderRadius: '35px',
                                fontSize: '1.75rem',
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
                                Consultá sin compromiso
                            </Typography>
                        </Button>
                    </Grid>
                    <Grid
                        item
                        xs={2}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            margin: '20px',
                        }}
                    >
                        <Typography
                            sx={{
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: '2rem',
                                margin: '2rem',
                                '@media (max-width:600px)': {
                                    marginLeft: '0px',
                                    marginRight: '0px',
                                    fontSize: '0.85rem',
                                },
                            }}
                        >
                            ¡PEDI TU PRESUPUESTO SIN CARGO!{' '}
                        </Typography>
                    </Grid>
                </Grid>
            </div>
    )
}

export { Hero_2 }
