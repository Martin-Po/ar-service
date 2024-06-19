import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Autocomplete,
    Avatar,
    Box,
    Button,
    Chip,
    Grid,
    Paper,
    TextField,
    Typography,
} from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TableContainer from '@mui/material/TableContainer'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import CheckIcon from '@mui/icons-material/Check'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'


import { useNavigate } from 'react-router-dom'

import DeleteIcon from '@mui/icons-material/Delete'
import {
    DeleteCaracteristica,
    createObservacion,
    DeleteObservacion,
    createCaracteristicas,
} from '../../reducers/productosReducer'

const ObservacionesXProductoDetail = ({ observaciones, producto_id }) => {
    const [activo, setActivo] = useState(true)
    const [newObservacion, setNewObservacion] = useState('')

    const dispatch = useDispatch()

    const deleteObservacion = async ({ observacion, producto_id }) => {
        try {
            setActivo(false)
            await dispatch(DeleteObservacion(observacion, producto_id))
        } catch (exception) {
            console.log('dio error')
        } finally {
            setActivo(true)
        }
    }

    const addObservacion = async ({ producto_id }) => {
        try {
            setActivo(false)
            const observacion = newObservacion
            await dispatch(createObservacion(producto_id, observacion))
        } catch (exception) {
            console.log('dio error')
        } finally {
            setActivo(true)
        }
    }

    return (
        <Box sx={{ margin: 1, width: '60%' }}>
            <Typography variant="h6" gutterBottom component="div">
                Observaciones
            </Typography>
            <Table size="small" aria-label="purchases">
                <TableHead>
                    <TableRow>
                        <TableCell>Descripcion</TableCell>
                        <TableCell align="right">Fecha</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {observaciones.map((observacion) => (
                        <TableRow key={observacion._id}>
                            <TableCell component="th">
                                {observacion.observacion}
                            </TableCell>
                            <TableCell align="right">
                                {observacion.fecha &&
                                    observacion.fecha.substring(8, 10) +
                                        '-' +
                                        observacion.fecha.substring(5, 7) +
                                        '-' +
                                        observacion.fecha.substring(0, 4) +
                                        ' ' +
                                        observacion.fecha.substring(11, 19)}
                            </TableCell>
                            <TableCell align="right">
                                <IconButton
                                    disabled={!activo}
                                    onClick={() =>
                                        deleteObservacion({
                                            observacion,
                                            producto_id,
                                        })
                                    }
                                    aria-label="delete"
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                    <TableRow>
                        <TableCell component="th">
                            <TextField
                                variant="standard"
                                onChange={(e) =>
                                    setNewObservacion(e.target.value)
                                }
                            />
                        </TableCell>
                        <TableCell component="th"></TableCell>
                        <TableCell component="th">
                            {newObservacion && (
                                <IconButton
                                    disabled={!activo}
                                    onClick={() =>
                                        addObservacion({ producto_id })
                                    }
                                    aria-label="delete"
                                >
                                    <CheckIcon />
                                </IconButton>
                            )}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Box>
    )
}

const CaracteristicasXProductoDetail = ({caracteristicas, caracteristicasList, producto_id}) => {
    const [activo, setActivo] = useState(true)
    const [newCaracteristica, setNewCaracteristica] = useState({
        name: '',
        descripcion: '',
        valor: '',
    })

    const dispatch = useDispatch()

    const deleteCaracteristica = async ({ caracteristica }) => {
        try {
            setActivo(false)
            await dispatch(DeleteCaracteristica(caracteristica))
        } catch (exception) {
            console.log('dio error')
        } finally {
            setActivo(true)
        }
    }


    const handleCaracteristicaChange = (event, value) => {

        if (value === null) {
            const newValor = {
                ...newCaracteristica,
                name: '',
                descripcion: '',
                id:''
            }
            setNewCaracteristica(newValor)
        } else {
            const newValor = {
                ...newCaracteristica,
                name: value.name,
                descripcion: value.descripcion,
                id: value.id,
            }
            setNewCaracteristica(newValor)
        }
    }

    const handleValueChange = (event) => {
        const CaracteristivaValue = {
            ...newCaracteristica,
            valor: event.target.value,
        }
        setNewCaracteristica(CaracteristivaValue)
    }

    const AgregarCaracteristicas = async (event) => {
        try {
            setActivo(false)         

                await dispatch(createCaracteristicas(producto_id, [newCaracteristica]))
            } catch (exception) {
                console.log('dio error')
            }
            finally{
            setActivo(true)

            }
        }

    return (
        <Box sx={{ margin: 1, width: '60%' }}>
            <Typography variant="h6" gutterBottom component="div">
                Caracteristicas
            </Typography>
            <Table size="small" aria-label="purchases">
                <TableHead>
                    <TableRow>
                        <TableCell>Descripcion</TableCell>
                        <TableCell align="left">Valor</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {caracteristicas.map((caracteristica) => (
                        <TableRow key={caracteristica.id}>
                            <TableCell component="th">
                                {caracteristica.caracteristica.name}
                            </TableCell>
                            <TableCell align="right">
                                {caracteristica.valor}
                            </TableCell>
                            <TableCell align="right">
                                <IconButton
                                    disabled={!activo}
                                    onClick={() =>
                                        deleteCaracteristica({
                                            caracteristica,
                                        })
                                    }
                                    aria-label="delete"
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                    <TableRow>
                        <TableCell component="th" width="30%">
                            <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        options={caracteristicasList}
                                        getOptionLabel={(option) => option.name}
                                        isOptionEqualToValue={(option, value) =>
                                            option.name === value.name
                                        }
                                        sx={{
                                            width: '100%',
                                            '@media (max-width:1024px)': {
                                                marginBottom: '1rem',
                                            },
                                        }}
                                        autoSelect
                                        onChange={handleCaracteristicaChange}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Caracteristica"
                                            />
                                        )}
                                    />
                        </TableCell>
                        <TableCell component="th">
                            <TextField
                                variant="standard"
                                onChange={handleValueChange}
                            />
                        </TableCell>
                        <TableCell component="th">
                            {(newCaracteristica.id && newCaracteristica.valor) && (
                                <IconButton
                                    disabled={!activo}
                                    aria-label="delete"
                                    onClick={AgregarCaracteristicas}
                                >
                                    <CheckIcon />
                                </IconButton>
                            )}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Box>
    )
}

const Row = ({ producto, caracteristicasList }) => {
    const [open, setOpen] = React.useState(false)

    return (
        <React.Fragment>
            <TableRow
                key={producto.id}
                sx={{ '& > *': { borderBottom: 'unset' } }}
            >
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? (
                            <KeyboardArrowUpIcon />
                        ) : (
                            <KeyboardArrowDownIcon />
                        )}
                    </IconButton>
                </TableCell>
                <TableCell component="th">
                    <Chip
                        label={producto.estado_activo.estado}
                        color={
                            producto.estado_activo.estado === 'Disponible'
                                ? 'success'
                                : 'error'
                        }
                    />
                </TableCell>
                <TableCell align="left">{producto.name}</TableCell>
                <TableCell align="right">
                    <img
                        style={{
                            width: '3rem',
                            height: '3rem',
                        }}
                        src={producto.portada}
                        alt={producto.marca + producto.modelo}
                    />
                </TableCell>
                <TableCell align="right">{producto.marca}</TableCell>
                <TableCell align="right">{producto.modelo}</TableCell>
                <TableCell align="right">{producto.origen}</TableCell>
                <TableCell align="right">
                    {producto.moneda.name + ' ' + producto.precio}
                </TableCell>
                <TableCell align="right">{producto.descuento} %</TableCell>
            </TableRow>
            <TableRow>
                <TableCell
                    style={{
                        paddingBottom: 0,
                        paddingTop: 0,
                    }}
                    colSpan={6}
                >
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{}}>
                            {producto.caracteristicas && (
                                <CaracteristicasXProductoDetail
                                    caracteristicas={producto.caracteristicas}
                                    caracteristicasList={caracteristicasList}
                                    producto_id={producto.id}
                                />
                            )}

                            {producto.observaciones && (
                                <ObservacionesXProductoDetail
                                    observaciones={producto.observaciones}
                                    producto_id={producto.id}
                                />
                            )}
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}

const AdminProductos = ({ caracteristicasList }) => {
    const productos = useSelector((state) => state.productos)
    const [open, setOpen] = React.useState(false)

    const navigate = useNavigate()

    const handleClick = async (event) => {
        navigate('/admin/nuevo-producto')
    }

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
                    PRODUCTOS
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
            <Box sx={{ display: 'flex', flex: '1' }}>
                <Button
                    onClick={handleClick}
                    sx={{
                        paddingBottom: '0.75rem',
                        marginLeft: '2rem',
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
                    {' '}
                    CREAR PRODRUDCTO
                </Button>
            </Box>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell align="left">Estado</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell align="right">Portada</TableCell>
                            <TableCell align="right">Marca</TableCell>
                            <TableCell align="right">Modelo</TableCell>
                            <TableCell align="right">Origen</TableCell>
                            <TableCell align="right">Precio</TableCell>
                            <TableCell align="right">Descuento</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {productos &&
                            productos.map((producto) => {
                                return (
                                    <Row
                                        producto={producto}
                                        key={producto.id}
                                        caracteristicasList={
                                            caracteristicasList
                                        }
                                    />
                                )
                            })}
                    </TableBody>
                    <TableBody></TableBody>
                </Table>
            </TableContainer>
        </Box>
        </AccordionDetails>
    </Accordion>
    )
}
export { AdminProductos }
