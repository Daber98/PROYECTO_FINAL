import React from "react";
import { Link } from "react-router-dom";
import { Typography, Button, Card, CardContent, CardMedia, Grid, Box } from '@mui/material';

import Navbar from '../home/Navbar.js';

import "../../css/inicio.css";

import image1 from "../../image/Simple21.jpg"; // Imagen de la tarjeta existente
import image2 from "../../image/Parqueo.jpg";
import image3 from "../../image/Restaurante.jpg";
import fondo from "../../image/fondo.jpg"; 

import imageSimple from "../../image/simple1.jpg"; // Nueva imagen de habitación simple
import imageDoble from "../../image/doble.jpg"; // Nueva imagen de habitación doble
import imageTriple from "../../image/Triple.jpg"; // Nueva imagen de habitación triple

// Componente para las tarjetas de las nuevas habitaciones
const Tarjeta = ({ titulo, contenido, imagen, precio }) => (
    <Card style={{ width: '30%', margin: '0 15px', borderRadius: 10 }}>
        <CardMedia
            component="img"
            height="300"
            image={imagen}
            alt={titulo}
        />
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                {titulo}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {contenido}
            </Typography>
            <Typography variant="h6" style={{ marginTop: '15px', fontWeight: 'bold' }}>
                {precio}
            </Typography>
        </CardContent>
    </Card>
);

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

            {/* Sección de tarjetas de servicios */}
            <Grid container spacing={3} justifyContent="center" style={{ marginBottom: 50 }}>
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

            {/* Sección de tarjetas de habitaciones */}
            <Box display="flex" justifyContent="center" style={{ marginBottom: 50 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%' }}>
                    <Tarjeta 
                        titulo="Habitación Simple" 
                        contenido="¿Estás buscando un lugar cómodo y tranquilo para tu próxima escapada? ¡No busques más! Nuestra habitación individual es perfecta para viajeros solitarios que desean un espacio íntimo y acogedor para descansar."  
                        imagen={imageSimple} 
                        precio="Precio: Q120/noche"
                    />
                    <Tarjeta 
                        titulo="Habitación Doble" 
                        contenido="¿Estás buscando un lugar cómodo y tranquilo para tu próxima escapada con un amigo o familiar? ¡No busques más! Nuestra habitación con dos camas individuales es perfecta para aquellos que desean un espacio acogedor para descansar y compartir momentos especiales juntos." 
                        imagen={imageDoble} 
                        precio="Precio: Q150/noche"
                    />
                    <Tarjeta 
                        titulo="Habitación Triple" 
                        contenido="¿Estás planeando una escapada con amigos o familiares? ¡Tenemos la solución perfecta para ti! Nuestra habitación con tres camas es ideal para grupos pequeños que buscan comodidad y conveniencia durante su estadía." 
                        imagen={imageTriple} 
                        precio="Precio: Q180/noche"
                    />
                </div>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <Button variant="contained" component={Link} to="/habitacion" style={{ width: 400, marginTop: 15, marginBottom: 20 }} className="welcome-button">Explora nuestras habitaciones</Button>
            </Box>
        </div>
    );
}

export default Inicio;
