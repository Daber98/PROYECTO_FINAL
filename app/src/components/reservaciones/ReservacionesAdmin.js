import React, { useState, useEffect } from "react";
import NavbarAdmin from "../administrador/NavbarAdmin";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import axios from 'axios';

const ReservacionesAdmin = () => {
    const [reservaciones, setReservaciones] = useState([]);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openCreateDialog, setOpenCreateDialog] = useState(false);
    const [editingReservacionId, setEditingReservacionId] = useState(null);
    const [editedReservacionData, setEditedReservacionData] = useState({});
    const [newReservacionData, setNewReservacionData] = useState({
        id_usuario: "",
        id_habitacion: "",
        FechaEntrada: "",
        FechaSalida: "",
        Estado: "",
        EstadoPago: "",
        Monto: "",
        telefono: ""
    });

    useEffect(() => {
        getAllReservations();
    }, []);

    const getAllReservations = () => {
        axios.get('http://localhost:3001/reservacion')
            .then(response => {
                setReservaciones(response.data.Reservations);
            })
            .catch(error => {
                console.error('Error fetching reservaciones:', error);
            });
    };

    const handleEditReservacion = (reservacionId) => {
        setEditingReservacionId(reservacionId);
        const selectedReservacion = reservaciones.find(reservacion => reservacion.id_reservacio  === reservacionId);
        setEditedReservacionData(selectedReservacion);
        setOpenEditDialog(true);
        console.log(selectedReservacion)
    };

    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
    };

    const handleSaveEdit = () => {
        axios.put(`http://localhost:3001/reservacion/${editingReservacionId}`, editedReservacionData)
            .then(response => {
                if (response.data.Status === "Success") {
                    setReservaciones(reservaciones.map(reservacion => reservacion.id_reservacio === editingReservacionId ? { ...reservacion, ...editedReservacionData } : reservacion));
                    setOpenEditDialog(false);
                }
                console.log(response)
            })
            .catch(error => {
                console.error('Error updating reservacion:', error);
            });
    };

    const handleDeleteReservacion = (reservacionId) => {
        axios.delete(`http://localhost:3001/reservacion/${reservacionId}`)
            .then(response => {
                if (response.data.Status === "Success") {
                    setReservaciones(reservaciones.filter(reservacion => reservacion.id_reservacio !== reservacionId));
                }
            })
            .catch(error => {
                console.error('Error deleting reservacion:', error);
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedReservacionData({ ...editedReservacionData, [name]: value });
    };

    const handleNewReservacionChange = (e) => {
        const { name, value } = e.target;
        setNewReservacionData({ ...newReservacionData, [name]: value });
    };

    const handleCreateReservacion = () => {
        axios.post('http://localhost:3001/reservacion', newReservacionData)
            .then(response => {
                if (response.data.Status === "Success") {
                    setReservaciones([...reservaciones, { id_reservacio: response.data.InsertId, ...newReservacionData }]);
                    setNewReservacionData({
                        id_usuario: "",
                        id_habitacion: "",
                        FechaEntrada: "",
                        FechaSalida: "",
                        Estado: "",
                        EstadoPago: "",
                        Monto: "",
                        telefono: ""
                    });
                    setOpenCreateDialog(false);
                }
            })
            .catch(error => {
                console.error('Error creating reservacion:', error);
            });
    };

    return (
        <div style={{ backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}>
            <NavbarAdmin />
            <div style={{ margin: 30 }}>
                <Button variant="contained" color="primary" onClick={() => setOpenCreateDialog(true)} style={{ marginLeft: 15, marginBottom: 15 }}>Crear Reservación</Button>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ fontWeight: "bold" }}>ID</TableCell>
                                <TableCell style={{ fontWeight: "bold" }}>ID Usuario</TableCell>
                                <TableCell style={{ fontWeight: "bold" }}>ID Habitación</TableCell>
                                <TableCell style={{ fontWeight: "bold" }}>Fecha de Entrada</TableCell>
                                <TableCell style={{ fontWeight: "bold" }}>Fecha de Salida</TableCell>
                                <TableCell style={{ fontWeight: "bold" }}>Estado</TableCell>
                                <TableCell style={{ fontWeight: "bold" }}>Estado de Pago</TableCell>
                                <TableCell style={{ fontWeight: "bold" }}>Monto</TableCell>
                                <TableCell style={{ fontWeight: "bold" }}>Telefono</TableCell>
                                <TableCell style={{ fontWeight: "bold" }}>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {reservaciones.map(reservacion => (
                                <TableRow key={reservacion.id_reservacio}>
                                    <TableCell>{reservacion.id_reservacio}</TableCell>
                                    <TableCell>{reservacion.id_usuario}</TableCell>
                                    <TableCell>{reservacion.id_habitacion}</TableCell>
                                    <TableCell>{reservacion.FechaEntrada}</TableCell>
                                    <TableCell>{reservacion.FechaSalida}</TableCell>
                                    <TableCell>{reservacion.Estado}</TableCell>
                                    <TableCell>{reservacion.EstadoPago}</TableCell>
                                    <TableCell>{reservacion.Monto}</TableCell>
                                    <TableCell>{reservacion.telefono}</TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="primary" onClick={() => handleEditReservacion(reservacion.id_reservacio)}>Editar</Button>
                                        <Button variant="contained" color="secondary" onClick={() => handleDeleteReservacion(reservacion.id_reservacio)}>Eliminar</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
                <DialogTitle>Editar Reservación</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="id_usuario"
                        label="ID Usuario"
                        type="text"
                        name="id_usuario"
                        fullWidth
                        value={editedReservacionData.id_usuario || ""}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        id="id_habitacion"
                        label="ID Habitación"
                        type="text"
                        name="id_habitacion"
                        fullWidth
                        value={editedReservacionData.id_habitacion || ""}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        id="FechaEntrada"
                        label="Fecha de Entrada"
                        type="text"
                        name="FechaEntrada"
                        fullWidth
                        value={editedReservacionData.FechaEntrada || ""}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        id="FechaSalida"
                        label="Fecha de Salida"
                        type="text"
                        name="FechaSalida"
                        fullWidth
                        value={editedReservacionData.FechaSalida || ""}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        id="Estado"
                        label="Estado"
                        type="text"
                        name="Estado"
                        fullWidth
                        value={editedReservacionData.Estado || ""}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        id="EstadoPago"
                        label="Estado de Pago"
                        type="number"
                        name="EstadoPago"
                        fullWidth
                        value={editedReservacionData.EstadoPago || ""}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        id="Monto"
                        label="Monto"
                        type="text"
                        name="Monto"
                        fullWidth
                        value={editedReservacionData.Monto || ""}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        id="telefono"
                        label="Telefono"
                        type="text"
                        name="Telefono"
                        fullWidth
                        value={editedReservacionData.telefono || ""}
                        onChange={handleNewReservacionChange} 
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditDialog}>Cancelar</Button>
                    <Button onClick={handleSaveEdit}>Guardar</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openCreateDialog} onClose={() => setOpenCreateDialog(false)}>
                <DialogTitle>Crear Reservación</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="id_usuario"
                        label="ID Usuario"
                        type="text"
                        name="id_usuario"
                        fullWidth
                        value={newReservacionData.id_usuario}
                        onChange={handleNewReservacionChange}
                    />
                    <TextField
                        margin="dense"
                        id="id_habitacion"
                        label="ID Habitación"
                        type="text"
                        name="id_habitacion"
                        fullWidth
                        value={newReservacionData.id_habitacion}
                        onChange={handleNewReservacionChange}
                    />
                    <TextField
                        margin="dense"
                        id="FechaEntrada"
                        label="Fecha de Entrada"
                        type="text"
                        name="FechaEntrada"
                        fullWidth
                        value={newReservacionData.FechaEntrada}
                        onChange={handleNewReservacionChange}
                    />
                    <TextField
                        margin="dense"
                        id="FechaSalida"
                        label="Fecha de Salida"
                        type="text"
                        name="FechaSalida"
                        fullWidth
                        value={newReservacionData.FechaSalida}
                        onChange={handleNewReservacionChange}
                    />
                    <TextField
                        margin="dense"
                        id="Estado"
                        label="Estado"
                        type="text"
                        name="Estado"
                        fullWidth
                        value={newReservacionData.Estado}
                        onChange={handleNewReservacionChange}
                    />
                    <TextField
                        margin="dense"
                        id="EstadoPago"
                        label="Estado de Pago"
                        type="text"
                        name="EstadoPago"
                        fullWidth
                        value={newReservacionData.EstadoPago}
                        onChange={handleNewReservacionChange}
                    />
                    <TextField
                        margin="dense"
                        id="Monto"
                        label="Monto"
                        type="text"
                        name="Monto"
                        fullWidth
                        value={newReservacionData.Monto}
                        onChange={handleNewReservacionChange}
                    />
                    <TextField
                        margin="dense"
                        id="Telefono"
                        label="Telefono"
                        type="text"
                        name="Telefono"
                        fullWidth
                        value={newReservacionData.telefono}
                        onChange={handleNewReservacionChange} 
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenCreateDialog(false)}>Cancelar</Button>
                    <Button onClick={handleCreateReservacion}>Guardar</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ReservacionesAdmin;
