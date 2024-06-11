import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Drawer, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import { Menu, Home, Hotel, Book, People } from '@mui/icons-material'; // Importa el icono de menú

import logo from '../image/Logo.jpg';

const NavbarDashboard = () => {
    const navigate = useNavigate();
    const [state, setState] = useState({ left: false });

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event.type === 'keydown' &&
            ((event.key === 'Tab' && event.key === 'Shift'))
        ) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <div
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <Box
                sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            >
                <List>
                    {[
                        { text: 'Inicio', icon: <Home />, link: '/profile' },
                        { text: 'Habitación', icon: <Hotel />, link: '/habitaciones-admin' },
                        { text: 'Reservación', icon: <Book />, link: '/reservaciones-admin' },
                        { text: 'Usuarios', icon: <People />, link: '/usuarios-admin' }
                    ].map((item, index) => (
                        <ListItem key={index} disablePadding button onClick={() => navigate(item.link)}>
                            <ListItemButton>
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </div>
    );

    const signOut = () => {
        localStorage.removeItem('Token');
        navigate("/logout");
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <IconButton onClick={toggleDrawer('left', true)} edge="start" color="inherit" aria-label="menu" style={{ marginLeft: '10px', color: 'white' }}>
                <Menu />
            </IconButton>
            <Drawer
                anchor={'left'}
                open={state['left']}
                onClose={toggleDrawer('left', false)}
            >
                {list('left')}
            </Drawer>
            <div className="container">
                <a className="navbar-brand" href="./profile">
                    <img src={logo} alt="Hotel Villa del Rio" style={{ height: '30px', marginRight: '10px' }} />
                    Hotel Villa del Rio
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link" href="./habitaciones">Habitaciones</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="./reservaciones">Reservacion</a>
                        </li>
                    </ul>
                    <div className="d-flex">
                        <a className="btn btn-outline-light" href="/logout" onClick={signOut}>Cerrar Sesion</a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavbarDashboard;
