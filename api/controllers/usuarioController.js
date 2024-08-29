const con = require('../database/mysqlConnection');

// READ - Obtener todos los usuarios
exports.getAllUsers = (req, res) => {
    const sql = "SELECT * FROM users";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Error: "Error fetching data" });
        return res.json({ Users: result });
    });
};

// READ - Obtener un usuario por ID
exports.getUserById = (req, res) => {
    const userId = req.params.id;
    const sql = "SELECT * FROM users WHERE id_user = ?";
    con.query(sql, userId, (err, result) => {
        if (err) return res.json({ Error: "Error fetching data" });
        if (result.length === 0) return res.json({ Error: "User not found" });
        return res.json({ User: result[0] });
    });
};

// UPDATE - Actualizar un usuario
exports.updateUser = (req, res) => {
    const userId = req.params.id;
    const { first_name, last_name, email, phone, Rol } = req.body;
    const sql = "UPDATE users SET first_name = ?, last_name = ?, email = ?, phone = ?, Rol = ? WHERE id_user = ?";
    const values = [first_name, last_name, email, phone, Rol, userId];
    con.query(sql, values, (err, result) => {
        if (err) return res.json({ Error: "Error updating data" });
        return res.json({ Status: "Success" });
    });
};

// DELETE - Eliminar un usuario
exports.deleteUser = (req, res) => {
    const userId = req.params.id;
    const sql = "DELETE FROM users WHERE id_user = ?";
    con.query(sql, userId, (err, result) => {
        if (err) return res.json({ Error: "Error deleting data" });
        return res.json({ Status: "Success" });
    });
};

// CREATE - Crear un nuevo usuario (si es necesario)
exports.createUser = (req, res) => {
    const { first_name, last_name, email, phone, Rol } = req.body;
    const sql = "INSERT INTO users (first_name, last_name, email, phone, Rol) VALUES (?, ?, ?, ?, ?)";
    const values = [first_name, last_name, email, phone, Rol];
    con.query(sql, values, (err, result) => {
        if (err) return res.json({ Error: "Error inserting data" });
        return res.json({ Status: "Success", UserId: result.insertId });
    });
};
