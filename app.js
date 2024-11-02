var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/**
 * SERVING STATIC FILES
 * To serve static files such as css, images, use a built-in middleware function, express.static().
 * files that are in public folder can be loaded.
 */
app.use(express.static(path.join(__dirname, 'public')));

//To call the multiple static assets directories, call the express.statis() multiple time with desired paths.
// app.use(express.static(path.join(__dirname, 'files')));


/**
 * ROUTING
 * Routing refers to how an application's endpoints(URIs) responds to client requests.
 * e.g. app.method(path, handler function)
 * here:
 * 1. app is an instance of express.
 * 2. method is an HTTP request method, such as get, post, put, delete
 * 3. path refers to the path on the server.
 * 4. handler function is the function that will be executed when the path and method matches.

 * routing functions can have more than one callback function as arguement, then it becomes important to provide next as
 * an argument to the callback function and then call next() within the body of the function to hand off control to
 * the next callback.
 */
app.use('/', indexRouter);

/**
 * APP.ALL()
 * special routing method ALL is used to load middleware functions at a path for every HTTP request methods.
 * e.g. here, the below middleware function will load for every path of /users and for every HTTP request method. 
 */
app.all('/users', (req, res, next) => {
  console.log('Accessing the users section ...')
  next() // pass control to the next handler
})
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
