import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'

import { setToken } from '../hooks/Auth.js'
import Navbar from '../home/Navbar.js'

import { Card, CardContent, TextField, Button, Typography, Link, Checkbox, FormControlLabel } from '@mui/material';

import "../../css/Login.css"

import fondo from "../../image/fondo.jpg"; // Importa la imagen de fondo
import villaImage from "../../image/Entrada.jpg";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState('');
    const [remember, setRemember] = useState(false);
    const navigate = useNavigate();

    const login = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/login", {
            email: email,
            password: password,
        })
        .then(res => {
            console.log(res);
            if(res.data.Status === 'Success') {
                console.log(res.data.Token);
                setToken(res.data.Token)
                navigate('/profile');
            } else {
                setError(res.data.Error);
            }
        })
        .catch(err => console.log(err));
    }
    
    return (
        <div style={{ backgroundImage: `url(${fondo})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}>
            <Navbar/>
            <div className="container" style={{paddingTop: 60}}>
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-9 col-lg-6 col-xl-5">
                            <img src={villaImage} className="imagen-login" style={{  }} alt="Villa de la imagen de entrada" />
                        </div>
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <Card style={{ width: 600, height: 750, borderRadius: 15, marginTop: '-15px' }}> 
                                <CardContent>
                                    <Typography variant="h5" component="h2" align="center" gutterBottom style={{ fontWeight: 'bold', marginTop: 210 }}>Iniciar sesión</Typography>
                                    {error && <Typography variant="subtitle1" color="error" align="center" gutterBottom>{error}</Typography>}
                                    <form onSubmit={login}>
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
                                            control={<Checkbox color="primary" checked={remember} onChange={(e) => setRemember(e.target.checked)} />}
                                            label="Recordar"
                                        />
                                        <Typography variant="body2">
                                            <Link href="#">¿Has olvidado tu contraseña?</Link>
                                        </Typography>
                                        <Button type="submit" variant="contained" color="primary" fullWidth size="large" style={{ marginTop: 120 }}>Ingresar</Button>
                                        <Typography variant="body2" style={{ marginTop: '10px' }}>
                                            ¿No tienes una cuenta? <Link href="signup">Regístrate aquí</Link>
                                        </Typography>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
