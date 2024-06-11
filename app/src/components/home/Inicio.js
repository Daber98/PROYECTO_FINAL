import React from "react";
import { Link } from "react-router-dom";
import { Typography, Button, Card, CardContent, CardMedia, Grid, Box } from '@mui/material';

import Navbar from '../home/Navbar.js';

import "../../css/inicio.css";

import image1 from "../../image/Simple21.jpg"; // Importa la imagen de fondo
import image2 from "../../image/Parqueo.jpg";
import image3 from "../../image/Restaurante.jpg";
import fondo from "../../image/fondo.jpg"; 

const Inicio = () => {
    return (
        <div className="inicio-container" style={{ backgroundImage: `url(${fondo})` }}> 
            <Navbar/>
            {/* Ajuste del tamaño del contenedor principal */}
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', padding: '20px' }}>
                <Card sx={{ width: '75%', height: 450, borderRadius: 10 }}>
                    <CardContent>
                        <Typography variant="h1" className="welcome-title" align="center" style={{ fontWeight: 'bold', fontSize: 55, marginTop: 80 }}>¡Bienvenido a HotelConnect - Hotel Villa del Río!</Typography>
                        <Typography variant="body1" style={{ fontSize: 20, color: 'black', marginTop: 75, textAlign: 'center' }}>
                            Sumérgete en el lujo y la comodidad, donde cada detalle está diseñado para hacer de tu estancia una experiencia inolvidable.
                        </Typography>
                        <Box sx={{ textAlign: 'center' }}>
                            <Button variant="contained" style={{ marginTop: 20, borderRadius: 10 }} component={Link} to="/login" className="welcome-button">Iniciar sesión</Button>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
            <Grid container spacing={3} justifyContent="center" style={{ marginBottom: 0 }}>
                {/* Ajuste para mostrar las tarjetas en tres columnas */}
                <Grid item xs={6} sm={3} style={{ margin: '0 10px' }}>
                    <Card style={{ borderRadius: 10, height: 450 }}>
                        <CardMedia
                            component="img"
                            height="300" 
                            image={image1}
                            alt="Imagen 1"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Habitaciones cómodas
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Nuestras habitaciones son tu refugio privado, donde la comodidad es nuestra prioridad número uno.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6} sm={3} style={{ margin: '0 10px' }}>
                    <Card style={{ borderRadius: 10, height: 450 }}>
                        <CardMedia
                            component="img"
                            height="300" 
                            image={image2}
                            alt="Imagen 2"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Amplio parqueo
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Tu comodidad es nuestra prioridad. Aprovecha nuestro conveniente servicio de estacionamiento para una experiencia sin contratiempos.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6} sm={3} style={{ margin: '0 10px' }}>
                    <Card style={{ borderRadius: 10, height: 450 }}>
                        <CardMedia
                            component="img"
                            height="300" 
                            image={image3}
                            alt="Imagen 3"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Restaurante
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Descubre una experiencia gastronómica única en nuestro exclusivo restaurante, donde cada plato es una obra maestra de sabor y frescura.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <Button variant="contained" component={Link} to="/habitacion" style={{ width: 400, marginTop: 15, marginBottom: 20 }}  className="welcome-button">Explora nuestras habitaciones</Button>
            </Box>
        </div>
    );
}

export default Inicio;
