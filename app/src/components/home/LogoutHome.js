import React from "react";
import { Link } from "react-router-dom";
import Navbar from './Navbar'

const LogoutHome = () => {
  return (
    <div>
      <Navbar/>
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>¡Gracias por usar nuestro sistema!</h1>
      <p>Esperamos que hayas tenido una experiencia increíble.</p>
      <Link to="/">
        <button style={{ padding: '10px 20px', fontSize: '1.2em', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Ir a inicio
        </button>
      </Link>
    </div>
    </div>
  );
}

export default LogoutHome;
