require('dotenv').config();
const mysql = require("mysql");

const connection = mysql.createConnection({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

connection.connect(function(err) {
    if(err) {
        console.log("Error al conectar con MySQL!");
    } else {
        console.log("Conectado satisfactoriamente a MySQL!");
    }
});

module.exports = connection;

/*
// Importar Sequelize
const { Sequelize } = require('sequelize');

// Configurar Sequelize
const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Conectado satisfactoriamente a la base de datos.');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
}

testConnection();

module.exports = sequelize;
*/