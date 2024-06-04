import { Avatar, Box, Button, Grid, Paper, Typography } from '@mui/material'
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
import { useNavigate } from 'react-router-dom'

const Row = ({ producto }) => {
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
                    {producto.estado_activo.estado}
                </TableCell>
                <TableCell align="right">{producto.name}</TableCell>
                <TableCell align="right"><img
                    style={{
                        width: '3rem',
                        height: '3rem'
                    }}
                    src={producto.portada}
                    alt= {producto.marca + producto.modelo}
                /></TableCell>
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
                                <Box sx={{ margin: 1, width: '30%' }}>
                                    <Typography
                                        variant="h6"
                                        gutterBottom
                                        component="div"
                                    >
                                        Caracteristicas
                                    </Typography>
                                    <Table size="small" aria-label="purchases">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>
                                                    Descripcion
                                                </TableCell>
                                                <TableCell align="right">
                                                    Valor
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {producto.caracteristicas.map(
                                                (caracteristica) => (
                                                    <TableRow
                                                        key={caracteristica._id}
                                                    >
                                                        <TableCell component="th">
                                                            {
                                                                caracteristica
                                                                    .caracteristica
                                                                    .name
                                                            }
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            {
                                                                caracteristica.valor
                                                            }
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            )}
                                        </TableBody>
                                    </Table>
                                </Box>
                            )}

                            {producto.observaciones && (
                                <Box sx={{ margin: 1, width: '50%' }}>
                                    <Typography
                                        variant="h6"
                                        gutterBottom
                                        component="div"
                                    >
                                        Observaciones
                                    </Typography>
                                    <Table size="small" aria-label="purchases">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>
                                                    Descripcion
                                                </TableCell>
                                                <TableCell align="right">
                                                    Fecha
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {producto.observaciones.map(
                                                (observacion) => (
                                                    <TableRow
                                                        key={observacion._id}
                                                    >
                                                        <TableCell component="th">
                                                            {
                                                                observacion.observacion
                                                            }
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            {observacion.fecha &&
                                                                observacion.fecha.substring(
                                                                    8,
                                                                    10
                                                                ) +
                                                                    '-' +
                                                                    observacion.fecha.substring(
                                                                        5,
                                                                        7
                                                                    ) +
                                                                    '-' +
                                                                    observacion.fecha.substring(
                                                                        0,
                                                                        4
                                                                    ) +
                                                                    ' ' +
                                                                    observacion.fecha.substring(
                                                                        11,
                                                                        19
                                                                    )}
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            )}
                                        </TableBody>
                                    </Table>
                                </Box>
                            )}
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}

const AdminProductos = () => {
    const productos = useSelector((state) => state.productos)
    const [open, setOpen] = React.useState(false)

    const navigate = useNavigate()

    const handleClick = async (event) => {
        navigate('/admin/nuevo-producto')
    }

    return (
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
                                        key={producto._id}
                                    />
                                )
                            })}
                    </TableBody>
                    <TableBody></TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}
export { AdminProductos }
