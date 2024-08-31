const express = require("express");
const cors = require("cors");
require("dotenv").config();
require('./database/mysqlConnection'); // Modulo de conexión a MySQL
 
const app = express();
 
// Middlewares
app.use(express.json());
app.use(cors());

// Controllers import
const hashController = require('./controllers/auth/hashController');
const loginController = require('./controllers/auth/loginController');
const registerController = require('./controllers/auth/registerController');
const reservacionController = require('./controllers/reservacionController'); // reservacionController
const habitacionController = require('./controllers/habitacionController'); // habitacionController
const usuarioController = require('./controllers/usuarioController'); // usuariosController

// Routes Login and Register
app.get('/hash', hashController.hashPassword);
app.post('/login', loginController.login);
app.post('/register', registerController.register);

// Routes 'habitaciones'
app.get('/habitacion', habitacionController.getAllRooms);
app.get('/habitacion/:id', habitacionController.getRoomById);
app.post('/habitacion', habitacionController.createRoom);
app.put('/habitacion/:id', habitacionController.updateRoom);
app.delete('/habitacion/:id', habitacionController.deleteRoom);

// Routes 'reservaciones'
app.get('/reservacion', reservacionController.getAllReservations);
app.get('/reservacion/:id', reservacionController.getReservationById);
app.get('/reservacion/habitacion/:id', reservacionController.getRoomByIdReservation);
app.get('/reservacion/user/:id', reservacionController.getReservationsByUserId);
app.post('/reservacion', reservacionController.createReservation);
app.put('/reservacion/:id', reservacionController.updateReservation);
app.delete('/reservacion/:id', reservacionController.deleteReservation);

// Routes 'usuarios'
app.get('/usuario', usuarioController.getAllUsers);
app.get('/usuario/:id', usuarioController.getUserById);
app.put('/usuario/:id', usuarioController.updateUser);
app.delete('/usuario/:id', usuarioController.deleteUser);

const PORT = process.env.BACKEND_PORT
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})