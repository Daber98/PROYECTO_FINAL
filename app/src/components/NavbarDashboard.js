import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import logo from '../image/Logo.jpg';

const NavbarDashboard = () => {
    const navigate = useNavigate();

    const signOut = () => {
        localStorage.removeItem('Token');
        navigate("/logout");
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
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
                        <Link className="nav-link" to="/habitaciones">Habitaciones</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/reservaciones-usuario">Reservaciones</Link>
                    </li>
                    </ul>
                    <div className="d-flex">
                        <button className="btn btn-outline-light" onClick={signOut}>
                            Cerrar Sesión
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavbarDashboard;
