const express = require('express');
const morgan = require('morgan');
const hand = require('express-handlebars');
const path = require('path');

const app = express();

//configuracion
app.set('port', 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', hand({
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars'),
}));
app.set('view engine', '.hbs');

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// variables globales
app.use((req, res, next) => {
    next();
})

//routes
app.use(require('./routes/'));
app.use('/cursos', require('./routes/cursos'));
app.use(require('./routes/autenticacion'));
app.use('/cursos', require('./routes/random'));
app.use('/cursos', require('./routes/matriculas'));
app.use('/cursos', require('./routes/Graficado'));
//public
app.use(express.static(path.join(__dirname, 'public')));

//iniciar aplicacion
app.listen(app.get('port'), () => {
    console.log('Servidor iniciado ', app.get('port'));
});