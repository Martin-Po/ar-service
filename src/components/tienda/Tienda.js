import { Box, Button, Card, CardActionArea, CardMedia, Checkbox, Divider, Grid, IconButton, List, ListItem, ListItemText, Paper, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useEffect, useState } from 'react';
import productosService from '../../services/productos'


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
                marginBottom:'1rem'
                
            }}
        >
        <CombosList/>
        <ProductosList/>
        <Vendidos/>


        </div>
    )
}

const ProductosList = () => {
    const productos = useSelector((state) => state.productos)
    const [filteredMarcas, setFilteredMarcas] = useState([])

    const FilterMarcas = (marca) => {
        if(filteredMarcas.includes(marca))
        {
            setFilteredMarcas(filteredMarcas.filter(elemento => elemento !== marca))
        }
        else
        {
            setFilteredMarcas(filteredMarcas.concat(marca))
        }
    }

    const FiltrarProductos = ({productos, filteredMarcas}) => {
        let ProductosFiltrados = productos

        if(filteredMarcas.length > 0)
        {
            ProductosFiltrados = productos.filter(producto => filteredMarcas.includes(producto.marca) )
        }

        return ProductosFiltrados
    }


    return (
        <Box sx={{borderRadius:'0.5rem', marginTop:'2rem', paddingBottom:'2rem'
        }}>
        <Typography
            sx={{
                margin: '1rem',

                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                fontWeight: 'bold',
                fontSize: '2rem',
                '@media (max-width:600px)': { fontSize: '1.25rem' },
            }}
        >
            Todos nuestros productos son originales y están en excelente estado
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
            }}
        >
             <Grid
                item
                xs={12}
                md={2}
                sx={{height:'100%',
                    display:'flex',
                }}
            >
                    <Filtros FilterMarcas={FilterMarcas} filteredMarcas={filteredMarcas}/>
            </Grid>
            
            <Grid
                item
                xs={12}
                md={10}
                sx={{
                    display:'flex',
                    flexDirection:'column',
                    alignItems: 'center',
                }}
            >
                <Grid
            container spacing={1}>
            {productos && FiltrarProductos({productos, filteredMarcas}).filter(producto => producto.estado_activo.estado === 'Disponible').map((producto) => (
                <Producto producto={producto} />
            ))}

            </Grid>

            </Grid>
        </Grid>
        </Box>
    )
}

const Filtros = ({FilterMarcas, filteredMarcas}) => {
    useEffect(() => {
        productosService.getMarcas().then((response) => setMarcasList(response))
        
    }, [])

    const [marcasList, setMarcasList] = useState([])

    return (
        <Box sx={{display:'flex', flexGrow:1, borderColor:'black',borderWidth:'1rem'}}>

        <Typography sx={{fontWeight:'bold'}}>
            MARCAS
            <List dense={true}>
                {marcasList.map(marca => {return(

                <ListItem sx={{paddingTop:'0', margin:'0'}}>
                <Checkbox sx={{padding:'0', margin:'0'}} size="small" 
                  edge="start"
                  checked={filteredMarcas.includes(marca)}
                  onClick={() =>FilterMarcas(marca)}
                />
                  <ListItemText
                    primary={marca}
                  />
                </ListItem>
                )}
            )
                }
            </List>
        </Typography>
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
                    display:'flex',
                    flexDirection:'column',
                    alignItems: 'center',
                }}
            >
               <Paper sx={{display:'flex',  flexDirection:'column', alignItems:'center', paddingTop:'1rem', paddingBottom:'0.5rem',width: '13rem', flexGrow:1}}>

                <Box sx={{display:'flex', flexDirection:'column', width: '11rem', aling:'center'  }}>
                    <img
                        style={{ width: '11rem', height: '11rem' }}
                        src={producto.portada}
                        alt="nosotros"
                    />
                   
                </Box>
                <Box sx={{display:'flex',  flexDirection:'column', width: '11rem', flexGrow:1}}>
                <Typography sx={{display:'flex', alignItems:'flex-start', textAlign:'left', fontSize:'1.15rem', fontWeight:'600'}}>
                        {producto.moneda.name + " " + producto.precio}
                </Typography>

                <Typography sx={{display:'flex', alignItems:'flex-start', fontSize:'0.85rem', marginTop:'0.25rem', marginBottom:'0.25rem'}}>
                    {producto.name}
                </Typography>
                </Box>
               </Paper>
            </Grid>
        </>
    )
}

const CombosList = () => {
    const combos = useSelector((state) => state.combos)

    return(
        <Box sx={{backgroundColor:'white', borderRadius:'0.5rem', marginTop:'2rem', paddingBottom:'2rem'
        }}>
        <Typography
            sx={{
                margin: '1rem',

                display: 'flex',
                justifyContent: 'left',
                width: '100%',
                fontSize: '1rem',
                '@media (max-width:600px)': { fontSize: '1.25rem' },
            }}
        >
            Mirá los combos que tenemos armados para vos
        </Typography>
        <Grid
            container
            sx={{
                display: 'flex',                    
                alignContent: 'center',
                width: '1280px',
                height: 'fit-content',
                '@media (max-width: 1300px)': {
                    width: '992px',
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
            }}
        >
            {combos.map((combo) => (
                <Combo combo={combo} />
            ))}
        </Grid>
        </Box>
    )

}

const Combo = ({ combo }) => {
    const [selectedProducto, setSelectedProducto] = useState(0)

    const advanceImage = () => {
        if(selectedProducto === combo.productos.length-1)
        {
            setSelectedProducto(0)
        }
        else
        {
            setSelectedProducto((prevImage) => prevImage + 1)
        }
    }

    const backwardsImage = () => {
        if(selectedProducto === combo.productos.length-1)
        {
            setSelectedProducto((prevImage) => prevImage - 1)
        }
        else
        {
            setSelectedProducto(combo.productos.length-1)
        }
    }


    return (
        <>
            <Grid
                item
                xs={3}
                sx={{
                    display:'flex',
                    flexDirection:'column',
                    alignItems: 'center',
                }}
            >
                <Box sx={{display:'flex', flexDirection:'column', width: '11rem', aling:'center'  }}>
                    <img
                        style={{ width: '11rem', height: '11rem' }}
                        src={combo.productos[selectedProducto].portada}
                        alt="nosotros"
                    />
                    <Box sx={{marginTop:'-6.5rem', display:'flex', justifyContent:'space-between'}}>
                    <IconButton onClick={backwardsImage} sx={{ marginLeft:'0.5rem',  width: '2rem', height: '2rem' , color:'white', backgroundColor: 'rgba(0, 0, 0, 0.5)',}} >
                        <ArrowBackIosIcon/>
                    </IconButton>
                    <IconButton onClick={advanceImage} sx={{ marginRight:'0.5rem',  width: '2rem', height: '2rem', color:'white', backgroundColor: 'rgba(0, 0, 0, 0.5)',}} >
                        <ArrowForwardIosIcon/>
                    </IconButton>
                    </Box>
                    <Box
                        sx={{marginTop:'2rem',
                            color: 'white',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
                            padding: '0.5rem',
                        }}
                    >
                        {combo.productos[selectedProducto].name.length < 21 ? combo.productos[selectedProducto].name : combo.productos[selectedProducto].name.substring(0, 19) + '...'}
                    </Box>
                </Box>
                <Box sx={{display:'flex', flexDirection:'column', width: '11rem'}}>
                <Typography sx={{fontSize:'0.85rem', marginTop:'0.25rem', marginBottom:'0.25rem'}}>
                    {combo.name}
                </Typography>
                <Typography sx={{flexGrow: 1,textAlign:'left', fontSize:'1.15rem', fontWeight:'600'}}>
                        {combo.moneda.name + " " + combo.precio}
                </Typography>

                </Box>
            </Grid>
        </>
    )
}

const Vendidos = () => {
    const productos = useSelector((state) => state.productos)
    const [selectedPage, setSelectedPage] = useState(0)


    const moveForward = () => 
    {
        setSelectedPage(prev => prev + 1)
    }

    const moveBackwards = () => 
        {
            setSelectedPage(prev => prev - 1)
        }

    return(
        <Box sx={{backgroundColor:'white', borderRadius:'0.5rem', marginTop:'2rem', paddingBottom:'2rem', overflowX:'hidden'
        }}>
        <Typography
            sx={{
                margin: '1rem',

                display: 'flex',
                justifyContent: 'left',
                width: '100%',
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
                justifyContent:'space-evenly',
                flexWrap:'nowrap',
                width: '1280px',
                height: 'fit-content',
                gap:2,
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
            {productos && productos.filter(producto => producto.estado_activo.estado !== 'Disponible').map((producto) => (
                <ProductoVendido producto={producto} selectedPage= {selectedPage}/>
            ))}
            
        </Grid>
        <Box sx={{display:'flex', flexGrow:1, justifyContent:'space-between' }}>
        <IconButton  onClick={() => moveBackwards()} sx={{  width: '2rem', height: '2rem', color:'white', marginRight:'1rem',marginTop:'-10rem',backgroundColor: 'rgba(0, 0, 0, 0.5)',}} >
                        <ArrowBackIosIcon/>
                    </IconButton>
        <IconButton  onClick={() => moveForward()} sx={{   width: '2rem', height: '2rem', color:'white', marginRight:'1rem',marginTop:'-10rem',backgroundColor: 'rgba(0, 0, 0, 0.5)',}} >
                        <ArrowForwardIosIcon/>
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
                    display:'flex',
                    flexDirection:'column',
                    alignItems: 'center',
                    transform: `translateX(${-100 * selectedPage}%)`,
            transition: 'transform 0.5s ease-in-out', // Apply transition
                }}
            >
               <Paper sx={{display:'flex',  flexDirection:'column', alignItems:'center', paddingTop:'1rem', paddingBottom:'0.5rem',width: '15rem', flexGrow:1}}>

                <Box sx={{display:'flex', flexDirection:'column', width: '11rem', aling:'center'  }}>
                    <img
                        style={{ width: '11rem', height: '11rem' }}
                        src={producto.portada}
                        alt="nosotros"
                    />
                   
                </Box>
                <Box sx={{display:'flex',  flexDirection:'column', width: '11rem', flexGrow:1}}>
                <Typography sx={{display:'flex', alignItems:'flex-start', textAlign:'left', fontSize:'1.15rem', fontWeight:'600'}}>
                        {producto.moneda.name + " " + producto.precio}
                </Typography>

                <Typography sx={{display:'flex', alignItems:'flex-start', fontSize:'0.85rem', marginTop:'0.25rem', marginBottom:'0.25rem'}}>
                    {producto.name}
                </Typography>
                </Box>
               </Paper>
            </Grid>
        </>
    )
}


export { Tienda }
