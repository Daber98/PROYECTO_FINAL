import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Home, Hotel, Book, People } from '@mui/icons-material';

const NavbarDashboardAdmin = () => {
    const navigate = useNavigate();

    const list = () => (
        <Box sx={{ width: 250 }}>
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
    );

    return list();
};

export default NavbarDashboardAdmin;
