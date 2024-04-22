import { Box, Typography } from '@mui/material'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'

const Preguntas = [
    {
        id: 1,
        pregunta: '¿Qué equipos reparan?',
        respuesta: 'Realizamos repaciones de amplificadores de audio HiFi, Bandejas giradiscos, Bafles, Preamplificadores, Amplificadores integrados valvulares, Cassetteras, Sintonizadores y Radios, Ecualizadores, Potencias de sonido, Microondas, Televisores'
    },
    {
        id: 2,
        pregunta: '¿Qué no reparan?',
        respuesta: 'Heladeras, Lavarropas, Hornos Electricos, Secadores de pelo'
    },   {
        id: 3,
        pregunta: '¿Venden accesorios?',
        respuesta: 'No vendemos accesorios, siendo estos cables auxiliares y otras cosas'
    },
    {
        id: 4,
        pregunta: '¿Trabajan por pedido?',
        respuesta: 'No trabajamos por pedido, los equipos que tenemos disponibles son de los que disponemos'
    },   {
        id: 5,
        pregunta: '¿Realizan trabajos a domicilio?',
        respuesta: 'No, todas las reparaciones se realizan en nuestro local'
    },   {
        id: 6,
        pregunta: '¿Realizan instalaciones?',
        respuesta: 'No, no realizamos instalaciones de equipos'
    },
]

const FAQs = () => {
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
                    PREGUNTAS FRECUENTES
                </Typography>
                <Box
                sx={{
                    display: 'flex',
                    alignContent: 'center',
                    width: '1280px',
                    height: 'fit-content',
                    direction: 'column',
                    flexDirection: 'column',
                    marginBottom:'1.5rem',

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
                {Preguntas.map(pregunta => {
                    return (
                <Accordion sx={{width:'100%'}}>
                    <AccordionSummary
                        expandIcon={<ArrowDownwardIcon />}
                        aria-controls="panel1-content"
                        id={pregunta.id}
                    >
                        <Typography sx={{
                            fontWeight:'500',
                            fontSize: '1.15rem',
                        }}>{pregunta.pregunta}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            {pregunta.respuesta}
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                    )
                })}
            </Box>
        </div>
    )
}

export { FAQs }
