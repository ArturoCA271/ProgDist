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

