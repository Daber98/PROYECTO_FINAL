import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/autenticacion/Login.js"; // Login y Logout
import SignUp from "./components/autenticacion/Signup.js";
import Inicio from "./components/home/Inicio.js";
import Logout from "./components/home/LogoutHome.js";

import HomeDashboard from "./components/HomeDashboard.js"; // Dashboard home
import Habitacion from "./components/home/Habitacion.js";
import Informacion from "./components/home/Informacion.js";

import Habitaciones from "./components/habitacion/Habitaciones.js"; // Habitaciones
import HabitacionesAdmin from "./components/habitacion/HabitacionesAdmin.js"

import Reservaciones from "./components/reservaciones/Reservaciones.js"; // Reservaciones
import ReservacionesAdmin from "./components/reservaciones/ReservacionesAdmin.js";

import UsuariosAdmin from "./components/usuarios/UsuariosAdmin.js"; // usuarios
 
import {RequireToken} from "./../src/components/hooks/Auth.js"; // Obtención del token para validarlo en la ruta

function App() {
  return (
    <div className="app">
        <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/habitacion" element={<Habitacion />} />
              <Route path="/informacion" element={<Informacion />} />
              <Route path="/" element={<Inicio />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/profile"
                element={
                  <RequireToken>
                    <HomeDashboard />
                  </RequireToken>
                }
              />
              <Route path="/habitaciones"
                element={
                  <RequireToken>
                    <Habitaciones />
                  </RequireToken>
                }
              />
              <Route path="/habitaciones-admin"
                element={
                  <RequireToken>
                    <HabitacionesAdmin />
                  </RequireToken>
                }
              />
              <Route path="/reservaciones"
                element={
                  <RequireToken>
                    <Reservaciones />
                  </RequireToken>
                }
              />
              <Route path="/reservaciones-admin"
                element={
                  <RequireToken>
                    <ReservacionesAdmin />
                  </RequireToken>
                }
              />
              <Route path="/usuarios-admin"
                element={
                  <RequireToken>
                    <UsuariosAdmin />
                  </RequireToken>
                }
              />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
