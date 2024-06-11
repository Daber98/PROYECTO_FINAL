import React from "react";
import { Link } from "react-router-dom";
import { Box, Card, CardContent, CardActions, CardMedia, Typography, Button } from '@mui/material';
import Navbar from './Navbar'

import image1 from "../../image/simple1.jpg";
import image2 from "../../image/doble.jpg";
import image3 from "../../image/Triple.jpg";
import fondo from "../../image/fondo.jpg"; // Importa la imagen de fondo

const Habitacion = () => {
    return (
        <div style={{ backgroundImage: `url(${fondo})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}>
            <Navbar/>
            <h1 style={{ textAlign: 'center', marginTop: 100, marginBottom: 50, fontWeight: 'bold' }}>Reserva tu habitación</h1>
            <Box display="flex" justifyContent="center">
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%' }}>
                    <Tarjeta titulo="Habitación Simple" contenido="¿Estás buscando un lugar cómodo y tranquilo para tu próxima escapada? ¡No busques más! Nuestra habitación individual es perfecta para viajeros solitarios que desean un espacio íntimo y acogedor para descansar."  imagen={image1}/>
                    <Tarjeta titulo="Habitación Doble" contenido="¿Estás buscando un lugar cómodo y tranquilo para tu próxima escapada con un amigo o familiar? ¡No busques más! Nuestra habitación con dos camas individuales es perfecta para aquellos que desean un espacio acogedor para descansar y compartir momentos especiales juntos." imagen={image2}/>
                    <Tarjeta titulo="Habitación Triple" contenido="¿Estás planeando una escapada con amigos o familiares? ¡Tenemos la solución perfecta para ti! Nuestra habitación con tres camas es ideal para grupos pequeños que buscan comodidad y conveniencia durante su estadía." imagen={image3}/>
                </div>
            </Box>
        </div>
    )
}

const Tarjeta = ({ titulo, contenido, imagen}) => {
    return (
        <Card sx={{ maxWidth: 400, height: 450, marginBottom: '20px', borderRadius: 5 }}>
            <CardMedia
                component="img"
                height="200"
                image= {imagen}
                alt="Imagen de la habitación"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {titulo}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {contenido}
                </Typography>
            </CardContent>
            <CardActions>
                <Button component={Link} to="/login" size="small" color="primary">
                    Ver más
                </Button >
            </CardActions>
        </Card>
    )
}

export default Habitacion;
