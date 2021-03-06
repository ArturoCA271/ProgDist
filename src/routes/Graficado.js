const express = require('express');
const router = express.Router();
const pool = require('../database');


router.get('/graficos', (req, res) => {
    res.render('cursos/graficas');
});




router.post('/graficos', async(req, res) => {
    let tipoGrafico = req.body.tipografico;
    let matrices;
    let mat = [],
        mat2 = [],
        mat3 = [];
    switch (tipoGrafico) {
        case '1':
            const errores = await pool.query(
                'SELECT t.Tipo_tarea, ' +
                '(t.Err_cometido1  + t.Err_cometido2 + t.Err_cometido3 + ' +
                't.Err_cometido4 + t.Err_cometido5 + t.Err_cometido6 ) as totalErrores ' +
                'FROM tareas t ' +
                'GROUP BY t.Tipo_tarea;');
            let count = 0;
            errores.forEach(element => {
                count++;
                mat.push(element.Tipo_tarea)
                mat2.push(element.totalErrores);
            });
            console.log(errores);
            matrices = {
                ejeX: mat,
                ejeY: mat2,
            };
            console.log(mat);
            break;
        case '2':
            const promedios = await pool.query('SELECT t.Tipo_tarea,' +
                'sum(if(t.Calif < 6, 1, 0)) as error1 ' +
                'FROM tareas t ' +
                'GROUP BY t.Tipo_tarea;');
            promedios.forEach(element => {
                mat.push(element.Tipo_tarea);
                mat2.push(element.error1);
            })
            matrices = {
                ejeX: mat,
                ejeY: mat2,
            };
            break;

        case '3':
            const compatativa = await pool.query('SELECT a.seccion, AVG(t.Calif) as Prom ' +
                'FROM tareas t ' +
                'INNER JOIN alumno a ON (t.matricula = a.matricula) ' +
                'GROUP BY a.seccion');
            compatativa.forEach(element => {
                mat.push(element.seccion);
                mat2.push(element.Prom);
            });
            matrices = {
                ejeX: mat,
                ejeY: mat2,
            };
            break
    }



    res.render('cursos/graficas', { matrices });


    //res.json({ route: 'cursos/graficas', element: mat });
});



module.exports = router;