import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Collapse,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from '@mui/material'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import DeleteIcon from '@mui/icons-material/Delete'
import React, { useState } from 'react'
import CheckIcon from '@mui/icons-material/Check'
import caracteristicasService from '../../services/caracteristicas'

const AdminCaracteristicas = ({ caracteristicasList, eliminarCaracteristica, agregarCaracteristica }) => {
    return (
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
                        CARACTERISTICAS
                    </Typography>
                </Box>
            </AccordionSummary>
            <AccordionDetails>
                <Box
                    sx={{
                        width: '1280px',
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center',
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
                    <TableContainer component={Paper}>
                        <Table aria-label="collapsible table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Nombre</TableCell>
                                    <TableCell align="left">
                                        Descripcion
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {caracteristicasList.map((caracteristica) => {
                                    return (
                                        <Row
                                            caracteristica={caracteristica}
                                            eliminarCaracteristica={eliminarCaracteristica}
                                            key={caracteristica.id}
                                        />
                                    )
                                })}
                                <TableRow>
                                    <NuevaCaracteristica agregarCaracteristica={agregarCaracteristica} />
                                </TableRow>
                            </TableBody>
                            <TableBody></TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </AccordionDetails>
        </Accordion>
    )
}

const Row = ({ caracteristica, eliminarCaracteristica }) => {


    const deleteCaracteristica = async (caracteristica) => {
        try {
            await caracteristicasService.remove(caracteristica.id).then(
                data => console.log(data)
            )
            eliminarCaracteristica(caracteristica)
        } catch (exception) {
            const errorMessage = exception.response?.data?.error || 'Error desconocido';
            console.log('dio error', errorMessage)
        } finally {
        }
    }

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell align="left">{caracteristica.name}</TableCell>

                <TableCell align="left">{caracteristica.descripcion}</TableCell>
                <TableCell align="left">
                    {' '}
                    <IconButton
                        onClick={() => deleteCaracteristica(caracteristica)}
                        aria-label="delete"
                    >
                        <DeleteIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}

const NuevaCaracteristica = ({agregarCaracteristica}) => {
    const [activo, setActivo] = useState(true)

    const [newNombre, setNewNombre] = useState('')
    const [newDescripcion, setNewDescripcion] = useState('')

    const addCaracteristica = async () => {
        try {
            setActivo(false)
            const newCaracteristica = {
                name: newNombre,
                descripcion: newDescripcion,
            }
            const createdCaracteristica = await caracteristicasService.create(newCaracteristica)
            agregarCaracteristica(createdCaracteristica)
            setNewDescripcion('')
            setNewNombre('')
        } catch (exception) {
            const errorMessage = exception.response?.data?.error || 'Error desconocido';
            console.log('dio error', errorMessage)

        } finally {
            setActivo(true)
        }
    }

    return (
        <TableRow>
            <TableCell component="th">
                <TextField
                    variant="standard"
                    onChange={(e) => setNewNombre(e.target.value)}
                    value={newNombre}
                />
            </TableCell>
            <TableCell component="th">
                <TextField
                    variant="standard"
                    onChange={(e) => setNewDescripcion(e.target.value)}
                    value={newDescripcion}
                />
            </TableCell>
            <TableCell component="th"></TableCell>
            <TableCell component="th">
                {newNombre && newDescripcion && (
                    <IconButton
                        disabled={!activo}
                        onClick={() => addCaracteristica()}
                        aria-label="delete"
                    >
                        <CheckIcon />
                    </IconButton>
                )}
            </TableCell>
        </TableRow>
    )
}

export { AdminCaracteristicas }
