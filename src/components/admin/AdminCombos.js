import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Chip,
    Collapse,
    Divider,
    IconButton,
    List,
    ListItem,
    MenuItem,
    Modal,
    Paper,
    Select,
    Stack,
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
import combosService from '../../services/combos'
import { useDispatch, useSelector } from 'react-redux'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { Steps } from '../reutilizables/Steps'
import { TotalComboString } from '../reutilizables/FuncionesCombo'
import { createCombo, deleteComboById } from '../../reducers/combosReducer'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

const AdminCombos = ({ eliminarCombo, monedasList }) => {
    const combos = useSelector((state) => state.combos)

    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

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
                        COMBOS
                    </Typography>
                </Box>
            </AccordionSummary>
            <NuevaCombo
                open={open}
                handleOpen={handleOpen}
                handleClose={handleClose}
                monedasList={monedasList}
            />
            <Button
                onClick={handleOpen}
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
                CREAR COMBO
            </Button>
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
                                    <TableCell align="left"></TableCell>

                                    <TableCell align="left">Nombre</TableCell>
                                    <TableCell align="left">
                                        Descripcion
                                    </TableCell>
                                    <TableCell align="left">
                                        Precio individual
                                    </TableCell>
                                    <TableCell align="left">Precio</TableCell>
                                    <TableCell align="left">
                                        Descuento
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {combos.map((combo) => {
                                    return (
                                        <Row
                                            combo={combo}
                                            eliminarCombo={eliminarCombo}
                                            key={combo.id}
                                            monedasList={monedasList}
                                        />
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </AccordionDetails>
        </Accordion>
    )
}

const Row = ({ combo, eliminarCombo, monedasList }) => {
    const [open, setOpen] = React.useState(false)

    const dispatch = useDispatch()

    const deleteCombo = async (combo) => {
        try {
            await dispatch(deleteComboById(combo.id)).then(() => {
                console.log('Combo elimiado correctamente') // Aquí agregas el log
            })
            console.log('dispatch completed successfully')
        } catch (exception) {
            console.error('Error during dispatch:', exception)
        }
    }

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
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
                <TableCell align="left">{combo.name}</TableCell>

                <TableCell align="left">{combo.descripcion}</TableCell>
                <TableCell align="left">
                    {TotalComboString({ combo, monedasList })}
                </TableCell>
                <TableCell align="left">
                    {combo.moneda.name + ' ' + combo.precio}
                </TableCell>
                <TableCell align="left">{combo.descuento}</TableCell>

                <TableCell align="left">
                    {' '}
                    <IconButton
                        onClick={() => deleteCombo(combo)}
                        aria-label="delete"
                    >
                        <DeleteIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell
                    style={{
                        paddingBottom: 0,
                        paddingTop: 0,
                    }}
                    colSpan={12}
                    
                >
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{}}>
                            <TableRow>
                                <TableCell align="left">Nombre</TableCell>
                                <TableCell align="left">Marca</TableCell>
                                <TableCell align="left">Modelo</TableCell>
                                <TableCell align="left">Precio</TableCell>
                                <TableCell align="left"></TableCell>
                            </TableRow>
                            {combo.productos.map((producto) => {
                                return (
                                    <TableRow>
                                        <TableCell align="left">
                                            {producto.name}
                                        </TableCell>
                                        <TableCell align="left">
                                            {producto.marca}
                                        </TableCell>
                                        <TableCell align="left">
                                            {producto.modelo}
                                        </TableCell>
                                        <TableCell align="left">
                                            {monedasList.filter(moneda => moneda.id === producto.moneda)[0].name + ' ' + producto.precio}
                                        </TableCell>
                                        <TableCell align="left"></TableCell>
                                    </TableRow>
                                )
                            })}
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}

const NuevaCombo = ({ open, handleClose, monedasList }) => {
    const [selectedStep, setSelectedStep] = useState(0)
    const [nuevoCombo, setNuevoCombo] = useState({
        id: '',
        name: '',
        descripcion: '',
        productos: [],
        precio: 0,
        moneda: '',
        descuento: 0,
    })

    const initializeCombos = () => {
        setSelectedStep(0)

        setNuevoCombo({
            id: '',
            name: '',
            descripcion: '',
            productos: [],
            precio: 0,
            moneda: '',
            descuento: 0,
        })
    }

    const addProducto = (productoSeleccionado) => {
        setNuevoCombo({
            ...nuevoCombo,
            productos: nuevoCombo.productos.concat(productoSeleccionado),
        })
    }

    const removeProducto = (productoSeleccionado) => {
        setNuevoCombo({
            ...nuevoCombo,
            productos: nuevoCombo.productos.filter(
                (producto) => producto.id !== productoSeleccionado.id
            ),
        })
    }

    const handleMonedaChange = (event) => {
        const newCombo = { ...nuevoCombo, moneda: event.target.value }
        setNuevoCombo(newCombo)
    }

    const handlePrecioChange = (event) => {
        const newCombo = { ...nuevoCombo, precio: event.target.value }
        setNuevoCombo(newCombo)
    }

    const handleNombreChange = (event) => {
        const newCombo = { ...nuevoCombo, name: event.target.value }
        setNuevoCombo(newCombo)
    }

    const handleDescripcionChange = (event) => {
        const newCombo = { ...nuevoCombo, descripcion: event.target.value }
        setNuevoCombo(newCombo)
    }

    const backwardStep = () => {
        setSelectedStep((prevStep) => prevStep - 1)
    }

    const advanceStep = () => {
        setSelectedStep((prevStep) => prevStep + 1)
    }

    const checkDisabled = () => {
        switch (selectedStep) {
            case 0:
                return nuevoCombo.productos.length === 0
            case 1:
                return (
                    !!nuevoCombo.moneda.id === false || nuevoCombo.precio <= 0
                )

            default:
                return false
        }
    }

    const pasos = ['Agregar productos', 'Precio', 'Detalles']

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-descripcion"
            >
                <Box sx={style}>
                    <Box sx={{ display: 'flex', marginBottom: '1rem' }}>
                        {selectedStep !== 0 && (
                            <IconButton
                                sx={{ paddingTop: '0px' }}
                                onClick={backwardStep}
                            >
                                <ArrowBackIcon />
                            </IconButton>
                        )}
                        <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                            textAlign="center"
                            sx={{ flex: 1 }}
                        >
                            NUEVO COMBO
                        </Typography>

                        {selectedStep !== pasos.length - 1 && (
                            <IconButton
                                disabled={checkDisabled()}
                                sx={{ paddingTop: '0px' }}
                                onClick={advanceStep}
                            >
                                <ArrowForwardIcon />
                            </IconButton>
                        )}
                    </Box>
                    <Divider />

                    {selectedStep === 0 && (
                        <ProductosCombo
                            addProducto={addProducto}
                            removeProducto={removeProducto}
                            nuevoCombo={nuevoCombo}
                            monedasList={monedasList}
                        />
                    )}

                    {selectedStep === 1 && (
                        <PrecioCombo
                            nuevoCombo={nuevoCombo}
                            monedasList={monedasList}
                            handleMonedaChange={handleMonedaChange}
                            handlePrecioChange={handlePrecioChange}
                        />
                    )}
                    {selectedStep === 2 && (
                        <DescripcionCombo
                            nuevoCombo={nuevoCombo}
                            monedasList={monedasList}
                            handleNombreChange={handleNombreChange}
                            handleDescripcionChange={handleDescripcionChange}
                            handleClose={handleClose}
                            initializeCombos={initializeCombos}
                        />
                    )}
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'baseline',
                            marginTop: '1rem',
                            '@media (max-width:1024px)': {
                                marginLeft: '1rem',
                                marginRight: '1rem',
                            },
                        }}
                    >
                        {pasos.map((paso, index) => {
                            return (
                                <Steps
                                    key={index}
                                    selected={selectedStep + 1}
                                    step={paso}
                                    index={index + 1}
                                    last={index === pasos.length - 1}
                                />
                            )
                        })}
                    </Box>
                </Box>
            </Modal>
        </div>
    )
}

const ProductosCombo = ({
    addProducto,
    removeProducto,
    nuevoCombo,
    monedasList,
}) => {
    const productos = useSelector((state) => state.productos)

    return (
        <Box>
            <Stack
                direction="row"
                flexWrap="wrap"
                useFlexGap
                spacing={1}
                sx={{ marginTop: '1rem', marginBottom: '1rem' }}
            >
                {nuevoCombo.productos.map((producto) => {
                    return (
                        <Chip
                            label={producto.name}
                            onDelete={() => removeProducto(producto)}
                        />
                    )
                })}
            </Stack>
            <Typography>
                {' '}
                PRECIO TOTAL:{' '}
                {TotalComboString({ combo: nuevoCombo, monedasList })}
            </Typography>

            <Divider />

            <TableContainer sx={{ maxHeight: 300 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead
                        sx={{
                            backgroundColor: 'black',
                            color: 'white',
                        }}
                    >
                        <TableRow>
                            <TableCell align="left">Nombre</TableCell>
                            <TableCell align="left">Precio</TableCell>
                            <TableCell align="left"></TableCell>
                        </TableRow>
                    </TableHead>
                    {productos.map((producto) => {
                        return (
                            !nuevoCombo.productos.includes(producto) && (
                                <TableRow>
                                    <TableCell align="left">
                                        {producto.name}
                                    </TableCell>
                                    <TableCell align="left">
                                        {producto.moneda.name} {producto.precio}
                                    </TableCell>
                                    <TableCell align="left">
                                        <IconButton
                                            onClick={() =>
                                                addProducto(producto)
                                            }
                                        >
                                            <AddCircleIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            )
                        )
                    })}
                </Table>
            </TableContainer>
        </Box>
    )
}

const PrecioCombo = ({
    nuevoCombo,
    monedasList,
    handleMonedaChange,
    handlePrecioChange,
}) => {
    return (
        <Box>
            <Stack
                direction="row"
                flexWrap="wrap"
                useFlexGap
                spacing={1}
                sx={{ marginTop: '1rem', marginBottom: '1rem' }}
            >
                {nuevoCombo.productos.map((producto) => {
                    return <Chip label={producto.name} />
                })}
            </Stack>
            <Typography>
                {' '}
                TOTAL: {TotalComboString({ combo: nuevoCombo, monedasList })}
            </Typography>

            <Divider sx={{ marginTop: '1rem', marginBottom: '1rem' }} />

            <Box
                sx={{
                    display: 'flex',
                    alignContent: 'center',
                    width: '100%',
                    direction: 'column',
                    flexDirection: 'row',
                    marginBottom: '1.5rem',
                }}
            >
                <Select
                    sx={{ width: '5rem', justifyContent: 'space-around' }}
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={nuevoCombo.moneda}
                    onChange={handleMonedaChange}
                    autoWidth
                    label="Moneda"
                >
                    {monedasList.map((moneda) => (
                        <MenuItem value={moneda} key={moneda.id}>
                            {moneda.name}{' '}
                        </MenuItem>
                    ))}
                </Select>
                <TextField
                    style={{
                        WebkitAppearance: 'none',
                    }}
                    sx={{ marginLeft: '1rem' }}
                    id="standard-number"
                    label="Precio"
                    type="number"
                    onChange={handlePrecioChange}
                    value={nuevoCombo.precio}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="standard"
                />
            </Box>
        </Box>
    )
}

const DescripcionCombo = ({
    nuevoCombo,
    monedasList,
    handleNombreChange,
    handleDescripcionChange,
    handleClose,
    initializeCombos,
}) => {
    const dispatch = useDispatch()

    const handleClick = async (event) => {
        try {
            await dispatch(createCombo(nuevoCombo)).then((newProduct) => {
                handleClose()
                initializeCombos()
                console.log('Nuevo producto creado:', newProduct.id) // Aquí agregas el log
            })
            console.log('dispatch completed successfully')
        } catch (exception) {
            console.error('Error during dispatch:', exception)
        }
    }

    return (
        <Box>
            <Stack
                direction="row"
                flexWrap="wrap"
                useFlexGap
                spacing={1}
                sx={{ marginTop: '1rem', marginBottom: '1rem' }}
            >
                {nuevoCombo.productos.map((producto) => {
                    return <Chip label={producto.name} />
                })}
            </Stack>
            <Typography>
                {' '}
                TOTAL PRODUCTOS:{' '}
                {TotalComboString({ combo: nuevoCombo, monedasList })}
            </Typography>

            <Typography>
                {' '}
                PRECIO COMBO :{' '}
                {nuevoCombo.moneda.name + ' ' + nuevoCombo.precio}
            </Typography>

            <Divider sx={{ marginTop: '1rem', marginBottom: '1rem' }} />

            <Box
                sx={{
                    display: 'flex',
                    alignContent: 'center',
                    width: '100%',
                    flexDirection: 'column',
                    marginBottom: '1.5rem',
                }}
            >
                <TextField
                    sx={{
                        marginBottom: '1rem',
                        paddingRight: '0.5rem',

                        '@media (max-width:1024px)': {
                            width: '100%',
                        },
                    }}
                    id="outlined-basic"
                    label="Producto"
                    variant="outlined"
                    onChange={handleNombreChange}
                />
                <TextField
                    sx={{
                        marginBottom: '1rem',

                        '@media (max-width:1024px)': {
                            paddingLeft: '0rem',

                            width: '100%',
                        },
                    }}
                    id="outlined-textarea"
                    label="Descripcion producto"
                    placeholder="Placeholder"
                    multiline
                    onChange={handleDescripcionChange}
                />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', flex: '1' }}>
                <Button
                    onClick={handleClick}
                    disabled={
                        nuevoCombo.name === '' || nuevoCombo.descripcion === ''
                    }
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
                    CREAR COMBO
                </Button>
            </Box>
        </Box>
    )
}

export { AdminCombos }
