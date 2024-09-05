import React, { useState, useEffect } from "react";
import NavbarAdmin from "../administrador/NavbarAdmin";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Select,
    MenuItem,
    FormControl,
    InputLabel
} from '@mui/material';
import axios from 'axios';

const tiposHabitacion = ['Habitación simple', 'Habitación doble', 'Habitación triple'];

const HabitacionesAdmin = () => {
    const [habitaciones, setHabitaciones] = useState([]);
    const [editingHabitacionId, setEditingHabitacionId] = useState(null);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openCreateDialog, setOpenCreateDialog] = useState(false);
    const [editedData, setEditedData] = useState({});
    const [newHabitacionData, setNewHabitacionData] = useState({
        tipo: "",
        precioNoche: "",
        disponible: ""
    });
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3001/habitacion')
            .then(response => {
                setHabitaciones(response.data.Rooms);
            })
            .catch(error => {
                console.error('Error fetching habitaciones:', error);
            });
    }, []);

    const handleEditHabitacion = (habitacionId) => {
        setEditingHabitacionId(habitacionId);
        const selectedHabitacion = habitaciones.find(habitacion => habitacion.id_habitacio === habitacionId);
        setEditedData(selectedHabitacion);
        setOpenEditDialog(true);
    };

    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
    };

    const handleSaveEdit = () => {
        const formData = new FormData();
        formData.append("tipo", editedData.tipo);
        formData.append("precioNoche", editedData.precioNoche);
        formData.append("disponible", editedData.disponible);
        if (selectedImage) {
            formData.append("imagen", selectedImage);
        }
    
        axios.put(`http://localhost:3001/habitacion/${editingHabitacionId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                if (response.data.Status === "Success") {
                    setHabitaciones(habitaciones.map(habitacion => habitacion.id_habitacio === editingHabitacionId ? { ...habitacion, ...editedData } : habitacion));
                    setOpenEditDialog(false);
                    setSelectedImage(null); // Reset selected image after save
                }
            })
            .catch(error => {
                console.error('Error updating habitacion:', error);
            });
    };
    

    const handleDeleteHabitacion = (habitacionId) => {
        fetch(`http://localhost:3001/habitacion/${habitacionId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error deleting habitacion');
            }
            return response.json();
        })
        .then(data => {
            if (data.Status === "Success") {
                setHabitaciones(habitaciones.filter(habitacion => habitacion.id_habitacio !== habitacionId));
            }
        })
        .catch(error => {
            console.error('Error deleting habitacion:', error);
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedData({ ...editedData, [name]: value });
    };

    const handleNewHabitacionChange = (e) => {
        const { name, value } = e.target;
        setNewHabitacionData({ ...newHabitacionData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);
    };

    const handleCreateHabitacion = () => {
        const formData = new FormData();
        formData.append("tipo", newHabitacionData.tipo);
        formData.append("precioNoche", newHabitacionData.precioNoche);
        formData.append("disponible", newHabitacionData.disponible);
        formData.append("imagen", selectedImage);

        axios.post('http://localhost:3001/habitacion', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            if (response.data.Status === "Success") {
                setHabitaciones([...habitaciones, { id_habitacio: response.data.InsertId, ...newHabitacionData }]);
                setNewHabitacionData({ tipo: "", precioNoche: "", disponible: "" });
                setSelectedImage(null);
                setOpenCreateDialog(false);
            }
        })
        .catch(error => {
            console.error('Error creating habitacion:', error);
        });
    };

    return (
        <div style={{ backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}>
            <NavbarAdmin />
            <div style={{ margin: 30 }}>
                <Button variant="contained" color="primary" onClick={() => setOpenCreateDialog(true)} style={{ marginLeft: 15, marginBottom: 15 }}>Crear Habitación</Button>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ fontWeight: "bold" }}>ID</TableCell>
                                <TableCell style={{ fontWeight: "bold" }}>Tipo</TableCell>
                                <TableCell style={{ fontWeight: "bold" }}>Precio/Noche</TableCell>
                                <TableCell style={{ fontWeight: "bold" }}>Disponible</TableCell>
                                <TableCell style={{ fontWeight: "bold" }}>Imagen</TableCell>
                                <TableCell style={{ fontWeight: "bold" }}>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {habitaciones.map(habitacion => (
                                <TableRow key={habitacion.id_habitacio}>
                                    <TableCell>{habitacion.id_habitacio}</TableCell>
                                    <TableCell>{habitacion.tipo}</TableCell>
                                    <TableCell>{habitacion.precioNoche}</TableCell>
                                    <TableCell>{habitacion.disponible}</TableCell>
                                    <TableCell>
                                        <img src={`http://localhost:3001/${habitacion.imagen}`} alt="Habitación" style={{ width: 100, height: 100 }} />
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="primary" onClick={() => handleEditHabitacion(habitacion.id_habitacio)}>Editar</Button>
                                        <Button variant="contained" color="secondary" onClick={() => handleDeleteHabitacion(habitacion.id_habitacio)}>Eliminar</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
                <DialogTitle>Editar Habitacion</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="tipo"
                        label="Tipo"
                        type="text"
                        name="tipo"
                        fullWidth
                        value={editedData.tipo || ""}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        id="precioNoche"
                        label="Precio/Noche"
                        type="text"
                        name="precioNoche"
                        fullWidth
                        value={editedData.precioNoche || ""}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        id="disponible"
                        label="Disponible"
                        type="text"
                        name="disponible"
                        fullWidth
                        value={editedData.disponible || ""}
                        onChange={handleInputChange}
                    />
                    <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="edit-image-upload"
                        type="file"
                        onChange={(e) => setSelectedImage(e.target.files[0])}
                    />
                    <label htmlFor="edit-image-upload">
                        <Button variant="contained" color="primary" component="span">
                            Seleccionar Nueva Imagen
                        </Button>
                    </label>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditDialog}>Cancelar</Button>
                    <Button onClick={handleSaveEdit}>Guardar</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openCreateDialog} onClose={() => setOpenCreateDialog(false)}>
                <DialogTitle>Crear Habitacion</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth margin="dense">
                        <InputLabel id="tipo-label">Tipo</InputLabel>
                        <Select
                            labelId="tipo-label"
                            id="tipo"
                            name="tipo"
                            value={newHabitacionData.tipo}
                            onChange={handleNewHabitacionChange}
                        >
                            {tiposHabitacion.map((tipo, index) => (
                                <MenuItem key={index} value={tipo}>{tipo}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        margin="dense"
                        id="precioNoche"
                        label="Precio/Noche"
                        type="text"
                        name="precioNoche"
                        fullWidth
                        value={newHabitacionData.precioNoche}
                        onChange={handleNewHabitacionChange}
                    />
                    <TextField
                        margin="dense"
                        id="disponible"
                        label="Disponible"
                        type="text"
                        name="disponible"
                        fullWidth
                        value={newHabitacionData.disponible}
                        onChange={handleNewHabitacionChange}
                    />
                    <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="raised-button-file"
                        multiple
                        type="file"
                        onChange={handleImageChange}
                    />
                    <label htmlFor="raised-button-file">
                        <Button variant="contained" color="primary" component="span">
                            Seleccionar Imagen
                        </Button>
                    </label>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenCreateDialog(false)}>Cancelar</Button>
                    <Button onClick={handleCreateHabitacion}>Guardar</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default HabitacionesAdmin;
