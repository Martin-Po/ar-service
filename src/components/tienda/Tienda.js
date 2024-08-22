import {Box, Checkbox, Grid, IconButton, List, ListItem, ListItemText, Paper, Typography} from '@mui/material'
import { useSelector } from 'react-redux'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { useEffect, useState } from 'react'
import productosService from '../../services/productos'
import { Link } from 'react-router-dom'
import FilterListIcon from '@mui/icons-material/FilterList'
import Drawer from '@mui/material/Drawer'

const Tienda = () => {
    return (
        <div
            style={{
                width: '100vw',
                maxWidth: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
            }}
        >
            <CombosList />
            <ProductosList />
            <Vendidos />
        </div>
    )
}

const ProductosList = () => {
    const productos = useSelector((state) => state.productos)
    const [filteredMarcas, setFilteredMarcas] = useState([])
    const [filteredOrigenes, setFilteredOrigenes] = useState([])

    const FilterMarcas = (marca) => {
        if (filteredMarcas.includes(marca)) {
            setFilteredMarcas(
                filteredMarcas.filter((elemento) => elemento !== marca)
            )
        } else {
            setFilteredMarcas(filteredMarcas.concat(marca))
        }
    }

    const FilterOrigenes = (origen) => {
        if (filteredOrigenes.includes(origen)) {
            setFilteredOrigenes(
                filteredOrigenes.filter((elemento) => elemento !== origen)
            )
        } else {
            setFilteredOrigenes(filteredOrigenes.concat(origen))
        }
    }

    const FiltrarProductos = ({
        productos,
        filteredMarcas,
        filteredOrigenes,
    }) => {
        return productos.filter((producto) => {
            const marcaMatch =
                filteredMarcas.length === 0 ||
                filteredMarcas.includes(producto.marca)
            const origenMatch =
                filteredOrigenes.length === 0 ||
                filteredOrigenes.includes(producto.origen)
            return marcaMatch && origenMatch
        })
    }

    const [open, setOpen] = useState(false)

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen)
    }

    return (
        <Box
            sx={{
                borderRadius: '0.5rem',
                marginTop: '2rem',
                paddingBottom: '2rem',
                
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
                Todos nuestros productos son originales y están en excelente
                estado
            </Typography>
            <Grid
                container
                sx={{
                    display: 'flex',
                    alignContent: 'center',
                    width: '1280px',
                    height: 'fit-content',
                    '@media (max-width: 1300px)': {
                        width: '1100px',
                        paddingLeft: '1.5rem',
                        paddingRight: '1.5rem',
                        direction: 'column',
                        display: 'flex',
                        flexDirection: 'column',
                        marginBottom: '20px',
                    },
                    '@media (max-width:1024px)': {
                        width: '100%',
                        alignItems: 'baseline',
                    },
                    '@media (max-width:768px)': {
                        paddingLeft: '0',
                        paddingRight: '0',
                    },
                }}
            >
                <Grid
                    item
                    xs={12}
                    md={2}
                    sx={{
                        height: '100%',
                        display: 'flex',
                        '@media (max-width:1300px)': {
                            display: 'none',
                        },
                    }}
                >
                    <Filtros
                        FilterMarcas={FilterMarcas}
                        filteredMarcas={filteredMarcas}
                        FilterOrigenes={FilterOrigenes}
                        filteredOrigenes={filteredOrigenes}
                    />
                </Grid>

                <Box sx={{ display: 'none',
                            alignSelf:'flex-end',
                            marginBottom:'1rem',
                        '@media (max-width:1300px)': {
                            display: 'flex',
                        },}}>
                    <IconButton onClick={toggleDrawer(true)}>
                        <FilterListIcon/>
                    </IconButton>
                    <Drawer anchor = 'top' open={open} onClose={toggleDrawer(false)}>
                        
                        <Filtros
                            FilterMarcas={FilterMarcas}
                            filteredMarcas={filteredMarcas}
                            FilterOrigenes={FilterOrigenes}
                            filteredOrigenes={filteredOrigenes}
                        />
                    </Drawer>
                </Box>

                <Grid
                    item
                    xs={12}
                    md={10}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%',

                    }}
                >
                    <Grid container spacing={1}>
                        {productos &&
                            FiltrarProductos({
                                productos,
                                filteredMarcas,
                                filteredOrigenes,
                            })
                                .filter(
                                    (producto) =>
                                        producto.estado_activo.estado ===
                                        'Disponible'
                                )
                                .map((producto) => (
                                    <Producto key={producto.id} producto={producto} />
                                ))}
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}

const Filtros = ({
    FilterMarcas,
    filteredMarcas,
    FilterOrigenes,
    filteredOrigenes,
}) => {
    useEffect(() => {
        productosService
            .getMarcasDisponibles()
            .then((response) => setMarcasList(response))
        productosService
            .getOrigenesDisponibles()
            .then((response) => setOrigenesList(response))
    }, [])

    const [marcasList, setMarcasList] = useState([])
    const [origenesList, setOrigenesList] = useState([])

    return (
        <Box
            sx={{
                display: 'flex',
                flexGrow: 1,
                flexDirection: 'column',
                borderColor: 'black',
                borderWidth: '1rem',
                '@media (max-width:1300px)': {
                    flexDirection: 'row',                    
                },
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexGrow: 1,
                    flexDirection: 'column',
                    borderColor: 'black',
                    borderWidth: '1rem',
                    '@media (max-width:1300px)': {
                        padding:'1rem'
                    }
                }}
            >
                <Typography sx={{ fontWeight: 'bold' }}>MARCAS</Typography>
                <List dense={true}>
                    {marcasList.map((marca) => {
                        return (
                            <ListItem key={marca}   sx={{ paddingTop: '0', margin: '0' }}>
                                <Checkbox
                                    sx={{ padding: '0', margin: '0' }}
                                    size="small"
                                    edge="start"
                                    checked={filteredMarcas.includes(marca)}
                                    onClick={() => FilterMarcas(marca)}
                                />
                                <ListItemText primary={marca} />
                            </ListItem>
                        )
                    })}
                </List>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexGrow: 1,
                    flexDirection: 'column',
                    borderColor: 'black',
                    borderWidth: '1rem',
                    '@media (max-width:1300px)': {
                        padding:'1rem'
                    }
                }}
            >
                <Typography sx={{ fontWeight: 'bold' }}>ORIGENES</Typography>
                <List dense={true}>
                    {origenesList.map((origen) => {
                        return (
                            <ListItem key={origen} sx={{ paddingTop: '0', margin: '0' }}>
                                <Checkbox
                                    sx={{ padding: '0', margin: '0' }}
                                    size="small"
                                    edge="start"
                                    checked={filteredOrigenes.includes(origen)}
                                    onClick={() => FilterOrigenes(origen)}
                                />
                                <ListItemText primary={origen} />
                            </ListItem>
                        )
                    })}
                </List>
            </Box>
        </Box>
    )
}

const Producto = ({ producto }) => {
    return (
        <>
            <Grid
                item
                xs={12}
                sm={4}
                lg={3}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Paper
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        paddingTop: '1rem',
                        paddingBottom: '0.5rem',
                        width: '13rem',
                        flexGrow: 1,
                        '@media (max-width:768px)': {
                            flexDirection: 'row',
                            width: '100%',
                        },
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            aling: 'center',
                            '@media (max-width:768px)': {
                                padding: '0.5rem',
                            },
                        }}
                    >
                        <img
                            style={{ width: '11rem', height: '11rem' }}
                            src={producto.portada}
                            alt="nosotros"
                        />
                    </Box>
                    <Link
                        to={`/tienda/${producto.id}`}
                        style={{ textDecoration: 'none', color: 'black' }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: '11rem',
                                flexGrow: 1,
                                '@media (max-width:768px)': {
                                    alignSelf: 'flex-start',
                                },
                            }}
                        >
                            <Typography
                                sx={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    textAlign: 'left',
                                    fontSize: '1.15rem',
                                    fontWeight: '600',
                                    '@media (max-width:768px)': {
                                        fontSize: '1.50rem',
                                        fontWeight: '700',
                                    },
                                }}
                            >
                                {producto.moneda.name +
                                    ' ' +
                                    Math.round(producto.precio * 100) / 100}
                            </Typography>

                            <Typography
                                sx={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    fontSize: '0.85rem',
                                    marginTop: '0.25rem',
                                    marginBottom: '0.25rem',
                                    overflow: 'hidden',
                                    WebkitBoxOrient: 'vertical',
                                    textOverflow: 'ellipsis',
                                    WebkitLineClamp: '2',
                                    paddingRight: '0.25rem',
                                    '@media (max-width:768px)': {
                                        fontSize: '1.15rem',
                                    },
                                }}
                            >
                                {producto.name}
                            </Typography>
                            <Typography
                                sx={{
                                    display: 'none',

                                    '@media (max-width:768px)': {
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        display: '-webkit-box',
                                        WebkitLineClamp: '4',
                                        WebkitBoxOrient: 'vertical',
                                        fontSize: '0.85rem',
                                    },
                                }}
                            >
                                {producto.descripcion}
                            </Typography>
                        </Box>
                    </Link>
                </Paper>
            </Grid>
        </>
    )
}

const CombosList = () => {
    const combos = useSelector((state) => state.combos)

    return (
        <Box
            sx={{
                backgroundColor: 'white',
                borderRadius: '0.5rem',
                marginTop: '2rem',
                paddingBottom: '2rem',
                '@media (max-width:1024px)': {
                    width: '100%',
                    alignItems: 'baseline',
                },
            }}
        >
            <Typography
                sx={{
                    margin: '1rem',
                    flexGrow: 1,

                    display: 'flex',
                    justifyContent: 'left',
                    fontSize: '1rem',
                }}
            >
                Mirá los combos que tenemos armados para vos
            </Typography>
            <Grid
                container
                sx={{
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    width: '1280px',
                    height: 'fit-content',
                    paddingLeft: '1rem',
                    gap: 2,
                    '@media (max-width: 1300px)': {
                        width: '992px',
                        paddingLeft: '1.5rem',
                        paddingRight: '1.5rem',
                        display: 'flex',
                        marginBottom: '20px',
                    },
                    '@media (max-width:1024px)': {
                        width: '100%',
                        alignItems: 'baseline',
                    },
                }}
            >
                {combos.map((combo) => (
                    <Combo key={combo.id} combo={combo} />
                ))}
            </Grid>
        </Box>
    )
}

const Combo = ({ combo }) => {
    const [selectedProducto, setSelectedProducto] = useState(0)

    const advanceImage = () => {
        if (selectedProducto === combo.productos.length - 1) {
            setSelectedProducto(0)
        } else {
            setSelectedProducto((prevImage) => prevImage + 1)
        }
    }

    const backwardsImage = () => {
        if (selectedProducto === combo.productos.length - 1) {
            setSelectedProducto((prevImage) => prevImage - 1)
        } else {
            setSelectedProducto(combo.productos.length - 1)
        }
    }

    return (
        <>
            <Grid
                item
                xs={4}
                sm={3}
                lg={2}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '11rem',
                        aling: 'center',
                        '@media (max-width:768px)': {
                            width: '8rem',
                            alignItems: 'baseline',
                        },
                    }}
                >
                    {combo.productos.map((producto, index) => {
                        return (
                            <img
                            key={producto.id}
                                style={{
                                    width: '100%',
                                    aspectRatio: 1 / 1,
                                    display:
                                        index === selectedProducto
                                            ? 'flex'
                                            : 'none',
                                }}
                                src={producto.portada}
                                alt= {"portada " + producto.name }
                            />
                        )
                    })}
                    <Box
                        sx={{
                            marginTop: '-6.5rem',
                            display: 'flex',
                            justifyContent: 'space-between',
                            '@media (max-width:768px)': {
                                marginTop: '-5rem',
                                placeSelf: 'flex-end',
                                width: '100%',
                            },
                        }}
                    >
                        <IconButton
                            onClick={backwardsImage}
                            sx={{
                                marginLeft: '0.5rem',
                                width: '2rem',
                                height: '2rem',
                                color: 'white',

                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                '@media (max-width:768px)': {},
                            }}
                        >
                            <ArrowBackIosIcon sx={{ marginLeft: '0.5rem' }} />
                        </IconButton>
                        <IconButton
                            onClick={advanceImage}
                            sx={{
                                marginRight: '0.5rem',
                                width: '2rem',
                                height: '2rem',
                                color: 'white',
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            }}
                        >
                            <ArrowForwardIosIcon />
                        </IconButton>
                    </Box>
                    <Box
                        sx={{
                            marginTop: '2rem',
                            color: 'white',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
                            padding: '0.5rem',
                            '@media (max-width:768px)': {
                                placeSelf: 'flex-end',
                                textWrap: 'nowrap',
                                fontSize: '0.75rem',
                                width: '100%',
                                textOverflow: 'ellipsis',
                            },
                        }}
                    >
                        {combo.productos[selectedProducto].name.length < 21
                            ? combo.productos[selectedProducto].name
                            : combo.productos[selectedProducto].name.substring(
                                  0,
                                  17
                              ) + '...'}
                    </Box>
                </Box>
                <Link
                    to={`/tienda/combo/${combo.id}`}
                    style={{ textDecoration: 'none', color: 'black' }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '11rem',
                            '@media (max-width:768px)': {
                                width: '8rem',
                                alignItems: 'baseline',
                            },
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: '0.85rem',
                                marginTop: '0.25rem',
                                marginBottom: '0.25rem',
                            }}
                        >
                            {combo.name}
                        </Typography>
                        <Typography
                            sx={{
                                flexGrow: 1,
                                textAlign: 'left',
                                fontSize: '1.15rem',
                                fontWeight: '600',
                            }}
                        >
                            {combo.moneda.name +
                                ' ' +
                                Math.round(combo.precio * 100) / 100}
                        </Typography>
                    </Box>
                </Link>
            </Grid>
        </>
    )
}

const Vendidos = () => {
    const productos = useSelector((state) => state.productos)
    const [selectedPage, setSelectedPage] = useState(0)

    const moveForward = () => {
        const productos_vendidos = productos.filter(
            (producto) => producto.estado_activo.estado !== 'Disponible'
        ).length
        setSelectedPage((prev) =>
            productos_vendidos - 5 > prev ? prev + 1 : prev
        )
    }

    const moveBackwards = () => {
        setSelectedPage((prev) => (prev === 0 ? prev : prev - 1))
    }

    return (
        <Box
            sx={{
                backgroundColor: 'white',
                borderRadius: '0.5rem',
                marginTop: '2rem',
                paddingBottom: '2rem',
                overflowX: 'hidden',
                '@media (max-width:1024px)': {
                    width: '100%',
                    alignItems: 'baseline',
                },
            }}
        >
            <Typography
                sx={{
                    margin: '1rem',

                    display: 'flex',
                    justifyContent: 'left',
                    fontSize: '1rem',
                    '@media (max-width:600px)': { fontSize: '1.25rem' },
                }}
            >
                Estos son algunos productos que pasaron por nuestra tienda
            </Typography>
            <Grid
                container
                sx={{
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    flexWrap: 'nowrap',
                    width: '1280px',
                    height: 'fit-content',
                    paddingLeft: '1rem',
                    gap: 2,

                    '@media (max-width: 1300px)': {
                        width: '992px',
                        paddingLeft: '1.5rem',
                        paddingRight: '1.5rem',
                        display: 'flex',
                        marginBottom: '20px',
                    },
                    '@media (max-width:1024px)': {
                        width: '100%',
                        alignItems: 'baseline',
                        '@media (max-width:768px)': {
                            overflowX: 'scroll',
                        },
                    },
                }}
            >
                {productos &&
                    productos
                        .filter(
                            (producto) =>
                                producto.estado_activo.estado !== 'Disponible'
                        )
                        .map((producto) => (
                            <ProductoVendido key={producto.id}
                                producto={producto}
                                selectedPage={selectedPage}
                            />
                        ))}
            </Grid>
            <Box
                sx={{
                    display: 'flex',
                    flexGrow: 1,
                    justifyContent: 'space-between',
                    '@media (max-width:768px)': {
                        display: 'none',
                    },
                }}
            >
                <IconButton
                    onClick={() => moveBackwards()}
                    sx={{
                        width: '2rem',
                        height: '2rem',
                        color: 'white',
                        marginLeft: '1rem',
                        marginTop: '-10rem',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    }}
                >
                    <ArrowBackIosIcon sx={{ marginLeft: '0.5rem' }} />
                </IconButton>
                <IconButton
                    onClick={() => moveForward()}
                    sx={{
                        width: '2rem',
                        height: '2rem',
                        color: 'white',
                        marginRight: '1rem',
                        marginTop: '-10rem',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    }}
                >
                    <ArrowForwardIosIcon />
                </IconButton>
            </Box>
        </Box>
    )
}

const ProductoVendido = ({ producto, selectedPage }) => {
    return (
        <>
            <Grid
                item
                xs={12}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    transform: `translateX(${-16 * selectedPage}rem)`,
                    transition: 'transform 0.5s ease-in-out', // Apply transition
                }}
            >
                <Paper
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        paddingTop: '1rem',
                        paddingBottom: '0.5rem',
                        width: '15rem',
                        flexGrow: 1,
                        '@media (max-width:1300px)': {
                            width: '14.15rem',
                        },
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '11rem',
                            aling: 'center',
                        }}
                    >
                        <img
                            style={{ width: '11rem', height: '11rem' }}
                            src={producto.portada}
                            alt="nosotros"
                        />
                    </Box>
                    <Link
                        to={`/tienda/${producto.id}`}
                        style={{ textDecoration: 'none', color: 'black' }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: '11rem',
                                flexGrow: 1,
                            }}
                        >
                            <Typography
                                sx={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    fontSize: '0.85rem',
                                    marginTop: '0.25rem',
                                    marginBottom: '0.25rem',
                                }}
                            >
                                {producto.name}
                            </Typography>
                        </Box>
                    </Link>
                </Paper>
            </Grid>
        </>
    )
}

export { Tienda }
