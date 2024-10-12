import React, { useState, useEffect } from "react";
import { Box, Card, CardContent, Typography, Snackbar, Alert } from "@mui/material";
import Navbar from "../NavbarDashboard";
import fondo from "../../image/fondo.jpg";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ReservacionesUsuario = () => {
  const [reservations, setReservations] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const navigate = useNavigate();
  const { id } = useParams(); // Gets the user ID from the URL

  useEffect(() => {
    // Fetch reservations when the component mounts
    axios.get(`${process.env.REACT_APP_API_URL}/reservacion/user/1`)
      .then(response => {
        if (response.data.Error) {
          setSnackbarMessage(response.data.Error);
          setSnackbarSeverity("error");
          setOpenSnackbar(true);
        } else {
          setReservations(response.data.Reservations);
        }
      })
      .catch(error => {
        setSnackbarMessage("Error fetching reservations");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      });
  }, [id]);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${fondo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
    >
      <Navbar />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '20px',
          backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background for the content
          padding: '20px',
          borderRadius: '8px',
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto'
        }}
      >
        <Typography variant="h4" gutterBottom>
          Reservaciones de Usuario
        </Typography>
        {reservations.length > 0 ? (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {reservations.map(reservation => (
              <Card key={reservation.id_reservacio} sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    Reserva ID: {reservation.id_reservacio}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Usuario ID: {reservation.id_usuario}
                  </Typography>
                  <Typography variant="body2">
                    Habitación ID: {reservation.id_habitacion}
                  </Typography>
                  <Typography variant="body2">
                    Fecha Entrada: {reservation.FechaEntrada}
                  </Typography>
                  <Typography variant="body2">
                    Fecha Salida: {reservation.FechaSalida}
                  </Typography>
                  <Typography variant="body2">
                    Estado: {reservation.Estado}
                  </Typography>
                  <Typography variant="body2">
                    Estado de Pago: {reservation.EstadoPago}
                  </Typography>
                  <Typography variant="body2">
                    Monto: ${reservation.Monto}
                  </Typography>
                  <Typography variant="body2">
                    Teléfono: {reservation.Telefono}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        ) : (
          <Typography variant="h6" color="text.secondary">
            No hay reservas para este usuario.
          </Typography>
        )}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default ReservacionesUsuario;
