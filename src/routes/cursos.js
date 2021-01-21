const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/add', (req, res) => {
    res.render('cursos/form');
});

router.post('/add', async(req, res) => {
    const {
        matricula,
        tema,
        materia,
        for_ensenanza,
        tipo_tarea,
        calificacion,
        err_cometidos1,
        err_cometidos2,
        err_cometidos3,
        err_cometidos4,
        err_cometidos5,
        err_cometidos6,
        acc_cometidas
    } = req.body;
    const newTarea = {
        matricula,
        tema,
        Materia: materia,
        forma_ensenanza: for_ensenanza,
        Tipo_tarea: tipo_tarea,
        Calif: calificacion,
        Err_cometido1: err_cometidos1,
        Err_cometido2: err_cometidos2,
        Err_cometido3: err_cometidos3,
        Err_cometido4: err_cometidos4,
        Err_cometido5: err_cometidos5,
        Err_cometido6: err_cometidos6,
        Acc_correctivas: acc_cometidas
    };
    await pool.query('INSERT INTO tareas set ?', [newTarea]);
    console.log(req.body);
    res.send('Recibido');
    res.redirect('/cursos');
});

router.get('/', async(req, res) => {
    const cursos = await pool.query('SELECT * FROM tareas');
    res.render('cursos/list', { cursos });

});

module.exports = router;