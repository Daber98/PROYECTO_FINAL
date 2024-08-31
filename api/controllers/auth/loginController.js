const con = require('../../database/mysqlConnection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
    const { email, password } = req.body;

    const sql = "SELECT * FROM users WHERE email = ?";
    con.query(sql, [email], async (err, result) => {
        if (err) {
            return res.json({ Status: "Error", Error: "Error al ejecutar la consulta" });
        }

        if (result.length > 0) {
            const user = result[0];
            const passwordHash = bcrypt.compare(password, result[0].password) 
                
                if (!passwordHash) {
                    return res.json({ Status: "Error", Error: "Correo electrónico o contraseña incorrectos" });
                }
                const token = jwt.sign({ 
                    id: user.id,  // Include user ID in the token
                    role: user.Rol 
                }, "jwt-secret-key", { expiresIn: '1d' });
                
                return res.json({ 
                    Status: "Success", 
                    Token: token, 
                    User: {
                        id: user.id,
                        email: user.email,
                        role: user.Rol,
                        // Puedes incluir otros datos del usuario que consideres necesarios
                    }
                });
            ;
        } else {
            return res.json({ Status: "Error", Error: "Correo electrónico o contraseña incorrectos" });
        }
    });
};