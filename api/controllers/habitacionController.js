const con = require('../database/mysqlConnection');
const multer = require('multer');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// Configurar Multer para almacenar las imágenes en el directorio 'uploads/'
const upload = multer({ dest: 'uploads/' });

// READ - Obtener todas las habitacion
exports.getAllRooms = (req, res) => {
    const sql = "SELECT * FROM habitacion";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Error: "Error fetching data" });
        return res.json({ Rooms: result });
    });
};

// READ - Obtener una habitación por ID
exports.getRoomById = (req, res) => {
    const roomId = req.params.id;
    const sql = "SELECT * FROM habitacion WHERE id_habitacio = ?";
    con.query(sql, roomId, (err, result) => {
        if (err) return res.json({ Error: "Error fetching data" });
        if (result.length === 0) return res.json({ Error: "Room not found" });
        return res.json({ Room: result[0] });
    });
};

// CREATE - Agregar una nueva habitación
exports.createRoom = [
    upload.single('imagen'), // Middleware para manejar la carga de archivos
    (req, res) => {
        if (!req.file) {
            return res.status(400).json({ error: "File is required" });
        }

        const { originalname, path } = req.file;
        const parts = originalname.split(".");
        const ext = parts[parts.length - 1];
        const newPath = path + "." + ext;

        try {
            fs.renameSync(path, newPath);
        } catch (error) {
            return res.status(500).json({ error: "Failed to rename file" });
        }

        const { tipo, precioNoche, disponible } = req.body;
        const sql = "INSERT INTO habitacion (`tipo`, `precioNoche`, `disponible`, `imagen`) VALUES (?, ?, ?, ?)";
        const values = [tipo, precioNoche, disponible, newPath];
        con.query(sql, values, (err, result) => {
            if (err) return res.json({ Error: "Error inserting data" });
            return res.json({ Status: "Success", InsertId: result.insertId });
        });
    }
];

// UPDATE - Actualizar una habitación
exports.updateRoom = [
    upload.single('imagen'), // Middleware para manejar la carga de archivos (opcional)
    (req, res) => {
        const roomId = req.params.id;
        const { tipo, precioNoche, disponible } = req.body;
        let newPath = null;

        if (req.file) {
            const { originalname, path } = req.file;
            const parts = originalname.split(".");
            const ext = parts[parts.length - 1];
            newPath = path + "." + ext;
            try {
                fs.renameSync(path, newPath);
            } catch (error) {
                return res.status(500).json({ error: "Failed to rename file" });
            }
        }

        const sql = "UPDATE habitacion SET tipo = ?, precioNoche = ?, disponible = ?, imagen = ? WHERE id_habitacio = ?";
        const values = [tipo, precioNoche, disponible, newPath || req.body.imagen, roomId];
        con.query(sql, values, (err, result) => {
            if (err) return res.json({ Error: "Error updating data" });
            return res.json({ Status: "Success" });
        });
    }
];

// DELETE - Eliminar una habitación
exports.deleteRoom = (req, res) => {
    const roomId = req.params.id;
    const sql = "DELETE FROM habitacion WHERE id_habitacio = ?";
    con.query(sql, roomId, (err, result) => {
        if (err) return res.json({ Error: "Error deleting data" });
        return res.json({ Status: "Success" });
    });
};
