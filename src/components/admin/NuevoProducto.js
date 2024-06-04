import { Box, Button, Typography } from '@mui/material'

import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import productosService from '../../services/productos'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Chip from '@mui/material/Chip'
import { useDispatch } from 'react-redux'
import { createProducto } from '../../reducers/productosReducer'

const NuevoProducto = ({advanceStep}) => {
    const [marcasList, setMarcasList] = useState([])
    const [origenesList, setOrigenesList] = useState([])
    const [monedasList, setMonedasList] = useState([])
    const [tiposList, setTiposList] = useState([])
    const [subtiposList, setSubtiposList] = useState([])
    const [selectedSubtipos, setselectedSubtipos] = useState([])
    const [filterdedSubtipos, setFilteredSubtipos] = useState([])

    const [productoNuevo, setProductoNuevo] = useState({
        // Otros campos del producto...
        name: '',
        descripcion: '',
        marca: '',
        modelo: '',
        moneda: '', // Inicializar moneda como una cadena vacía
        precio: 0,
        origen: '',
        portada: [],
        tipos: [],
        subtipos: [],
    })

    const dispatch = useDispatch()

    useEffect(() => {
        productosService.getMarcas().then((response) => setMarcasList(response))
        productosService
            .getOrigenes()
            .then((response) => setOrigenesList(response))
        productosService
            .getMonedas()
            .then((response) => setMonedasList(response))
        productosService.getTipos().then((response) => setTiposList(response))
        productosService
            .getSubtipos()
            .then((response) => setSubtiposList(response))
    }, [])

    useEffect(() => {
        setselectedSubtipos(productoNuevo.subtipos)
    }, [productoNuevo.subtipos])

    const handleNombreChange = (event) => {
        const newProducto = { ...productoNuevo, name: event.target.value }
        setProductoNuevo(newProducto)
    }

    const handleDescripcionChange = (event) => {
        const newProducto = {
            ...productoNuevo,
            descripcion: event.target.value,
        }
        setProductoNuevo(newProducto)
    }

    const handleMarcaChange = (event, value) => {
        const newProducto = { ...productoNuevo, marca: value }
        setProductoNuevo(newProducto)
    }

    const handleModeloChange = (event) => {
        const newProducto = { ...productoNuevo, modelo: event.target.value }
        setProductoNuevo(newProducto)
    }

    const handleMonedaChange = (event) => {
        const newProducto = { ...productoNuevo, moneda: event.target.value }
        setProductoNuevo(newProducto)
    }

    const handlePrecioChange = (event) => {
        const newProducto = { ...productoNuevo, precio: event.target.value }
        setProductoNuevo(newProducto)
    }

    const handleOrigenChange = (event, value) => {
        const newProducto = { ...productoNuevo, origen: value }
        setProductoNuevo(newProducto)
    }

    const handleTiposChange = (event, value) => {
        const tipos = value.map((tipo) => tipo.id)
        const newProducto = { ...productoNuevo, tipos }

        const filterdedSubtiposactualizados = subtiposList.filter((subtipo) =>
            tipos.some((id) => subtipo.tipos.includes(id))
        )

        setFilteredSubtipos(
            subtiposList.filter((subtipo) =>
                tipos.some((id) => subtipo.tipos.includes(id))
            )
        )

        const subtiposFiltrados = newProducto.subtipos.filter((subtipoId) =>
            filterdedSubtiposactualizados.some(
                (subtipo) => subtipo.id === subtipoId.id
            )
        )
        const newProductoActualizado = {
            ...newProducto,
            subtipos: subtiposFiltrados,
        }

        setProductoNuevo(newProductoActualizado)
    }

    const handleSubtiposChange = (event, value) => {
        const subtipos = value.map((subtipo) => subtipo)
        const newProducto = { ...productoNuevo, subtipos }
        setProductoNuevo(newProducto)
    }


    const handleImageChange = (event) => {
    const newProducto = { ...productoNuevo, portada: event.target.files[0] }
    setProductoNuevo(newProducto)
    };

    const handleClick = async (event) => {
        try {
            await dispatch(createProducto(productoNuevo)).then(
                advanceStep()
            )
            console.log('dispatch completed successfully');
        } catch (exception) {
            console.error('Error during dispatch:', exception);
        }
    };



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
                NUEVO PRODUCTO
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
                    background: 'white',
                    padding: '0.5rem',

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
                <Box
                    sx={{
                        display: 'flex',
                        alignContent: 'center',
                        width: '100%',
                        flexDirection: 'row',
                        marginBottom: '1.5rem',

                        '@media (max-width:1024px)': {
                            flexDirection: 'column',
                        },
                    }}
                >
                    <TextField
                        sx={{
                            marginBottom: '1rem',
                            width: '50%',
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
                            width: '50%',
                            paddingLeft: '0.5rem',

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
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                        flexDirection: 'row',
                        marginBottom: '1.5rem',

                        '@media (max-width:1024px)': {
                            flexDirection: 'column',
                        },
                    }}
                >
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={marcasList}
                        getOptionLabel={(option) => option}
                        isOptionEqualToValue={(option, value) =>
                            option === value
                        }
                        sx={{
                            width: '30%',
                            '@media (max-width:1024px)': {
                                width: '100%',
                                marginBottom: '1rem',
                            },
                        }}
                        freeSolo
                        autoSelect
                        onChange={handleMarcaChange}
                        renderInput={(params) => (
                            <TextField {...params} label="Marca" />
                        )}
                    />
                    <TextField
                        sx={{
                            width: '30%',
                            '@media (max-width:1024px)': {
                                width: '100%',
                                marginBottom: '1rem',
                            },
                        }}
                        id="outlined-textarea"
                        label="Modelo"
                        placeholder="Placeholder"
                        multiline
                        onChange={handleModeloChange}
                    />

                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={origenesList}
                        getOptionLabel={(option) => option}
                        isOptionEqualToValue={(option, value) =>
                            option === value
                        }
                        sx={{
                            width: '30%',
                            '@media (max-width:1024px)': {
                                width: '100%',
                            },
                        }}
                        freeSolo
                        autoSelect
                        onChange={handleOrigenChange}
                        renderInput={(params) => (
                            <TextField {...params} label="Origen" />
                        )}
                    />
                </Box>

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
                        value={productoNuevo.moneda}
                        onChange={handleMonedaChange}
                        autoWidth
                        label="Moneda"
                    >
                        {monedasList.map((moneda) => (
                            <MenuItem value={moneda.id} key={moneda.id}>
                                {moneda.name}{' '}
                            </MenuItem>
                        ))}
                    </Select>
                    <TextField
                    style={{
                        WebkitAppearance:'none',
                    }}
                        sx={{ marginLeft: '1rem',  }}
                        id="standard-number"
                        label="Precio"
                        type="number"
                        onChange={handlePrecioChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="standard"
                    />
                </Box>
                <Box
                
                    sx={{
                        display: 'flex',
                        alignContent: 'center',
                        width: '100%',
                        flexDirection: 'row',
                        '@media (max-width:1024px)': {
                            flexDirection: 'column',
                        },
                    }}
                >
                    <Autocomplete
                        sx={{
                            width: '50%',
                            paddingRight: '0.5rem',

                            '@media (max-width:1024px)': {
                                width: '100%',
                                marginBottom: '1.5rem',
                            },
                        }}
                        multiple
                        id="tags-outlined"
                        options={tiposList}
                        getOptionLabel={(option) => option.name}
                        isOptionEqualToValue={(option, value) =>
                            option.id === value.id
                        }
                        filterSelectedOptions
                        onChange={handleTiposChange}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Tipos"
                                placeholder="Tipos"
                            />
                        )}
                    />
                    <Autocomplete
                        sx={{
                            width: '50%',
                            paddingLeft: '0.5rem',

                            '@media (max-width:1024px)': {
                                paddingLeft: '0',

                                width: '100%',
                            },
                        }}
                        multiple
                        id="tags-outlined"
                        options={filterdedSubtipos}
                        getOptionLabel={(option) => option.name}
                        isOptionEqualToValue={(option, value) =>
                            option.id === value.id
                        }
                        value={productoNuevo.subtipos}
                        filterSelectedOptions
                        onChange={handleSubtiposChange}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Subtipos"
                                placeholder="Tipos"
                            />
                        )}
                    />
                </Box>
            </Box>

            <Box sx={{ display: 'flex', flex: '1' }}>
                <Button
                    onClick={handleClick}
                    sx={{
                        paddingBottom: '0.75rem',
                        marginLeft: '2rem',
                        paddingLeft: '2rem',
                        marginBottom: '2rem',

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
        </div>
    )
}

export { NuevoProducto }
