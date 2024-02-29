import { Button, Grid, Typography } from '@mui/material'
import HeroImage from '../assets/hero_image.png'

const Hero = () => {
    return (
        <>
            <Grid
                item
                xs={12}
                sm={6}
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
                        fontSize: '4rem',
                        '@media (max-width:600px)': { fontSize: '2rem' },
                    }}
                >
                    Especialistas en Audio Vintage
                </Typography>
                <Typography
                    sx={{
                        marginTop: '1rem',
                        fontWeight: '300',
                        fontSize: '2rem',
                        '@media (max-width:600px)': {
                            fontSize: '1.5rem',
                        },
                    }}
                >
                    Preserva la calidad del pasado. Reparamos equipos de audio vintage con precisión y pasión.
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
                        '@media (max-width:600px)': {  paddingLeft: '1rem',
                        paddingRight: '1rem', },

                    }}
                    variant="contained"
                >
                    <Typography
                        sx={{
                            color: 'secondary.contrastText',
                            fontWeight: 'bold',
                            '@media (max-width:600px)': { fontSize: '0.85rem' },
                        }}
                    >
                        Consultá sin compromiso
                    </Typography>
                </Button>
            </Grid>
            <Grid
                item
                xs={12}
                sm={6}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <img
                    style={{
                        width: '100%',
                        maxWidth: '471px',
                        maxHeight: '471px',
                    }}
                    src={HeroImage}
                    alt="Hero"
                />
            </Grid>
            <Grid
                item
                xs={12}sx={{display:'flex', justifyContent:'center'}}>
                    <Typography
                    sx={{
                        fontWeight: 'bold',
                        fontSize: '2rem',
                        margin: '2rem',
                        '@media (max-width:600px)': {
                            marginLeft:'0px',
                            marginRight:'0px',fontSize:'1.25rem'
                        },
                    }}
                >¡PEDI TU PRESUPUESTO SIN CARGO!       </Typography>
            </Grid>

        </>
    )
}

export { Hero }
