// GITHUB transportesnodeTM

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config();// para que cargue los datos del .env
var session = require('express-session');

var indexRouter = require('./routes/index');
var nosotrosRouter = require('./routes/nosotros'); // nosotros.js
var serviciosRouter = require('./routes/servicios');//servicios.js
var galeriaRouter = require('./routes/galeria'); //galeria.js
var novedadesRouter = require('./routes/novedades'); //novedades.js
var contactoRouter = require('./routes/contacto'); // contacto.js
var loginRouter = require('./routes/admin/login'); // admin/login.js
var adminNovedadesRouter = require('./routes/admin/novedades'); //admin/novedades.js

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'askjsurhfdjfhsldñ234j43i5usdklrt',
  resave: false,
  saveUninitialized: true
  // cookie: { maxAge: 60000 }
  //  cookie: { maxAge: null }
}))

secured = async function (req, res, next) {
  try {
    console.log(req.session.id_usuario);

    if (req.session.id_usuario) {
      next()
    } else {
      res.redirect('/admin/login')
    }
  } catch (error) {
    console.log(error)
  }
} // cierra secured


app.use('/', indexRouter);
app.use('/nosotros', nosotrosRouter);
app.use('/servicios', serviciosRouter);
app.use('/galeria', galeriaRouter);
app.use('/novedades', novedadesRouter);
app.use('/contacto', contactoRouter);
app.use('/admin/login', loginRouter);
app.use('/admin/novedades', secured, adminNovedadesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
