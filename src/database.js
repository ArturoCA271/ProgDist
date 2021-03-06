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
        pool.query('CREATE DATABASE IF NOT EXISTS cursos; ');
        pool.query('USE cursos;');

        pool.query('CREATE TABLE IF NOT EXISTS users( ' +
            'id INT(11) NOT NULL PRIMARY KEY, ' +
            'userName VARCHAR(16) NOT NULL, ' +
            'pass VARCHAR(20) NOT NULL);');

        pool.query('CREATE TABLE IF NOT EXISTS tareas(' +
            'id_tarea INT(9) NOT NULL AUTO_INCREMENT PRIMARY KEY,' +
            'matricula INT(9) NOT NULL,' +
            'tema INT(1) NOT NULL,' +
            'Materia INT(1) NOT NULL,' +
            'forma_ensenanza INT(2) NOT NULL,' +
            'Tipo_tarea INT(1) NOT NULL,' +
            'Calif INT(2) NOT NULL,' +
            'Err_cometido1 INT(2) NOT NULL,' +
            'Err_cometido2 INT(2) NOT NULL,' +
            'Err_cometido3 INT(2) NOT NULL,' +
            'Err_cometido4 INT(2) NOT NULL,' +
            'Err_cometido5 INT(2) NOT NULL,' +
            'Err_cometido6 INT(2) NOT NULL,' +
            'Acc_correctivas INT(1) NOT NULL);');

        pool.query(
            'CREATE TABLE IF NOT EXISTS alumno(matricula INT(9) NOT NULL PRIMARY KEY,' +
            'seccion INT(2) NOT NULL);'
        );

        console.log('Conexion establecida');
        return;
    }
});

//promissify pooll querys
pool.query = promisify(pool.query);


module.exports = pool;