const con = require('../../database/mysqlConnection');
const bcrypt = require('bcrypt');

exports.register = (req, res) => {
    const { first_name, last_name, email, password, phone, Rol } = req.body;

    const checkEmailSql = "SELECT * FROM users WHERE email = ?";
    con.query(checkEmailSql, [email], (err, result) => {
        if (err) {
            return res.json({ Status: "Error", Error: "Error al verificar el correo electrónico" });
        }

        if (result.length > 0) {
            return res.json({ Status: "Error", Error: "El correo electrónico ya está registrado" });
        }

        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                return res.json({ Status: "Error", Error: "Password hashing failed" });
            }

            const sql = "INSERT INTO users (`first_name`, `last_name`, `email`, `password`, `phone`, `Rol`) VALUES (?, ?, ?, ?, ?, ?)";
            const values = [first_name, last_name, email, hashedPassword, phone, Rol];
            
            con.query(sql, values, (err, result) => {
                if (err) {
                    return res.json({ Status: "Error", Error: "Error en la consulta de base de datos" });
                }
                return res.json({ Status: "Success" });
            });
        });
    });
};
