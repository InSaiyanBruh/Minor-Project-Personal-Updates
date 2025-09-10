var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');   // ✅ Add this

var homeRouter = require('./routes/home');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var incidentsRouter = require('./routes/incidents');
var recentdisaster1Router = require('./routes/recentdisaster1');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Session setup
app.use(session({
  secret: 'super-secret-key', // change to env var in production
  resave: false,
  saveUninitialized: false,
  cookie: { 
    httpOnly: true, 
    secure: false,          // ❌ change to true if using HTTPS
    maxAge: 1000 * 60 * 60  // 1 hour session
  }
}));

app.use('/home', homeRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/incidents', incidentsRouter);
app.use('/recentdisaster1', recentDisaster1Router);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
