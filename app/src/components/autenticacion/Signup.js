import React, { useState } from "react";
import axios from "axios";

import { Card, CardContent, TextField, Button, Typography, Link, Checkbox, FormControlLabel } from '@mui/material';

import Navbar from '../home/Navbar.js'

import "../../css/Signup.css"

import fondo from "../../image/fondo.jpg"; // Importa la imagen de fondo
import villaImage from "../../image/Entrada.jpg";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [lastName, setLastName] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [registerStatus, setRegisterStatus] = useState("");

    const register = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/register", {
            email: email,
            last_name: lastName,
            first_name: name,
            phone: phone,
            password: password,
        }).then((response) => {
            console.log(response);
            if(response.data.message){
                setRegisterStatus(response.data.message);
            }else{
                setRegisterStatus("CUENTA CREADA EXITOSAMENTE");
            }
        })
    }

    return (
        <div style={{ backgroundImage: `url(${fondo})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}>
            <Navbar/>
            <div className="container" style={{ paddingTop: 60 }}>
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-7">
                          <Card style={{ width: 600, height: 750, borderRadius: 15, marginTop: '-15px' }}> 
                                <CardContent>
                                    <Typography style={{ fontWeight: 'bold' }} variant="h5" component="h2" align="center" gutterBottom >Crea tu cuenta</Typography>
                                    {registerStatus && <Typography variant="subtitle1" color="error" align="center" gutterBottom>{registerStatus}</Typography>}
                                    <form onSubmit={register}>
                                        <TextField
                                            type="text"
                                            label="Nombre"
                                            variant="outlined"
                                            fullWidth
                                            margin="normal"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                        <TextField
                                            type="text"
                                            label="Apellido"
                                            variant="outlined"
                                            fullWidth
                                            margin="normal"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            required
                                        />
                                        <TextField
                                            type="text"
                                            label="Número de teléfono"
                                            variant="outlined"
                                            fullWidth
                                            margin="normal"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            required
                                        />
                                        <TextField
                                            type="email"
                                            label="Correo electrónico"
                                            variant="outlined"
                                            fullWidth
                                            margin="normal"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                        <TextField
                                            type="password"
                                            label="Contraseña"
                                            variant="outlined"
                                            fullWidth
                                            margin="normal"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                        <FormControlLabel
                                            control={<Checkbox color="primary" />}
                                            label="Recordar"
                                        />
                                        <Typography variant="body2">
                                            <Link href="#">¿Has olvidado tu contraseña?</Link>
                                        </Typography>
                                        <Button type="submit" variant="contained" color="primary" fullWidth size="large" style={{ marginTop: 90 }}>Registrarse</Button>
                                        <Typography variant="body2" style={{ marginTop: '10px' }}>
                                            ¿Ya tienes una cuenta? <Link href="login">Inicia sesión aquí</Link>
                                        </Typography>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="col-md-5">
                            <img src={villaImage} className="img-fluid" alt="Villa" style={{ width: '100%' }}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
