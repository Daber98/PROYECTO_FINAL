import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Box, Card, CardContent, CardActions, CardMedia, Typography, Grid } from '@mui/material';
import Navbar from '../NavbarDashboard';
import NavbarHome from '../home/Navbar';
import fondo from "../../image/fondo.jpg"; // Importa la imagen de fondo
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

// Importar la variable de entorno
const API_URL = process.env.REACT_APP_API_URL;

const Habitaciones = () => {
    const [habitaciones, setHabitaciones] = useState([]);
    const [habitacionSeleccionada, setHabitacionSeleccionada] = useState("Habitaciones simples");
    const [habitacionesCargadas, setHabitacionesCargadas] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para saber si el usuario está logueado

    useEffect(() => {
        // Verificar si el usuario está logueado
        const token = localStorage.getItem('Token');
        if (token) {
            setIsLoggedIn(true); // Usuario logueado
        }

        // Realizar la solicitud para obtener las habitaciones del servidor
        fetch(`${API_URL}/habitacion`) // Usar la variable de entorno
            .then(response => response.json())
            .then(data => {
                setHabitaciones(data.Rooms); // El nombre del campo debe coincidir con el que devuelve el servidor
                setHabitacionesCargadas(true);
            })
            .catch(error => {
                console.error('Error fetching habitaciones:', error);
            });
    }, []);

    const generarTarjetas = (tipo) => {
        return habitacionesCargadas && habitaciones
            .filter(habitacion => habitacion.tipo === tipo)
            .map((habitacion, index) => (
                <Grid item xs={4} key={`${tipo}-${index}`}>
                    <Tarjeta habitacion={habitacion} />
                </Grid>
            ));
    };

    return (
        <div style={{ backgroundImage: `url(${fondo})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh', backgroundRepeat: 'no-repeat' }}>
            {isLoggedIn ? <Navbar /> : <NavbarHome />} {/* Renderiza Navbar o NavbarHome */}
            <h1 style={{ textAlign: 'center' }}>Reserva tu Habitación</h1>
            <Box display="flex" justifyContent="center" mb={2}>
                <Autocomplete
                    disablePortal
                    id="combo-box-habitacion"
                    value={habitacionSeleccionada}
                    style={{ marginBottom: 10 }}
                    onChange={(event, newValue) => {
                        setHabitacionSeleccionada(newValue);
                    }}
                    options={["Habitación simple", "Habitación doble", "Habitación triple"]}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Tipo de habitación" />}
                />
            </Box>
            <Box display="flex" justifyContent="center">
                <Grid container spacing={2} style={{ justifyContent: 'flex-start', marginRight: 0 }}>
                    {generarTarjetas(habitacionSeleccionada)}
                </Grid>
            </Box>
        </div>
    );
}

const Tarjeta = ({ habitacion }) => {
    // Asegúrate de que habitacion.imagen contenga solo el Public ID
    const imagenUrl = habitacion.imagen; // Asegúrate de que esto esté bien

    return (
        <Card sx={{ width: 425, marginBottom: '30px', marginLeft: 5, marginRight: 5 }}>
            <CardMedia
                component="img"
                image={imagenUrl} 
                alt="Imagen de la habitación"
                onError={(e) => { e.target.src = "URL_DE_IMAGEN_DE_RESPALDO"; }} // Reemplaza esto con una imagen de respaldo en caso de error
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Habitación {habitacion.id_habitacio}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {habitacion.tipo}
                </Typography>
            </CardContent>
            <CardActions>
            <Button
                component={Link} // Cambiamos "a" a Link de React Router
                to={`/Reservaciones?habitacion=${habitacion.id_habitacio}`} // Usamos "to" en lugar de "href"
                size="small"
                color="primary"
            >
                Ver más
            </Button>
            </CardActions>
        </Card>
    );
};

export default Habitaciones;
