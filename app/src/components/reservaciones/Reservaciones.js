import React, { useState, useEffect } from "react";
import { Box, Card, CardContent, Typography, TextField, Button, Grid } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/lab';
import dayjs from 'dayjs';
import Navbar from "../NavbarDashboard";
import axios from 'axios';
import fondo from "../../image/fondo.jpg";

const Reservaciones = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    ammount: "",
    arrivalDate: null,
    arrivalTime: null,
    departureDate: null,
    departureTime: null,
    roomId: null, // Agrega roomId al estado
  });

  useEffect(() => {
    // Obtener el ID de la habitación del URL
    const params = new URLSearchParams(window.location.search);
    const roomId = params.get("habitacion");
    setFormData({ ...formData, roomId: roomId });
  }, []); // Se ejecuta solo una vez al montar el componente

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleArrivalDateChange = (date) => {
    setFormData({ ...formData, arrivalDate: date });
  };

  const handleArrivalTimeChange = (time) => {
    setFormData({ ...formData, arrivalTime: time });
  };

  const handleDepartureDateChange = (date) => {
    setFormData({ ...formData, departureDate: date });
  };

  const handleDepartureTimeChange = (time) => {
    setFormData({ ...formData, departureTime: time });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/reservacion', {
        id_usuario: 1, // ID de usuario fijo
        id_habitacion: formData.roomId,
        FechaEntrada: formData.arrivalDate,
        FechaSalida: formData.departureDate,
        Estado: "Pendiente",
        EstadoPago: "Pendiente",
        Monto: formData.ammount,
        Telefono: formData.phone
      });
      console.log('ID de la nueva reservación:', response.data.InsertId);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div style={{ backgroundImage: `url(${fondo})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh', backgroundRepeat: 'no-repeat' }}>
      <Navbar/>
      <Box m={2}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Imágenes de la Habitación
                </Typography>
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
                  <div style={{marginTop: 25, marginLeft: 175}}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                      <DatePicker
                        label="Fecha de llegada"
                        style={{margin: 25}}
                        value={dayjs(formData.arrivalDate)}
                        onChange={(newValue) => handleArrivalDateChange(newValue?.toDate())}
                        renderInput={(params) => <TextField {...params} margin="normal" fullWidth />}
                      />
                      <TimePicker
                        label="Hora de llegada"
                        value={formData.arrivalTime}
                        onChange={handleArrivalTimeChange}
                        renderInput={(params) => <TextField {...params} margin="normal" fullWidth />}
                      />
                      <DatePicker
                        label="Fecha de salida"
                        style={{margin: 25}}
                        value={dayjs(formData.departureDate)}
                        onChange={(newValue) => handleDepartureDateChange(newValue?.toDate())}
                        renderInput={(params) => <TextField {...params} margin="normal" fullWidth />}
                      />
                      <TimePicker
                        label="Hora de salida"
                        value={formData.departureTime}
                        onChange={handleDepartureTimeChange}
                        renderInput={(params) => <TextField {...params} margin="normal" fullWidth />}
                      />
                    </LocalizationProvider>
                  </div>
                  <LocalizationProvider>
                    </ LocalizationProvider>
                  <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: 120, fontWeight: 'bold', width: '75%', marginLeft: '110px' }}>
                    Reservar habitación
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Reservaciones;
