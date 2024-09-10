import React, { useState, useEffect } from "react";
import { Box, Card, CardContent, Typography, TextField, Button, Grid, Snackbar, Alert, CardMedia } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import Navbar from "../NavbarDashboard";
import NavbarHome from '../home/Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import fondo from "../../image/fondo.jpg";
import { fetchToken } from "../hooks/Auth"; // Asegúrate de tener este hook o función para obtener el token

const Reservaciones = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    amount: "",
    arrivalDateTime: null,
    departureDateTime: null,
    roomId: null,
  });

  const [price, setPrice] = useState("");
  const [roomImage, setRoomImage] = useState("");
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [arrivalDateError, setArrivalDateError] = useState("");
  const [departureDateError, setDepartureDateError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para verificar si el usuario está logueado
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si el usuario está logueado
    const token = fetchToken(); // Obtén el token del localStorage
    if (token) {
      setIsLoggedIn(true); // Usuario logueado
    }

    const params = new URLSearchParams(window.location.search);
    const roomId = params.get("habitacion");
    setFormData({ ...formData, roomId: roomId });

    if (roomId) {
      axios.get(`http://localhost:3001/habitacion/${roomId}`)
        .then(response => {
          setPrice(response.data.Room.precioNoche);
          setRoomImage(`http://localhost:3001/${response.data.Room.imagen}`);

          // Obtener fechas no disponibles para la habitación
          axios.get(`http://localhost:3001/reservas/${roomId}`)
            .then(response => {
              const dates = response.data.UnavailableDates.map(date => ({
                start: dayjs(date.start),
                end: dayjs(date.end)
              }));
              setUnavailableDates(dates);
            })
            .catch(error => console.error('Error fetching unavailable dates:', error));
        })
        .catch(error => console.error('Error fetching room price and image:', error));
    }
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateTimeChange = (type, dateTime) => {
    setFormData({ ...formData, [type]: dateTime });

    if (type === 'arrivalDateTime') {
      if (dateTime && formData.departureDateTime && dayjs(dateTime).isAfter(dayjs(formData.departureDateTime))) {
        setArrivalDateError("La fecha de llegada no puede ser después de la fecha de salida.");
      } else {
        setArrivalDateError("");
      }
    }

    if (type === 'departureDateTime') {
      if (dateTime && formData.arrivalDateTime && dayjs(dateTime).isBefore(dayjs(formData.arrivalDateTime))) {
        setDepartureDateError("La fecha de salida no puede ser antes de la fecha de llegada.");
      } else {
        setDepartureDateError("");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (arrivalDateError || departureDateError) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Por favor, corrige los errores en las fechas.");
      setSnackbarOpen(true);
      return;
    }

    try {
      const token = fetchToken();
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await axios.post('http://localhost:3001/reservacion', {
        id_usuario: 1,
        id_habitacion: formData.roomId,
        FechaEntrada: formData.arrivalDateTime,
        FechaSalida: formData.departureDateTime,
        Estado: "Pendiente",
        EstadoPago: "0",
        Monto: price,
        Telefono: formData.phone
      }, {
        headers: {
          'Authorization': `Bearer ${token}`  // Incluye el token en los headers
        }
      });

      if (response.data.Status === 'Success') {
        setSnackbarSeverity("success");
        setSnackbarMessage("¡Reservación realizada con éxito!");
        setSnackbarOpen(true);
        setTimeout(() => {
          navigate('/reservaciones-usuario');
        }, 2000);
      } else {
        setSnackbarSeverity("error");
        setSnackbarMessage("Hubo un problema al realizar la reservación o la habitación ya está reservada.");
      }
    } catch (error) {
      console.error('Error:', error);
      setSnackbarSeverity("error");
      setSnackbarMessage("Error al conectarse con el servidor.");
    }

    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const isDateUnavailable = (date) => {
    return unavailableDates.some(({ start, end }) => date.isBetween(start, end, null, '[]'));
  };

  return (
    <div style={{ backgroundImage: `url(${fondo})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh', backgroundRepeat: 'no-repeat' }}>
      {/* Renderiza Navbar si el usuario está logueado, de lo contrario, NavbarHome */}
      {isLoggedIn ? <Navbar /> : <NavbarHome />}
      
      <Box m={2}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Imágen de la Habitación
                </Typography>
                {roomImage && (
                  <CardMedia
                    component="img"
                    image={roomImage}
                    alt="Imagen de la habitación"
                  />
                )}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={6}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Reservación de Habitación
                </Typography>
                <form onSubmit={handleSubmit}>
                  <TextField
                    label="Nombre"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                  <TextField
                    label="Apellido"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                  <TextField
                    label="Teléfono"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                  <TextField
                    label="Número de Habitación"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="roomId"
                    value={formData.roomId}
                    onChange={handleInputChange}
                    disabled
                  />
                  <TextField
                    label="Precio por Noche"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="price"
                    value={price}
                    disabled
                  />
                  <div style={{ marginTop: 25 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Fecha de Llegada"
                        value={formData.arrivalDateTime ? dayjs(formData.arrivalDateTime).startOf('day') : null}
                        onChange={(date) => handleDateTimeChange('arrivalDateTime', date ? dayjs(date).hour(dayjs(formData.arrivalDateTime)?.hour() || 0).minute(dayjs(formData.arrivalDateTime)?.minute() || 0) : null)}
                        renderInput={(params) => <TextField {...params} helperText={arrivalDateError} />}
                        shouldDisableDate={isDateUnavailable}
                      />
                      <TimePicker
                        label="Hora de Llegada"
                        value={formData.arrivalDateTime ? dayjs(formData.arrivalDateTime) : null}
                        onChange={(time) => handleDateTimeChange('arrivalDateTime', time ? dayjs(formData.arrivalDateTime).hour(dayjs(time).hour()).minute(dayjs(time).minute()) : null)}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </div>

                  <div style={{ marginTop: 25 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Fecha de Salida"
                        value={formData.departureDateTime ? dayjs(formData.departureDateTime).startOf('day') : null}
                        onChange={(date) => handleDateTimeChange('departureDateTime', date ? dayjs(date).hour(dayjs(formData.departureDateTime)?.hour() || 0).minute(dayjs(formData.departureDateTime)?.minute() || 0) : null)}
                        renderInput={(params) => <TextField {...params} helperText={departureDateError} />}
                        shouldDisableDate={isDateUnavailable}
                      />
                      <TimePicker
                        label="Hora de Salida"
                        value={formData.departureDateTime ? dayjs(formData.departureDateTime) : null}
                        onChange={(time) => handleDateTimeChange('departureDateTime', time ? dayjs(formData.departureDateTime).hour(dayjs(time).hour()).minute(dayjs(time).minute()) : null)}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </div>
                  <Button variant="contained" color="primary" fullWidth type="submit" sx={{ mt: 2 }}>
                    Reservar
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </div>
  );
};

export default Reservaciones;
