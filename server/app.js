let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');

let index = require('./routes/index');
let stories = require('./routes/stories');
let comments = require('./routes/comments');

let app = express();

// view engine setup - установка шаблонизатора
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
// app.disable('view cache');
// app.disable('etag');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
// if(env.app.get('env') === 'development') {
//   app.use(express.static(path.join(__dirname, 'public')));
// } else {
//   //app.use(express.static(path.join(__dirname, '../client/build')));
// }

app.use(function (req, res, next) {
    // res.setHeader("Expires", 0);
    // res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    // res.setHeader("Pragma", "no-cache");
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

app.use('/', index);
app.use('/stories', stories);
app.use('/comments', comments);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
