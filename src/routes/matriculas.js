const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/tablas', (req, res) => {
    res.render('cursos/forms3');
});

const rando = (min, max) => {
    return Math.floor((Math.random() * (max - min)) + min);
}

router.post('/tablas', async(req, res) => {
    const { seccion } = req.body;
    console.log(seccion);

    for (i = 0; i < 20; i++) {
        let anio = rando(2013, 2017);
        let sec = rando(1000, 9999);
        let matricula = anio.toString() + sec.toString();
        alumno = {
            matricula: parseInt(matricula, 10),
            seccion: seccion
        }

        console.log(matricula);
        await pool.query('INSERT INTO alumno SET ? ', [alumno]);

    }
    res.redirect('/cursos/show');
});
module.exports = router;