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

    // Consulta para obtener el precio y la disponibilidad de la habitación
    const getRoomDetailsSql = "SELECT precioNoche, disponible FROM habitacion WHERE id_habitacio = ?";
    
    con.query(getRoomDetailsSql, [id_habitacion], (err, result) => {
        if (err) return res.json({ Error: "Error fetching room details" });
        
        if (result.length > 0) {
            const { precioNoche, disponible } = result[0];

            // Verificar si la habitación está disponible
            if (disponible === 0) {
                return res.json({ Error: "La habitación no está disponible" });
            }

            // Inserción de la reservación con el monto obtenido
            const insertReservationSql = "INSERT INTO reservacion (`id_usuario`, `id_habitacion`, `FechaEntrada`, `FechaSalida`, `Estado`, `EstadoPago`, `Monto`, `Telefono`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
            const values = [id_usuario, id_habitacion, FechaEntrada, FechaSalida, Estado, EstadoPago, precioNoche, Telefono];
            
            con.query(insertReservationSql, values, (err, result) => {
                if (err) return res.json({ Error: "Error inserting reservation data" });

                // Actualizar la disponibilidad de la habitación a 0 (no disponible)
                const updateAvailabilitySql = "UPDATE habitacion SET disponible = 0 WHERE id_habitacio = ?";
                
                con.query(updateAvailabilitySql, [id_habitacion], (err, updateResult) => {
                    if (err) return res.json({ Error: "Error updating room availability" });
                    return res.json({ Status: "Success", InsertId: result.insertId });
                });
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

// READ - Obtener todas las reservas de un usuario por ID
exports.getReservationsByUserId = (req, res) => {
    const userId = req.params.id;
    const sql = "SELECT * FROM reservacion WHERE id_usuario = ?";
    con.query(sql, userId, (err, result) => {
        if (err) return res.json({ Error: "Error fetching data" });
        if (result.length === 0) return res.json({ Error: "No reservations found for this user" });
        return res.json({ Reservations: result });
    });
};
