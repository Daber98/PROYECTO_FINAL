const con = require('../../database/mysqlConnection');
const bcrypt = require('bcrypt');

exports.register = (req, res) => {
    const { first_name, last_name, email, password, phone } = req.body;

    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.json({ Status: "Error", Error: "Password hashing failed" });
        }

        const sql = "INSERT INTO users (`first_name`, `last_name`, `email`, `password`, `phone`) VALUES (?, ?, ?, ?, ?)";
        const values = [first_name, last_name, email, hashedPassword, phone];
        
        con.query(sql, values, (err, result) => {
            if (err) {
                return res.json({ Status: "Error", Error: "Database query failed" });
            }
            return res.json({ Status: "Success" });
        });
    });
};
