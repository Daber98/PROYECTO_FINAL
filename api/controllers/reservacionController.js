const con = require('../database/mysqlConnection');

// READ - Obtener todas las reservas
exports.getAllReservations = (req, res) => {
    const sql = "SELECT * FROM reservacion";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Error: "Error fetching data" });
        return res.json({ Reservations: result });
    });
};

// READ - Obtener una reserva por ID
exports.getReservationById = (req, res) => {
    const reservationId = req.params.id;
    const sql = "SELECT * FROM reservacion WHERE id_reservacio = ?";
    con.query(sql, reservationId, (err, result) => {
        if (err) return res.json({ Error: "Error fetching data" });
        if (result.length === 0) return res.json({ Error: "Reservation not found" });
        return res.json({ Reservation: result[0] });
    });
};

// READ - Obtener una habitación por ID
exports.getRoomByIdReservation = (req, res) => {
    const roomId = req.params.id;
    const sql = "SELECT * FROM habitacion WHERE id_habitacio = ?";
    con.query(sql, roomId, (err, result) => {
        if (err) return res.json({ Error: "Error fetching data" });
        if (result.length === 0) return res.json({ Error: "Room not found" });
        return res.json({ Room: result[0] });
    });
};

// CREATE - Agregar una nueva reserva
exports.createReservation = (req, res) => {
    const { id_usuario, id_habitacion, FechaEntrada, FechaSalida, Estado, EstadoPago, Telefono } = req.body;

    // Consulta para obtener el monto de la habitación
    const getPriceSql = "SELECT precioNoche FROM habitacion WHERE id_habitacio = ?";
    
    con.query(getPriceSql, [id_habitacion], (err, result) => {
        if (err) return res.json({ Error: "Error fetching room price" });
        
        if (result.length > 0) {
            const Monto = result[0].precioNoche;
            console.log(Monto)
            
            // Inserción de la reservación con el monto obtenido
            const sql = "INSERT INTO reservacion (`id_usuario`, `id_habitacion`, `FechaEntrada`, `FechaSalida`, `Estado`, `EstadoPago`, `Monto`, `Telefono`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
            const values = [id_usuario, id_habitacion, FechaEntrada, FechaSalida, Estado, EstadoPago, Monto, Telefono];
            
            con.query(sql, values, (err, result) => {
                if (err) return res.json({ Error: "Error inserting data" });
                return res.json({ Status: "Success", InsertId: result.insertId });
            });
        } else {
            return res.json({ Error: "Room not found" });
        }
    });
};


// UPDATE - Actualizar una reserva
exports.updateReservation = (req, res) => {
    const reservationId = req.params.id;
    const { id_usuario, id_habitacion, FechaEntrada, FechaSalida, Estado, EstadoPago, Monto, Telefono } = req.body;
    const sql = "UPDATE reservacion SET id_usuario = ?, id_habitacio = ?, FechaEntrada = ?, FechaSalida = ?, Estado = ?, EstadoPago = ?, Monto = ?, Telefono = ? WHERE id_reservacio = ?";
    const values = [id_usuario, id_habitacion, FechaEntrada, FechaSalida, Estado, EstadoPago, Monto, Telefono, reservationId];
    con.query(sql, values, (err, result) => {
        if (err) return res.json({ Error: "Error updating data" });
        return res.json({ Status: "Success" });
    });
};

// DELETE - Eliminar una reserva
exports.deleteReservation = (req, res) => {
    const reservationId = req.params.id;
    const sql = "DELETE FROM reservacion WHERE id_reservacio = ?";
    con.query(sql, reservationId, (err, result) => {
        if (err) return res.json({ Error: "Error deleting data" });
        return res.json({ Status: "Success" });
    });
};
