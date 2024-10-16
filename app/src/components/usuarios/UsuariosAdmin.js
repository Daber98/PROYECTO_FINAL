import React, { useState, useEffect } from "react";
import NavbarAdmin from "../administrador/NavbarAdmin";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import axios from 'axios';

const UsuariosAdmin = () => {
    const [users, setUsers] = useState([]);
    const [editingUserId, setEditingUserId] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [editedData, setEditedData] = useState({});
    const [selectedRole, setSelectedRole] = useState("cliente"); // Default to "cliente"

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/usuario`)
            .then(response => {
                setUsers(response.data.Users);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []);

    const handleEditUser = (userId) => {
        setEditingUserId(userId);
        const selectedUser = users.find(user => user.id_user === userId);
        setEditedData(selectedUser);
        setSelectedRole(selectedUser.Rol || "cliente"); // Default to "cliente" if no role is provided
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleSaveEdit = () => {
        axios.put(`${process.env.REACT_APP_API_URL}/usuario/${editingUserId}`, { ...editedData, Rol: selectedRole })
            .then(response => {
                if (response.data.Status === "Success") {
                    setUsers(users.map(user => 
                        user.id_user === editingUserId 
                            ? { ...user, ...editedData, Rol: selectedRole } 
                            : user
                    ));
                    setOpenDialog(false);
                }
            })
            .catch(error => {
                console.error('Error updating user:', error);
            });
    };

    const handleDeleteUser = (userId) => {
        axios.delete(`${process.env.REACT_APP_API_URL}/usuario/${userId}`)
            .then(response => {
                if (response.data.Status === "Success") {
                    setUsers(users.filter(user => user.id_user !== userId));
                }
            })
            .catch(error => {
                console.error('Error deleting user:', error);
            });
    };

    const handleRoleChange = (event) => {
        setSelectedRole(event.target.value);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedData({ ...editedData, [name]: value });
    };

    return (
        <div style={{ backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}>
            <NavbarAdmin />
            <div style={{ margin: 30 }}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ fontWeight: "bold" }}>ID</TableCell>
                                <TableCell style={{ fontWeight: "bold" }}>Nombre</TableCell>
                                <TableCell style={{ fontWeight: "bold" }}>Apellido</TableCell>
                                <TableCell style={{ fontWeight: "bold" }}>Email</TableCell>
                                <TableCell style={{ fontWeight: "bold" }}>Teléfono</TableCell>
                                <TableCell style={{ fontWeight: "bold" }}>Rol</TableCell>
                                <TableCell style={{ fontWeight: "bold" }}>Acción</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map(user => (
                                <TableRow key={user.id_user}>
                                    <TableCell>{user.id_user}</TableCell>
                                    <TableCell>{user.first_name}</TableCell>
                                    <TableCell>{user.last_name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.phone}</TableCell>
                                    <TableCell>{user.Rol === "cliente" ? "Cliente" : "administrador"}</TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="primary" onClick={() => handleEditUser(user.id_user)}>Editar</Button>
                                        <Button variant="contained" color="secondary" onClick={() => handleDeleteUser(user.id_user)}>Eliminar</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Editar Usuario</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Nombre"
                        type="text"
                        name="first_name"
                        fullWidth
                        value={editedData.first_name || ""}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        id="last_name"
                        label="Apellido"
                        type="text"
                        name="last_name"
                        fullWidth
                        value={editedData.last_name || ""}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        id="email"
                        label="Email"
                        type="email"
                        name="email"
                        fullWidth
                        value={editedData.email || ""}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        id="phone"
                        label="Teléfono"
                        type="text"
                        name="phone"
                        fullWidth
                        value={editedData.phone || ""}
                        onChange={handleInputChange}
                    />
                    <FormControl component="fieldset">
                        <RadioGroup
                            aria-label="Rol"
                            name="Rol"
                            value={selectedRole}
                            onChange={handleRoleChange}
                        >
                            <FormControlLabel value="cliente" control={<Radio />} label="Cliente" />
                            <FormControlLabel value="administrador" control={<Radio />} label="Administrador" />
                        </RadioGroup>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancelar</Button>
                    <Button onClick={handleSaveEdit}>Guardar</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default UsuariosAdmin;
