import {
    Box,
    Button,
    Grid,
    List,
    ListItem,
    Paper,
    Typography,
} from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

const Producto = () => {
    const { id } = useParams()
    const productos = useSelector((state) => state.productos)
    const producto = productos.find((producto) => producto.id === id)

    return (
        <div
            style={{
                width: '100vw',
                maxWidth: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '1rem',
                marginBottom: '1rem',
            }}
        >
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
                        display: 'flex',
                        marginBottom: '20px',
                    },
                    '@media (max-width:1024px)': {
                        direction: 'column',
                        flexDirection: 'column',
                        width: '100%',
                        alignItems: 'baseline',
                    },
                    '@media (max-width:768px)': {
                        paddingLeft: '0',
                        paddingRight: '0',
                    },
                }}
            >
                {producto && (
                    <>
                        <ProductoImages producto={producto} />
                        <Detalles producto={producto} />

                        <Caracteristicas producto={producto} />
                        <Similares producto={producto} />
                    </>
                )}
            </Grid>
        </div>
    )
}

const ProductoImages = ({ producto }) => {
    const [selectedImage, setSelectedImage] = useState(
        producto ? producto.portada : null
    )

    useEffect(() => {
        setSelectedImage(producto ? producto.portada : null)
    }, [producto])

    const portada = producto?.portada || ''
    const imagenesProducto =
        producto?.imagenes?.length > 0
            ? [portada, ...producto.imagenes]
            : [portada]

    const elegirImagen = (imagen) => {
        setSelectedImage(imagen)
    }

    return (
        <Grid
            item
            xs={12}
            md={7}
            sx={{
                backgroundColor: 'background.paper',
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                marginTop: '1rem',
                padding: '1rem',
                alignItems: 'center',
                background: 'white',
                borderColor: '#e8e8e8',
                borderStyle: 'solid', // Agregar el estilo del borde
                borderWidth: 1, // Definir el ancho del borde
                '@media (max-width:768px)': {
                    flexDirection: 'column-reverse',
                },
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '15%',
                    marginRight: '0.5rem',
                    height: '-webkit-fill-available',

                    '@media (max-width:768px)': {
                        width: '100%',
                        flexDirection: 'row',
                        flexWrap: 'nowrap',
                        overflow: 'hidden',
                        overflowX: 'scroll',
                    },
                }}
            >
                {imagenesProducto.map((imagen, index) => {
                    return (
                        <Miniatura
                            key={imagen + index}
                            imagen={imagen}
                            index={index}
                            elegirImagen={elegirImagen}
                            selectedImage={selectedImage}
                        />
                    )
                })}
            </Box>

            {imagenesProducto.map((imagen, index) => {
                return (
                    <Box
                        key={imagen + index}
                        sx={{
                            display: selectedImage === imagen ? 'flex' : 'none',
                            flexDirection: 'column',
                            aling: 'center',
                            background: 'white',
                            overflow: 'hidden',
                            height: '50vh',
                            justifyContent: 'center',
                            width: '100%',
                            flexWrap: 'wrap',

                            '@media (max-width:768px)': {
                                padding: '0.5rem',
                            },
                        }}
                    >
                        <img
                            style={{
                                maxWidth: '100%',
                                maxHeight: '100%',
                                aspectRatio: 'auto',
                            }}
                            src={imagen}
                            alt="Imagen Seleccionada"
                        />
                    </Box>
                )
            })}
        </Grid>
    )
}

const Miniatura = ({ imagen, elegirImagen, index, selectedImage }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                aling: 'center',
                alignItems: 'center',
                background: 'white',
                borderColor:
                    selectedImage === imagen ? 'red' : 'background.paper',
                borderStyle: 'solid', // Agregar el estilo del borde
                borderWidth: 2, // Definir el ancho del borde
                borderRadius: 1,
                marginTop: '0.25rem',
                marginBottom: '0.25rem',

                '@media (max-width:768px)': {
                    padding: '0.5rem',
                },
            }}
            onClick={() => elegirImagen(imagen)}
        >
            <img
                style={{
                    width: '4rem',
                    height: '2.75rem',
                }}
                src={imagen}
                alt={index > 0 ? 'Imagen detalle ' + index : 'Portada'}
            />
        </Box>
    )
}

const Detalles = ({ producto }) => {
    return (
        <Grid
            item
            xs={12}
            md={5}
            sx={{
                backgroundColor: 'background.paper',
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                marginTop: '1rem',
                padding: '1rem',
                alignItems: 'center',
                background: 'white',
                borderColor: '#e8e8e8',
                borderStyle: 'solid', // Agregar el estilo del borde
                borderWidth: 1, // Definir el ancho del borde
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '-webkit-fill-available',
                }}
            >
                <Typography sx={{ fontWeight: 'bold', fontSize: '2.15rem' }}>
                    {' '}
                    {producto.name}
                </Typography>
                <Typography sx={{ fontSize: '1.15rem' }}>
                    {producto.marca} | {producto.modelo}
                </Typography>
                <Typography sx={{ fontSize: '1.15rem' }}>
                    Origen: {producto.origen}
                </Typography>
                {producto.estado_activo.estado === 'Disponible' ? (
                    <Typography sx={{ fontWeight: 'bold', fontSize: '2rem' }}>
                        {producto.moneda.name} {producto.precio}
                    </Typography>
                ) : (
                    <Typography
                        sx={{
                            fontWeight: 'bold',
                            color: 'red',
                            fontSize: '3rem',
                        }}
                    >
                        vendido
                    </Typography>
                )}
                <Button
                    sx={{
                        marginTop: '1.5rem',
                        paddingTop: '0.75rem',
                        paddingBottom: '0.75rem',
                        paddingLeft: '2rem',
                        paddingRight: '2rem',
                        borderRadius: '35px',
                        fontSize: '2.125rem',
                        backgroundColor: 'primary.main',
                        width: 'fit-content',
                        '@media (max-width:600px)': {
                            paddingLeft: '2rem',
                            paddingRight: '1rem',
                        },
                    }}
                    variant="contained"
                >
                    <Typography
                        sx={{
                            color: 'secondary.contrastText',
                            fontWeight: 'bold',
                            fontSize: '1.15rem',

                            '@media (max-width:600px)': { fontSize: '0.85rem' },
                        }}
                    >
                        {' '}
                        {producto.estado_activo.estado === 'Disponible'
                            ? '¡Lo quiero!'
                            : 'Consultá por disponibilidad'}
                    </Typography>
                </Button>
            </Box>
        </Grid>
    )
}

const Caracteristicas = ({ producto }) => {
    const [selectedTab, setSelectedTab] = useState(1)

    const ChangeSelectedTab = (tab) => {
        setSelectedTab(tab)
    }

    return (
        <Grid
            item
            xs={12}
            sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                marginTop: '1rem',
                padding: '1rem',
                paddingTop: '0',
                alignItems: 'center',
                background: 'white',
                borderColor: '#e8e8e8',
                borderStyle: 'solid', // Agregar el estilo del borde
                borderWidth: 1, // Definir el ancho del borde
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    placeItems: 'flex-start',
                    width: '100%',
                }}
            >
                <Box
                    onClick={() => ChangeSelectedTab(1)}
                    sx={{
                        userSelect: 'none',
                        width: 'fit-content',
                        border: 2,
                        fontWeight: selectedTab === 1 && 'bold',
                        padding: '0.25rem',
                        borderBottom: 'transparent',
                        borderLeft: 'transparent',
                        borderTopRightRadius: '0.45rem',
                    }}
                >
                    {' '}
                    Detalles{' '}
                </Box>
                {producto.caracteristicas.length > 0 && (
                    <Box
                        onClick={() => ChangeSelectedTab(2)}
                        sx={{
                            userSelect: 'none',
                            width: 'fit-content',
                            border: 2,
                            fontWeight: selectedTab === 2 && 'bold',
                            padding: '0.25rem',
                            borderBottom: 'transparent',
                            borderLeft: 'transparent',
                            borderTopRightRadius: '0.45rem',
                        }}
                    >
                        Caracteristicas
                    </Box>
                )}
            </Box>
            <Box
                sx={{
                    width: '100%',
                    whiteSpace: 'pre-line',
                    display: selectedTab === 1 ? 'flex' : 'none',
                    flexDirection: 'column',
                    height: '-webkit-fill-available',
                }}
            >
                {producto.descripcion}
            </Box>
            <Box
                sx={{
                    width: '100%',
                    display: selectedTab === 2 ? 'flex' : 'none',
                    flexDirection: 'column',
                    height: '-webkit-fill-available',
                }}
            >
                <List>
                    {producto.caracteristicas.map((caracteristica) => {
                        return (
                            <ListItem key={caracteristica.id}>
                                {caracteristica.caracteristica.name}:{' '}
                                {caracteristica.valor}
                            </ListItem>
                        )
                    })}
                </List>
            </Box>
        </Grid>
    )
}

const Similares = ({ producto }) => {
    const productos = useSelector((state) => state.productos)

    let productoSimilares = productos.filter((elemento) =>
        elemento.tipos.some((tipo) => {
            producto.tipos.some((e) => e.name === tipo.name)

            return producto.tipos.some((e) => e.name === tipo.name)
        })
    )

    productoSimilares = productoSimilares.filter(
        (productoSimilar) => productoSimilar.id !== producto.id
    )

    if (productoSimilares.length < 5) {
        let productosPorSubtipos = productos.filter((elemento) =>
            elemento.subtipos.some((subtipo) => {
                return producto.subtipos.some((e) => e.name === subtipo.name)
            })
        )

        productosPorSubtipos = productosPorSubtipos.filter(
            (productoPorSubtipos) => {
                for (let index = 0; index < productoSimilares.length; index++) {
                    const productoSimilar = productoSimilares[index]

                    if (productoPorSubtipos.id === productoSimilar.id) {
                        return false
                    }

                    if (index === productoSimilares.length - 1) {
                        return true
                    }
                }
            }
        )

        productosPorSubtipos = productosPorSubtipos.filter(
            (productoPorSubtipos) => productoPorSubtipos.id !== producto.id
        )

        productoSimilares = productoSimilares.concat(productosPorSubtipos)
    }

    productoSimilares = productoSimilares.sort(
        (elemento) => elemento.estado_activo.estado === 'Disponible'
    )

    if (productoSimilares.length < 5) {
        //Si llega a 5 para relacionar llena con aleatorios

        let productosDisponibles = productos.filter(
            (producto) => producto.estado_activo.estado === 'Disponible'
        )
        productosDisponibles = productosDisponibles.filter(
            (ProductoDisponible) => ProductoDisponible.id !== producto.id
        )
        if (productoSimilares.length > 0) {
            productosDisponibles = productosDisponibles.filter(
                (ProductoDisponible) => {
                    for (
                        let index = 0;
                        index < productoSimilares.length;
                        index++
                    ) {
                        const productoSimilar = productoSimilares[index]

                        if (ProductoDisponible.id === productoSimilar.id) {
                            return false
                        }

                        if (index === productoSimilares.length - 1) {
                            return true
                        }
                    }
                }
            )
        }
        productosDisponibles = productosDisponibles.sort(
            () => Math.random() - 0.5
        )

        const productosAleatorios = productosDisponibles.slice(0, 5)

        productoSimilares = productoSimilares.concat(productosAleatorios)
    }

    productoSimilares = productoSimilares.slice(0, 5)

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
                Estos son otros productos que podrían interesarte
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
                    productoSimilares.map((producto) => (
                        <ProductoSimilar
                            key={producto.id}
                            producto={producto}
                        />
                    ))}
            </Grid>
        </Box>
    )
}

const ProductoSimilar = ({ producto }) => {
    return (
        <>
            <Grid
                item
                xs={12}
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
                                    textAlign: 'left',
                                    fontSize: '1.15rem',
                                    fontWeight: '600',
                                    '@media (max-width:768px)': {
                                        fontSize: '1.50rem',
                                        fontWeight: '700',
                                    },
                                }}
                            >
                                {producto.estado_activo.estado === 'Disponible'
                                    ? producto.moneda.name +
                                      ' ' +
                                      Math.round(producto.precio * 100) / 100
                                    : 'VENDIDO'}
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
                        </Box>
                    </Link>
                </Paper>
            </Grid>
        </>
    )
}

export { Producto }
