import {
    Autocomplete,
    Box,
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import productosService from '../../services/productos'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import { useDispatch } from 'react-redux'
import { createCaracteristicas } from '../../reducers/productosReducer'
import { useNavigate } from 'react-router-dom'





const CaracteristicasForm = ({NuevoProducto, advanceStep}) => {
    const [caracteristicasList, setCaracteristicasList] = useState([])
    const [selectedCaracteristicas, setSelectedCaracteristicas] = useState({
        name: '',
        descripcion: '',
        valor: '',
    })
    const [newCaracteristicas, setNewCaracteristicas] = useState([])

const dispatch = useDispatch()


    useEffect(() => {
        productosService
            .getCaracteristicas()
            .then((response) => setCaracteristicasList(response))
    }, [])

    const handleCaracteristicaChange = (event, value) => {

        if (value === null) {
            const newValor = {
                ...selectedCaracteristicas,
                name: '',
                descripcion: '',
            }
            setSelectedCaracteristicas(newValor)
        } else {
            const newValor = {
                ...selectedCaracteristicas,
                name: value.name,
                descripcion: value.descripcion,
                id: value.id,
            }
            setSelectedCaracteristicas(newValor)
        }
    }

    const handleValorChange = (event, value) => {
        if (value === null) {
            const newValor = { ...selectedCaracteristicas, valor: '' }
            setSelectedCaracteristicas(newValor)
        } else {
            const newValor = { ...selectedCaracteristicas, valor: value }
            setSelectedCaracteristicas(newValor)
        }
    }


    const selectCaracteristica = async (event) => {
        setNewCaracteristicas(
            newCaracteristicas.concat(selectedCaracteristicas)
        )
        const Caracteristicas = caracteristicasList.filter((caracteristica) => {
            return caracteristica.name !== selectedCaracteristicas.name
        })
        setCaracteristicasList(Caracteristicas)
        setSelectedCaracteristicas({
            name: '',
            descripcion: '',
            valor: '',

        })
    }

    const removeSelectedCaracteristica = async ({caracteristica}) => {
        setCaracteristicasList(caracteristicasList.concat(caracteristica))
        const Caracteristicas = newCaracteristicas.filter((newCaracteristica) => {
            return newCaracteristica.name !== caracteristica.name
        })
        setNewCaracteristicas(Caracteristicas)
    }

    const navigate = useNavigate()


    const AgregarCaracteristicas = async (event) => {
    try {
            await dispatch(createCaracteristicas(NuevoProducto.id, newCaracteristicas))
            .then(advanceStep())
        } catch (exception) {
            console.log('dio error')
        }
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
                CARACTERISTICAS
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
                <Box sx={{ margin: 1 }}>
                    <Table size="small" aria-label="purchases">
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    sx={{
                                        width: '25%',
                                        '@media (max-width:1024px)': {
                                            marginBottom: '1rem',
                                        },
                                    }}
                                >
                                    Caracteristica
                                </TableCell>
                                <TableCell
                                    sx={{
                                        width: '35%',
                                        '@media (max-width:1024px)': {
                                            marginBottom: '1rem',
                                        },
                                    }}
                                >
                                    Descripcion
                                </TableCell>
                                <TableCell
                                    sx={{
                                        width: '25%',
                                        '@media (max-width:1024px)': {
                                            marginBottom: '1rem',
                                        },
                                    }}
                                >
                                    Valor
                                </TableCell>
                                <TableCell
                                    sx={{
                                        width: '15%',
                                        '@media (max-width:1024px)': {
                                            marginBottom: '1rem',
                                        },
                                    }}
                                >
                                    Accion
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>
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
                                        value={selectedCaracteristicas}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Caracteristica"
                                            />
                                        )}
                                    />
                                </TableCell>
                                <TableCell>
                                    {selectedCaracteristicas &&
                                        selectedCaracteristicas.descripcion}
                                </TableCell>
                                <TableCell>
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        options={[]}
                                        getOptionLabel={(option) => option}
                                        isOptionEqualToValue={(option, value) =>
                                            option === value
                                        }
                                        sx={{
                                            '@media (max-width:1024px)': {
                                                marginBottom: '1rem',
                                            },
                                        }}
                                        disabled={!selectedCaracteristicas}
                                        freeSolo
                                        autoSelect
                                        onInputChange={handleValorChange}
                                        value={selectedCaracteristicas.valor}
                                        renderInput={(params) => (
                                            <TextField {...params} />
                                        )}
                                    />
                                </TableCell>

                                <TableCell>
                                    <Button
                                        onClick={selectCaracteristica}
                                        disabled={
                                            caracteristicasList.length === 0 ||
                                            selectedCaracteristicas.name ===
                                                '' ||
                                            selectedCaracteristicas.valor === ''
                                        }
                                        sx={{
                                            borderRadius: '35px',
                                            fontSize: '1    rem',
                                            backgroundColor: 'primary.main',
                                            '@media (max-width:600px)': {
                                                paddingLeft: '1rem',
                                                paddingRight: '1rem',
                                            },
                                        }}
                                        variant="contained"
                                    >
                                        AGREGAR
                                    </Button>
                                </TableCell>
                            </TableRow>
                            {newCaracteristicas &&
                                newCaracteristicas.map((caracteristica) => {
                                    return (
                                        <TableRow key={caracteristica.id}>
                                            <TableCell>
                                                {caracteristica.name}
                                            </TableCell>
                                            <TableCell>
                                                {caracteristica.descripcion}
                                            </TableCell>
                                            <TableCell>
                                                {caracteristica.valor}
                                            </TableCell>
                                            <TableCell>
                                                <IconButton onClick={() => removeSelectedCaracteristica({ caracteristica })} aria-label="delete">
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                        </TableBody>
                    </Table>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', flex: '1' }}>
                <Button
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
                    onClick={AgregarCaracteristicas}
                    variant="contained"
                >
                    AGREGAR CARACTERISTICAS
                </Button>
            </Box>
        </div>
    )
}

export { CaracteristicasForm }
