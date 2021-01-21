const mysql = require('mysql');
const { database } = require('./keys');
const { promisify } = require('util');
//console.log({ database });

const pool = mysql.createPool(database);

pool.getConnection((err, conenecion) => {
    if (err) {
        console.log('Error: ', err.code);
    } else if (conenecion) {
        conenecion.release();
        console.log('Conexion establecida');
        return;
    }
});

//promissify pooll querys
pool.query = promisify(pool.query);


module.exports = pool;