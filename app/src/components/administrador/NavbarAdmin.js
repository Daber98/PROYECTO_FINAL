import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Box, Button } from '@mui/material';
import { Menu, Home, Hotel, Book, People } from '@mui/icons-material'; // Icons for the list items
import logo from '../../image/Logo.jpg'; // Logo for the Navbar

const NavbarAdmin = () => {
    const [drawerOpen, setDrawerOpen] = useState(false); // State to handle drawer open/close
    const navigate = useNavigate();

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const menuItems = [
        { text: 'Inicio', icon: <Home />, link: '/Home-admin' },
        { text: 'Habitación', icon: <Hotel />, link: '/habitaciones-admin' },
        { text: 'Reservación', icon: <Book />, link: '/reservaciones-admin' },
        { text: 'Usuarios', icon: <People />, link: '/usuarios-admin' }
    ];

    const signOut = () => {
        localStorage.removeItem('Token');
        navigate("/logout");
    }

    const list = () => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                {menuItems.map((item, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton onClick={() => navigate(item.link)}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    {/* IconButton to trigger the sidebar */}
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                        <Menu />
                    </IconButton>
                    {/* Logo and Title */}
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <img src={logo} alt="Hotel Villa del Rio" style={{ height: '30px', marginRight: '10px' }} />
                        Hotel Villa del Rio
                    </Typography>
                    <Button color="inherit" onClick={signOut}>Cerrar Sesión</Button>
                </Toolbar>
            </AppBar>
            {/* Drawer (Sidebar) */}
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
            >
                {list()}
            </Drawer>
        </>
    );
};

export default NavbarAdmin;
