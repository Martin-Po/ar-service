import { Box, Typography } from '@mui/material'

import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import productosService from '../../services/productos'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Chip from '@mui/material/Chip'

const NuevoProducto = () => {
    const [marcasList, setMarcasList] = useState([])
    const [origenesList, setOrigenesList] = useState([])
    const [monedasList, setMonedasList] = useState([])
    const [tiposList, setTiposList] = useState([])
    const [subtiposList, setSubtiposList] = useState([])
    const [selectedSubtipos, setselectedSubtipos] = useState([])
    const [filterdedSubtipos, setFilteredSubtipos] = useState([])

    const [productoNuevo, setProductoNuevo] = useState({
        // Otros campos del producto...
        moneda: '', // Inicializar moneda como una cadena vacía
        origen: '',
        tipos: [],
        subtipos: [],
    })

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
        setselectedSubtipos(productoNuevo.subtipos);
    }, [productoNuevo.subtipos]);

    const handleMonedaChange = (event) => {
        const newProducto = { ...productoNuevo, moneda: event.target.value }
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

        filterdedSubtiposactualizados.some((subtipo) => subtipo.id === subtipoId.id)
        )
        console.log('subtipos');
        console.log(filterdedSubtipos);
        console.log(subtiposFiltrados);
        console.log(newProducto);
        console.log('subtipos2');


        const newProductoActualizado = {
            ...newProducto,
            subtipos: subtiposFiltrados,
        }


        setProductoNuevo(newProductoActualizado)
    }

    const handleSubtiposChange = (event, value) => {
        console.log('valor')
        console.log(filterdedSubtipos)
        const subtipos = value.map((subtipo) => subtipo)
        const newProducto = { ...productoNuevo, subtipos }


        console.log(value)

        setProductoNuevo(newProducto)
        console.log(newProducto);

        console.log(selectedSubtipos)

        console.log('valor2')
    }

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
                <TextField
                    id="outlined-basic"
                    label="Producto"
                    variant="outlined"
                />
                <TextField
                    id="outlined-textarea"
                    label="Descripcion producto"
                    placeholder="Placeholder"
                    multiline
                />
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={marcasList}
                    sx={{ width: 300 }}
                    freeSolo
                    renderInput={(params) => (
                        <TextField {...params} label="Marca" />
                    )}
                />
                <TextField
                    id="outlined-textarea"
                    label="Modelo"
                    placeholder="Placeholder"
                    multiline
                />
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={origenesList}
                    getOptionLabel={(option) => option}
                    isOptionEqualToValue={(option, value) => option === value}
                    sx={{ width: 300 }}
                    freeSolo
                    onChange={handleOrigenChange}
                    renderInput={(params) => (
                        <TextField {...params} label="Origen" />
                    )}
                />

                <Select
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
                    id="standard-number"
                    label="Number"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="standard"
                />
                <Autocomplete
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
        </div>
    )
}

export { NuevoProducto }
