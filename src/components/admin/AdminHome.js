import { Box, Typography } from '@mui/material'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import { AdminProductos } from './AdminProductos'

const Adminhome = () => {
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
            <Typography
                sx={{
                    margin: '1rem',

                    display: 'flex',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontSize: '2rem',

                    '@media (max-width:600px)': { fontSize: '1.25rem' },
                }}
            >
                SECCION ADMINISTRADOR
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    alignContent: 'center',
                    width: '1280px',
                    height: 'fit-content',
                    direction: 'column',
                    flexDirection: 'column',
                    marginBottom: '1.5rem',

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
                <Accordion sx={{ width: '100%' }}>
                    <AccordionSummary
                        expandIcon={<ArrowDownwardIcon />}
                        aria-controls="panel1-content"
                        id={2}
                    >
                        <Box sx={{ display: 'flex' }}>
                            <Typography
                                sx={{
                                    fontWeight: '500',
                                    fontSize: '1.15rem',
                                }}
                            >
                                {'PRODUCTOS'}
                            </Typography>
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                        <AdminProductos />
                    </AccordionDetails>
                </Accordion>
            </Box>
        </div>
    )
}

export { Adminhome }
