import React from "react";
import NavbarAdmin from './NavbarAdmin'; // Import the updated NavbarAdmin with sidebar
import '../../css/homeAdmin.css'; // Importa tu archivo CSS

const HomeAdmin = () => {
    return (
        <div className="home-admin"> {/* Aplica la clase CSS */}
            <NavbarAdmin /> {/* Use the updated NavbarAdmin */}
            {/* Additional content for the admin home page */}
        </div>
    );
};

export default HomeAdmin;