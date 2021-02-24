const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');


const pool = require('../database');
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
}

router.get('/show', (req, res) => {
    res.render('cursos/form2');
});


const random = (min, max) => {
    return Math.floor((Math.random() * (max - min)) + min);
}



async function envioMail(matriculasReprobados) {
    try {
        const transporte = nodemailer.createTransport({
            pool: true,
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: "arturo.cardona107@gmail.com",
                pass: "ohoerpnnpjppwsqy",
            },
        });
        let info = await transporte.sendMail({
            from: '"Cuidado puedes reprobar 👻" <arturo.cardona107@gmail.com>', // sender address
            to: "jafa001te@gmail.com", // list of receivers
            subject: "Tus tareas estan incorrectas", // Subject line
            text: matriculasReprobados, // plain text body
            html: "<b>Tu promedio es de " + matriculasReprobados + "</b>", // html body
        });
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        //transporte.close();
    } catch (err) {}
    console.log('Se envio correo');
}


async function insertTask({ almnos }, tema, Tipo_tarea) {
    let Acc_correctivas;
    const materia = 1;
    //definición de errores
    const errResumen = [
        [40, 30, 20, 10, 0],
        [20, 14, 7, 0],
        [30, 20, 10, 0],
        [10, 6, 3, 0]
    ];
    const errEnsayo = [
        [30, 20, 10, 0],
        [30, 25, 20, 0],
        [40, 30, 20, 10]
    ];
    const errRepTecnico = [
        [10, 5, 0],
        [10, 5, 0],
        [30, 20, 10],
        [20, 10, 0],
        [20, 10, 0]
    ];
    const errMapaConceptual = [
        [50, 30, 10, 0],
        [50, 30, 0]
    ];
    const errCodePrograma = [10, 9, 8, 7, 6, 5];


    let forma_ensenanza = random(1, 11);
    let errores = [0, 0, 0, 0, 0, 0];
    let Calif;
    let porcentaje = 0.4 * almnos.length;
    let count = 0;
    //Tipo_tarea = 1;
    switch (Tipo_tarea) {
        case 1:

            Acc_correctivas = random(1, 5); //resumen
            almnos.forEach(element => {
                Calif = 0;
                if (count < porcentaje) { //alumnos con errores
                    for (i = 0; i < errResumen.length; i++) {
                        let index = random(0, errResumen[i].length);
                        Calif += errResumen[i][index];
                        errores[i] = index;
                    }
                    Calif /= 10;


                } else { //alumnos sin errores
                    errores = [0, 0, 0, 0, 0, 0];
                    Acc_correctivas = 0;
                    Calif = 10;
                }
                // insertado de tareas
                const tarea = creaTarea(element.matricula,
                    tema,
                    materia,
                    forma_ensenanza,
                    Tipo_tarea,
                    Calif, errores[0], errores[1], errores[2], errores[3],
                    errores[4], errores[5], Acc_correctivas);
                pool.query('INSERT INTO tareas set ?', [tarea]);
                count++;
            });
        case 2:
            Acc_correctivas = random(1, 5); //Ensayo
            almnos.forEach(element => {
                Calif = 0;
                if (count < porcentaje) { //alumnos con errores
                    for (i = 0; i < errEnsayo.length; i++) {
                        let index = random(0, errEnsayo[i].length);
                        Calif += errEnsayo[i][index];
                        errores[i] = index;
                    }
                    Calif /= 10;

                } else { //alumnos sin errores
                    errores = [0, 0, 0, 0, 0, 0];
                    Acc_correctivas = 0;
                    Calif = 10;
                }
                // insertado de tareas
                const tarea = creaTarea(element.matricula,
                    tema,
                    materia,
                    forma_ensenanza,
                    Tipo_tarea,
                    Calif, errores[0], errores[1], errores[2], errores[3],
                    errores[4], errores[5], Acc_correctivas);
                pool.query('INSERT INTO tareas set ?', [tarea]);

                count++;
            });
        case 3:
            Acc_correctivas = random(1, 5); //reporte tecnico
            almnos.forEach(element => {
                Calif = 0;
                if (count < porcentaje) { //alumnos con errores
                    for (i = 0; i < errRepTecnico.length; i++) {
                        let index = random(0, errRepTecnico[i].length);
                        Calif += errRepTecnico[i][index];
                        errores[i] = index;
                    }
                    Calif /= 10;

                } else { //alumnos sin errores
                    errores = [0, 0, 0, 0, 0, 0];
                    Acc_correctivas = 0;
                    Calif = 10;
                }
                // insertado de tareas
                const tarea = creaTarea(element.matricula,
                    tema,
                    materia,
                    forma_ensenanza,
                    Tipo_tarea,
                    Calif, errores[0], errores[1], errores[2], errores[3],
                    errores[4], errores[5], Acc_correctivas);
                pool.query('INSERT INTO tareas set ?', [tarea]);

                count++;
            });
        case 4:
            Acc_correctivas = random(1, 5); //mapa conceptual
            almnos.forEach(element => {
                Calif = 0;
                if (count < porcentaje) { //alumnos con errores
                    for (i = 0; i < errMapaConceptual.length; i++) {
                        let index = random(0, errMapaConceptual[i].length);
                        Calif += errMapaConceptual[i][index];
                        errores[i] = index;
                    }
                    Calif /= 10;

                } else { //alumnos sin errores
                    errores = [0, 0, 0, 0, 0, 0];
                    Acc_correctivas = 0;
                    Calif = 10;
                }
                // insertado de tareas
                const tarea = creaTarea(element.matricula,
                    tema,
                    materia,
                    forma_ensenanza,
                    Tipo_tarea,
                    Calif, errores[0], errores[1], errores[2], errores[3],
                    errores[4], errores[5], Acc_correctivas);
                pool.query('INSERT INTO tareas set ?', [tarea]);

                count++;
            });
        case 5:
            Acc_correctivas = random(1, 5); //codigo programa
            almnos.forEach(element => {
                Calif = 0;
                if (count < porcentaje) { //alumnos con errores
                    for (i = 0; i < errCodePrograma.length; i++) {
                        let index = random(0, errCodePrograma[i].length);
                        Calif += errCodePrograma[index];
                        errores[i] = index;
                    }
                    Calif /= 10;

                } else { //alumnos sin errores
                    errores = [0, 0, 0, 0, 0, 0];
                    Acc_correctivas = 0;
                    Calif = 10;
                }
                // insertado de tareas
                const tarea = creaTarea(element.matricula,
                    tema,
                    materia,
                    forma_ensenanza,
                    Tipo_tarea,
                    Calif, errores[0], errores[1], errores[2], errores[3],
                    errores[4], errores[5], Acc_correctivas);
                pool.query('INSERT INTO tareas set ?', [tarea]);

                count++;
            });
    }



}


async function creaTask() {
    const almnos = await pool.query('SELECT * FROM alumno');
    const valTem = (await pool.query('SELECT max(tema) as tema FROM tareas'));
    let tema;
    valTem.forEach(element => {
        tema = element.tema;
        tema++;
    });
    let Tipo_tarea = random(1, 5);
    await insertTask({ almnos }, tema, Tipo_tarea);
    //creacion de matriculas reprobadas
    let matriculasReprobados = "5.3";



}

async function promedios() {

    const promedios = await pool.query(
        'SELECT t.matricula, AVG(t.Calif) as Promedio ' +
        'FROM tareas t ' +
        'GROUP BY (t.matricula);'
    );
    //envioMail(10);
    try {
        promedios.forEach(element => {
            if (element.Promedio > 0) {
                envioMail(element.Promedio.toString());
                console.log(element.Promedio);

            }


        });
    } catch (err) {
        console.log(err)
    }



}


router.post('/show', async(req, res) => {

    //envioMail("10");
    await creaTask();
    await promedios();
    res.redirect('/cursos');
})
module.exports = router;