CREATE DATABASE cursos;

USE cursos;

CREATE TABLE users(
    id INT(11) NOT NULL,
    userName VARCHAR(16) NOT NULL,
    pass VARCHAR(20) NOT NULL
);

ALTER TABLE users
ADD PRIMARY KEY (id);

ALTER TABLE users
MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;


CREATE TABLE tareas(
    id_tarea INT(9) NOT NULL,
    matricula INT(9) NOT NULL,
    tema INT(1) NOT NULL,
    Materia INT(1) NOT NULL,
    forma_ensenanza INT(2) NOT NULL,
    Tipo_tarea INT(1) NOT NULL,
    Calif INT(2) NOT NULL,
    Err_cometido1 INT(2) NOT NULL,
    Err_cometido2 INT(2) NOT NULL,
    Err_cometido3 INT(2) NOT NULL,
    Err_cometido4 INT(2) NOT NULL,
    Err_cometido5 INT(2) NOT NULL,
    Err_cometido6 INT(2) NOT NULL,
    Acc_correctivas INT(1) NOT NULL

);
ALTER TABLE tareas
ADD PRIMARY KEY (id_tarea);

ALTER TABLE tareas
MODIFY id_tarea INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;



CREATE TABLE alumno(
    matricula INT(9) NOT NULL
);

ALTER TABLE alumno
ADD PRIMARY KEY(matricula);

/*errores en  tareas*/

SELECT t.Tipo_tarea, 
(t.Err_cometido1  + t.Err_cometido2 + t.Err_cometido3 + 
t.Err_cometido4 + t.Err_cometido5 + t.Err_cometido6 ) as total
FROM tareas t
GROUP BY t.Tipo_tarea;


/* Reprobados en tareas */
SELECT t.tema, 
sum(if(t.Calif < 6, 1, 0)) as error1
FROM tareas t
GROUP BY t.tema;

/* Comparación entre dos secciones */
/*seccion 1*/
SELECT t.tema, t.Tipo_tarea, AVG(t.Calif)
FROM tareas t
INNER JOIN alumno a ON (t.matricula = a.matricula)
WHERE a.seccion = 1
GROUP BY t.tema, t.Tipo_tarea;
/*seccion 2*/

SELECT t.tema, t.Tipo_tarea, AVG(t.Calif)
FROM tareas t
INNER JOIN alumno a ON (t.matricula = a.matricula)
WHERE a.seccion = 2
GROUP BY t.tema, t.Tipo_tarea;



SELECT t.Tipo_tarea, 
(t.Err_cometido1  + t.Err_cometido2  + t.Err_cometido3 + ) as total
FROM tareas t
GROUP BY t.Tipo_tarea;