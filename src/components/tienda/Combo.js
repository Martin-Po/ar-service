import {
    Box,
    Button,
    Card,
    CardActionArea,
    CardMedia,
    Checkbox,
    Divider,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Paper,
    Typography,
} from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import productosService from '../../services/productos'


const Combo = () => {
    const { id } = useParams()
    const combos = useSelector((state) => state.combos)
    const combo = combos.find((combo) => combo.id === id)
    

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
                {combo && (
                    <>
                        <ComboImages combo={combo} />
                        <Detalles combo={combo} />

                        <Caracteristicas combo={combo} />
                        <ProductosCombo combo={combo} />
                    </>
                )}
            </Grid>
        </div>
    )
}

const ComboImages = ({ combo }) => {
    const [selectedImage, setSelectedImage] = useState(
        combo ? combo.productos[0].portada : null
    )

    useEffect(() => {
        setSelectedImage(combo ? combo.productos[0].portada : null)
    }, [combo])

    const imagenesCombo =
    combo?.productos?.length > 0
            ? combo.productos.map(producto => producto.portada)
            : null

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
                        overflow:'hidden',
                        overflowX:'scroll'

                    },
                }}
            >
                {imagenesCombo.map((imagen, index) => {
                    return (
                        <Miniatura
                            imagen={imagen}
                            index={index}
                            elegirImagen={elegirImagen}
                            selectedImage={selectedImage}
                        />
                    )
                })}
            </Box>

            {imagenesCombo.map((imagen, index) => {
                return (
                    <Box
                        sx={{
                            display: selectedImage === imagen ? 'flex' : 'none',
                            flexDirection: 'column',
                            aling: 'center',
                            background: 'white',
                            overflow:'hidden',
                            height:'50vh',
                            justifyContent:'center',
                            width:'100%',
                            flexWrap:'wrap',

                            '@media (max-width:768px)': {
                                padding: '0.5rem',
                            },
                        }}
                    >
                        <img
                            style={{
                                maxWidth: '100%',
                                maxHeight: '100%',
                                aspectRatio:'auto'
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

const Detalles = ({ combo }) => {
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
                    {combo.name}
                </Typography>

                
                    <Typography sx={{ fontWeight: 'bold', fontSize: '2rem' }}>
                        {combo.moneda.name} {combo.precio}
                    </Typography>
                
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
                    >Consultá por disponibilidad
                    </Typography>
                </Button>
            </Box>
        </Grid>
    )
}

const Caracteristicas = ({ combo }) => {
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
                    Detalles
                </Box>
                
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
                {combo.descripcion}
            </Box>    
        </Grid>
    )
}

const ProductosCombo = ({ combo }) => {
    const productos = useSelector((state) => state.productos)
    
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
                Podés comprar los productos por separado
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
                {combo &&
                    combo.productos.map((producto) => (
                        <ProductoCombo
                            producto={producto}
                        />
                    ))}
            </Grid>
        </Box>
    )
}

const ProductoCombo = ({ producto }) => {
    const [monedasList, setMonedasList] = useState([])

    useEffect(() => {
               productosService
            .getMonedas()
            .then((response) => setMonedasList(response))
    }, [])

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
                                {monedasList.length > 0
                                    && monedasList.filter(moneda => producto.moneda === moneda.id)[0].name +
                                      ' ' +
                                      Math.round(producto.precio * 100) / 100
                                    }
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

export { Combo }
