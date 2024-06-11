const con = require('../../database/mysqlConnection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
    const { email, password } = req.body;

    const sql = "SELECT * FROM users WHERE email = ?";
    con.query(sql, [email], (err, result) => {
        if (err) {
            return res.json({ Status: "Error", Error: "Error in running query" });
        }

        if (result.length > 0) {
            const passwordHash = bcrypt.compare(password, result[0].password) 
                
                if (!passwordHash) {
                    return res.json({ Status: "Error", Error: "Wrong Email or Password" });
                }
                const token = jwt.sign({ role: "admin" }, "jwt-secret-key", { expiresIn: '1d' });
                return res.json({ Status: "Success", Token: token });
            ;
        } else {
            return res.json({ Status: "Error", Error: "Wrong Email or Password" });
        }
    });
};