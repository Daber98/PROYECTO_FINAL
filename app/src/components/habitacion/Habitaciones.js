import React, { useState, useEffect } from "react";
import { Box, Card, CardContent, CardActions, CardMedia, Typography, Button, Grid } from '@mui/material';
import Navbar from '../NavbarDashboard';
import fondo from "../../image/fondo.jpg"; // Importa la imagen de fondo
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const Habitaciones = () => {
    const [habitaciones, setHabitaciones] = useState([]);
    const [habitacionSeleccionada, setHabitacionSeleccionada] = useState("Habitaciones simples");
    const [habitacionesCargadas, setHabitacionesCargadas] = useState(false);

    useEffect(() => {
        // Realizar la solicitud para obtener las habitaciones del servidor
        fetch('http://localhost:3001/habitacion')
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
            <Navbar />
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
    // Construye la URL completa de la imagen
    const imagenUrl = `http://localhost:3001/${habitacion.imagen}`;

    return (
        <Card sx={{ width: 425, marginBottom: '30px', marginLeft: 5, marginRight: 5 }}>
            <CardMedia
                component="img"
                image={imagenUrl} 
                alt="Imagen de la habitación"
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
                    component="a"
                    href={`/Reservaciones?habitacion=${habitacion.id_habitacio}`}
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
