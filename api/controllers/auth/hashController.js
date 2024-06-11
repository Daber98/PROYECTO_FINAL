const bcrypt = require('bcrypt');

exports.hashPassword = (req, res) => {
    bcrypt.hash("123456", 10, (err, hash) => {
        if(err) return res.json({Error: "Error in hashing password"});
        return res.json({result: hash});
    });
};
