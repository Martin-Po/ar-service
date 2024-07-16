import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Autocomplete,
    Box,
    Chip,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    Paper,
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
import tiposService from '../../services/tipos'
import subtiposService from '../../services/subtipos'
import CloseIcon from '@mui/icons-material/Close'
import LinkOffIcon from '@mui/icons-material/LinkOff'
import AddLinkIcon from '@mui/icons-material/AddLink'

const AdminTipos = ({
    tiposList,
    subtiposList,
    eliminarTipo,
    agregarTipo,
    eliminarSubtipo,
    agregarSubtipo,
    quitarTipo,
    vincularTipo,
    vincularSubtipo,
    quitarSubtipo
}) => {
    const [selectedTipo, setSelectedTipo] = useState({ id: '', name: '' })
    const [selectedSubTipo, setSelectedSubTipo] = useState({ id: '', name: '' })

    const selectTipo = (tipo) => {
        setSelectedTipo(tipo)
    }

    const selectSubtipo = (subtipo) => {
        setSelectedSubTipo(subtipo)
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
                        TIPOS Y SUBTIPOS
                    </Typography>
                </Box>
            </AccordionSummary>
            <AccordionDetails>
                <Box
                    sx={{
                        width: '50%',
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
                                    <TableCell align="left">Tipo</TableCell>
                                    <TableCell align="left">Subtipo</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <NuevoTipo agregarTipo={agregarTipo} />
                                    {selectedTipo.id && (
                                        <NuevoSubtipo
                                            agregarSubtipo={agregarSubtipo}
                                            selectedTipo={selectedTipo}
                                        />
                                    )}
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <List>
                                            {tiposList.map((tipo) => {
                                                return (
                                                    <TiposList
                                                        key={tipo.id}
                                                        tipo={tipo}
                                                        selectedTipo={selectedTipo}
                                                        selectTipo={selectTipo}
                                                        eliminarTipo={eliminarTipo}
                                                        selectedSubTipo={selectedSubTipo}
                                                        selectSubtipo={selectSubtipo}
                                                        quitarSubtipo={quitarSubtipo}
                                                    />
                                                )
                                            })}
                                        </List>
                                        {selectedSubTipo.id && (
                                            <AppendTipo
                                                selectedSubTipo={
                                                    selectedSubTipo
                                                }
                                                tiposList={tiposList}
                                                vincularTipo={vincularTipo}
                                                selectSubtipo={selectSubtipo}
                                                subtiposList={subtiposList}
                                            />
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <List>
                                            {subtiposList.map((subtipo) => {
                                                return (
                                                    <SubtiposList
                                                        key={subtipo.id}
                                                        subtipo={subtipo}
                                                        selectedSubtipo={selectedSubTipo}
                                                        selectSubtipo={selectSubtipo}
                                                        eliminarSubtipo={eliminarSubtipo}
                                                        selectedTipo={selectedTipo}
                                                        quitarTipo={quitarTipo}
                                                    />
                                                )
                                            })}
                                        </List>
                                        {selectedTipo.id && (
                                            <AppendSubtipo
                                                selectedTipo={selectedTipo}
                                                tiposList={tiposList}
                                                vincularSubtipo={vincularSubtipo}
                                                selectTipo={selectTipo}
                                                subtiposList={subtiposList}                                                

                                            />
                                        )}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                            <TableBody></TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </AccordionDetails>
        </Accordion>
    )
}

const TiposList = ({
    tipo,
    selectedTipo,
    selectTipo,
    eliminarTipo,
    selectedSubTipo,
    quitarSubtipo,
    selectSubtipo
}) => {
    const [activo, setActivo] = useState(true)

    const deleteTipo = async (tipo) => {
        try {
            await tiposService.remove(tipo.id).then((data) => console.log(data))
            eliminarTipo(tipo)
        } catch (exception) {
            const errorMessage =
                exception.response?.data?.error || 'Error desconocido'
            console.log('dio error', errorMessage)
        } finally {
        }
    }

    const sacarSubtipo = async (subtipo ) => {
        try {
            await tiposService
                .quitarSubtipo(tipo.id, selectedSubTipo)
                .then((data) => console.log(data))
            quitarSubtipo(tipo, selectedSubTipo )
            selectSubtipo({...selectedSubTipo, tipos: selectedSubTipo.tipos.filter(element => element !== tipo.id)})
        } catch (exception) {
            const errorMessage =
                exception.response?.data?.error || 'Error desconocido'
            console.log(errorMessage)
        } finally {
        }
    }

    if (selectedSubTipo.id) {
        return (
            tipo.subtipos.includes(selectedSubTipo.id) && (
                <React.Fragment>
                    <ListItem
                        secondaryAction={
                            selectedSubTipo.tipos.length > 1 && (
                                <IconButton
                                    edge="end"
                                    aria-label="comments"
                                onClick={() => sacarSubtipo(tipo, selectedSubTipo)}

                                >
                                    <LinkOffIcon />
                                </IconButton>
                            )
                        }
                    >
                        <ListItemButton>{tipo.name}</ListItemButton>
                    </ListItem>
                </React.Fragment>
            )
        )
    }

    if (!selectedTipo.id) {
        return (
            <React.Fragment>
                <ListItem
                    secondaryAction={
                        <IconButton
                            edge="end"
                            aria-label="comments"
                            onClick={() => deleteTipo(tipo)}
                        >
                            <DeleteIcon />
                        </IconButton>
                    }
                >
                    <ListItemButton onClick={() => selectTipo(tipo)}>
                        {tipo.name}
                    </ListItemButton>
                </ListItem>
            </React.Fragment>
        )
    } else {
        if (selectedTipo.id === tipo.id) {
            return (
                <React.Fragment>
                    <ListItem
                        secondaryAction={
                            <IconButton
                                edge="end"
                                aria-label="comments"
                                onClick={() => selectTipo('')}
                            >
                                <CloseIcon />
                            </IconButton>
                        }
                    >
                        <Chip label={tipo.name} />
                    </ListItem>
                </React.Fragment>
            )
        }
    }
}

const SubtiposList = ({
    subtipo,
    selectedSubtipo,
    selectSubtipo,
    eliminarSubtipo,
    selectedTipo,
    quitarTipo,
}) => {
    const [activo, setActivo] = useState(true)

    const deleteSubtipo = async (subtipo) => {
        try {
            await subtiposService
                .remove(subtipo.id)
                .then((data) => console.log(data))
            eliminarSubtipo(subtipo)
        } catch (exception) {
            const errorMessage =
                exception.response?.data?.error || 'Error desconocido'
            console.log('dio error', errorMessage)
        } finally {
        }
    }

    const sacarTipo = async (subtipo, tipo) => {
        try {
            await subtiposService
                .quitarTipo(subtipo.id, selectedTipo)
                .then((data) => console.log(data))
            quitarTipo(subtipo, selectedTipo)
        } catch (exception) {
            const errorMessage =
                exception.response?.data?.error || 'Error desconocido'
            console.log(errorMessage)
        } finally {
        }
    }

    if (selectedTipo.id) {
        return (
            subtipo.tipos.includes(selectedTipo.id) && (
                <React.Fragment>
                    <ListItem
                        secondaryAction={
                            <IconButton
                                disabled={subtipo.tipos.length <= 1}
                                edge="end"
                                aria-label="comments"
                                onClick={() => sacarTipo(subtipo, selectedTipo)}
                            >
                                <LinkOffIcon />
                            </IconButton>
                        }
                    >
                        <ListItemButton>{subtipo.name}</ListItemButton>
                    </ListItem>
                </React.Fragment>
            )
        )
    }

    if (!selectedSubtipo.id) {
        return (
            <React.Fragment>
                <ListItem
                    secondaryAction={
                        <IconButton
                            edge="end"
                            aria-label="comments"
                            onClick={() => deleteSubtipo(subtipo)}
                        >
                            <DeleteIcon />
                        </IconButton>
                    }
                >
                    <ListItemButton onClick={() => selectSubtipo(subtipo)}>
                        {subtipo.name}
                    </ListItemButton>
                </ListItem>
            </React.Fragment>
        )
    } else {
        if (selectedSubtipo.id === subtipo.id) {
            return (
                <React.Fragment>
                    <ListItem
                        secondaryAction={
                            <IconButton
                                edge="end"
                                aria-label="comments"
                                onClick={() => selectSubtipo('')}
                            >
                                <CloseIcon />
                            </IconButton>
                        }
                    >
                        <Chip label={subtipo.name} />
                    </ListItem>
                </React.Fragment>
            )
        }
    }
}

const AppendTipo = ({ selectedSubTipo, vincularTipo, tiposList, subtiposList, selectSubtipo }) => {
    const [newTipo, setNewTipo] = useState({
        name: '',
        descripcion: '',
        id: '',
    })

    const AppendTipo = async () => {
        try {
            await subtiposService
                .addTipo(selectedSubTipo.id, newTipo)
                .then((data) => console.log(data))
            vincularTipo(selectedSubTipo, newTipo)
            selectSubtipo({...selectedSubTipo, tipos: selectedSubTipo.tipos.concat(newTipo.id)})
            setNewTipo({
                name: '',
                descripcion: '',
                id: '',
            })
        } catch (exception) {
            const errorMessage =
                exception.response?.data?.error || 'Error desconocido'
            console.log('dio error', exception)
        } finally {
        }
    }

    const handleTipoChange = (event, value) => {
        if (value === null) {
            setNewTipo({
                name: '',
                descripcion: '',
                id: '',
            })
        } else {
            setNewTipo(value)
        }
    }

    const availableTipos = tiposList.filter(
        (tipo) => !selectedSubTipo.tipos.includes(tipo.id)
    )

    return (
        <Box sx={{ display: 'flex' }}>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={availableTipos}
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
                onChange={handleTipoChange}
                renderInput={(params) => (
                    <TextField {...params} label="Vincular tipo" />
                )}
            />
            <IconButton
                disabled={!newTipo.id}
                onClick={() => AppendTipo()}
                aria-label="vincular"
            >
                <AddLinkIcon />
            </IconButton>
        </Box>
    )
}


const AppendSubtipo = ({ selectedTipo, vincularSubtipo, tiposList, subtiposList, selectTipo }) => {
    const [newSubtipo, setNewSubtipo] = useState({
        name: '',
        descripcion: '',
        id: '',
    })

    const AppendSubtipo = async () => {
        try {
            await tiposService.addSubtipo(selectedTipo.id, newSubtipo)
                .then((data) => console.log(data))
                vincularSubtipo(selectedTipo, newSubtipo)
                selectTipo({...selectedTipo, subtipos: selectedTipo.subtipos.concat(newSubtipo.id)})
            setNewSubtipo({
                name: '',
                descripcion: '',
                id: '',
            })
        } catch (exception) {
            const errorMessage =
                exception.response?.data?.error || 'Error desconocido'
            console.log('dio error', exception)
        } finally {
        }
    }

    const handleTipoChange = (event, value) => {
        if (value === null) {
            setNewSubtipo({
                name: '',
                descripcion: '',
                id: '',
            })
        } else {
            setNewSubtipo(value)
        }
    }



    const availableSubtipos = subtiposList.filter(
        (subtipo) => !selectedTipo.subtipos.includes(subtipo.id)
    )

    console.log(availableSubtipos);



    return (
        <Box sx={{ display: 'flex' }}>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={availableSubtipos}
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
                onChange={handleTipoChange}
                renderInput={(params) => (
                    <TextField {...params} label="Vincular subtipo" />
                )}
            />
            <IconButton
                disabled={!newSubtipo.id}
                onClick={() => AppendSubtipo()}
                aria-label="vincular"
            >
                <AddLinkIcon />
            </IconButton>
        </Box>
    )
}

const NuevoTipo = ({ agregarTipo }) => {
    const [activo, setActivo] = useState(true)

    const [newTipo, setNewTipo] = useState('')

    const addTipo = async () => {
        try {
            setActivo(false)
            const TipoNuevo = {
                name: newTipo,
            }
            const createdTipo = await tiposService.create(TipoNuevo)
            agregarTipo(createdTipo)
            setNewTipo('')
        } catch (exception) {
            const errorMessage =
                exception.response?.data?.error || 'Error desconocido'
            console.log('dio error', errorMessage)
        } finally {
            setActivo(true)
        }
    }

    return (
        <React.Fragment>
            <TableCell width={'50%'}>
                <TextField
                    variant="standard"
                    onChange={(e) => setNewTipo(e.target.value)}
                    value={newTipo}
                />
                {newTipo && (
                    <IconButton
                        disabled={!activo}
                        onClick={() => addTipo()}
                        aria-label="delete"
                    >
                        <CheckIcon />
                    </IconButton>
                )}
            </TableCell>
        </React.Fragment>
    )
}

const NuevoSubtipo = ({ agregarSubtipo, selectedTipo }) => {
    const [activo, setActivo] = useState(true)

    const [newSubtipo, setNewSubtipo] = useState('')

    const addTipo = async () => {
        try {
            setActivo(false)
            const SubtipoNuevo = {
                name: newSubtipo,
                tipo: selectedTipo.id,
            }
            const createdSubtipo = await subtiposService.create(SubtipoNuevo)
            agregarSubtipo(createdSubtipo)
            setNewSubtipo('')
        } catch (exception) {
            const errorMessage =
                exception.response?.data?.error || 'Error desconocido'
            console.log('dio error', errorMessage)
        } finally {
            setActivo(true)
        }
    }

    return (
        <React.Fragment>
            <TableCell>
                <TextField
                    variant="standard"
                    onChange={(e) => setNewSubtipo(e.target.value)}
                    value={newSubtipo}
                />
                {newSubtipo && (
                    <IconButton
                        disabled={!activo}
                        onClick={() => addTipo()}
                        aria-label="delete"
                    >
                        <CheckIcon />
                    </IconButton>
                )}
            </TableCell>
        </React.Fragment>
    )
}

export { AdminTipos }
