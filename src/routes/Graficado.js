const express = require('express');
const router = express.Router();
const pool = require('../database');

async function graficado(...args) {
    //console.log(args[0]);

    //let mat = await pool.query('SELECT * FROM alumno');
    //console.log(mat);


}

router.get('/graficos', (req, res) => {
    res.render('cursos/graficas');
});

router.post('/graficos', (req, res) => {
    let {
        tipografico
    } = req.body
    graficado(tipografico)
        //console.log(tipografico);
    let val = {
        x: [1, 2, 3, 4, 5],
        y: [1, 2, 4, 8, 16]
    };
    res.render('cursos/graficas', val);
});



module.exports = router;