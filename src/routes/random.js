const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/show', (req, res) => {
    res.render('cursos/form2');
});


const random = (min, max) => {
    return Math.floor((Math.random() * (max - min)) + min);
}

const creaTarea = (...args) => {
    return {
        matricula: args[0],
        tema: args[1],
        Materia: args[2],
        forma_ensenanza: args[3],
        Tipo_tarea: args[4],
        Calif: args[5],
        Err_cometido1: args[6],
        Err_cometido2: args[7],
        Err_cometido3: args[8],
        Err_cometido4: args[9],
        Err_cometido5: args[10],
        Err_cometido6: args[11],
        Acc_correctivas: args[12],

    };
};

async function creaTask() {
    const almnos = await pool.query('SELECT * FROM alumno');
    const valTem = (await pool.query('SELECT max(tema) as tema FROM tareas'));
    let tema;
    valTem.forEach(element => {
        tema = element.tema;
        tema++;
    });
    console.log(tema);

    let forma_ensenanza = random(1, 11);
    let Tipo_tarea = random(1, 6);
    let Acc_correctivas;
    const materia = 1;
    let e1, e2, e3, e4, e5, e6;
    let Calif;
    switch (Tipo_tarea) {
        case 1:
            almnos.forEach(element => {
                e1 = random(0, 5);
                e2 = random(0, 5);
                e3 = random(0, 5);
                e4 = random(0, 5);
                e5 = 0;
                e6 = 0;
                Calif = random(0, 10);
                Acc_correctivas = random(1, 5);
                const tarea = creaTarea(element.matricula,
                    tema,
                    materia,
                    forma_ensenanza,
                    Tipo_tarea,
                    Calif, e1, e2, e3, e4, e5, e6, Acc_correctivas);
                pool.query('INSERT INTO tareas set ?', [tarea]);
            });
            break;
        case 2:

            almnos.forEach(element => {
                e1 = random(0, 5);
                e2 = random(0, 5);
                e3 = random(0, 5);
                e4 = 0;
                e5 = 0;
                e6 = 0;
                Calif = random(0, 10);
                Acc_correctivas = random(1, 5);
                const tarea = creaTarea(element.matricula,
                    tema,
                    materia,
                    forma_ensenanza,
                    Tipo_tarea,
                    Calif, e1, e2, e3, e4, e5, e6, Acc_correctivas);
                pool.query('INSERT INTO tareas set ?', [tarea]);
            });
            break;
        case 3:

            almnos.forEach(element => {
                e1 = random(0, 5);
                e2 = random(0, 5);
                e3 = random(0, 5);
                e4 = 0;
                e5 = 0;
                e6 = 0;
                Calif = random(0, 10);
                Acc_correctivas = random(1, 5);
                const tarea = creaTarea(element.matricula,
                    tema,
                    materia,
                    forma_ensenanza,
                    Tipo_tarea,
                    Calif, e1, e2, e3, e4, e5, e6, Acc_correctivas);
                pool.query('INSERT INTO tareas set ?', [tarea]);
            });
            break;
        case 4:

            almnos.forEach(element => {
                e1 = random(0, 5);
                e2 = random(0, 5);
                e3 = random(0, 5);
                e4 = random(0, 5);
                e5 = random(0, 5);
                e6 = random(0, 5);
                Calif = random(0, 10);
                Acc_correctivas = random(1, 5);
                const tarea = creaTarea(element.matricula,
                    tema,
                    materia,
                    forma_ensenanza,
                    Tipo_tarea,
                    Calif, e1, e2, e3, e4, e5, e6, Acc_correctivas);
                pool.query('INSERT INTO tareas set ?', [tarea]);
            });
            break;
        case 5:

            almnos.forEach(element => {
                e1 = random(0, 5);
                e2 = random(0, 5);
                e3 = random(0, 5);
                e4 = 0;
                e5 = 0;
                e6 = 0;
                Calif = random(0, 10);
                Acc_correctivas = random(1, 5);
                const tarea = creaTarea(element.matricula,
                    tema,
                    materia,
                    forma_ensenanza,
                    Tipo_tarea,
                    Calif, e1, e2, e3, e4, e5, e6, Acc_correctivas);
                pool.query('INSERT INTO tareas set ?', [tarea]);
            });
            break;
        case 6:

            almnos.forEach(element => {
                e1 = random(0, 5);
                e2 = random(0, 5);
                e3 = random(0, 5);
                e4 = random(0, 5);
                e5 = random(0, 5);
                e6 = 0;
                Calif = random(0, 10);
                Acc_correctivas = random(1, 5);
                const tarea = creaTarea(element.matricula,
                    tema,
                    materia,
                    forma_ensenanza,
                    Tipo_tarea,
                    Calif, e1, e2, e3, e4, e5, e6, Acc_correctivas);
                pool.query('INSERT INTO tareas set ?', [tarea]);
            });
            break;
    }
}

router.post('/show', async(req, res) => {
    await creaTask();
    res.redirect('/cursos');
})
module.exports = router;