const con = require('../database/mysqlConnection');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');

dotenv.config();

// Configurar Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configurar Multer para usar Cloudinary como almacenamiento
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'habitaciones', // Nombre de la carpeta en Cloudinary
        allowed_formats: ['jpg', 'png', 'jpeg'], // Formatos permitidos
    },
});

const upload = multer({ storage: storage });

// READ - Obtener todas las habitaciones
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

        const { tipo, precioNoche, disponible } = req.body;
        const imageUrl = req.file.path; // URL de la imagen en Cloudinary

        const sql = "INSERT INTO habitacion (`tipo`, `precioNoche`, `disponible`, `imagen`) VALUES (?, ?, ?, ?)";
        const values = [tipo, precioNoche, disponible, imageUrl];
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
        let imageUrl = req.body.imagen; // Mantener la URL existente si no se subió una nueva imagen

        if (req.file) {
            imageUrl = req.file.path; // URL de la nueva imagen en Cloudinary
        }

        const sql = "UPDATE habitacion SET tipo = ?, precioNoche = ?, disponible = ?, imagen = ? WHERE id_habitacio = ?";
        const values = [tipo, precioNoche, disponible, imageUrl, roomId];
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
