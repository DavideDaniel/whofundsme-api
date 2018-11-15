const cors = require('cors');
// var methodOverride = require('method-override');
const bodyParser = require('body-parser');
// var cookieParser = require('cookie-parser');
// const path = require('path');
// var favicon = require('serve-favicon');

// var routes = require('../routes/index');
// var users = require('../routes/users');
const api = require('../routes/api');

module.exports = function ApiBuilder(app) {
  // view engine setup
  // app.set('views', path.join(__dirname, '../views'));
  app.set('view engine', 'jade');
  // uncomment after placing your favicon in /public
  // app.use(favicon(__dirname + '/public/favicon.ico'));
  app.use(cors());
  // app.use(methodOverride('_method'));
  app.use(bodyParser.json({
    extended: false,
  }));
  app.use(bodyParser.urlencoded({
    extended: false,
  }));
  // app.use(cookieParser());
  // app.use(express.static(path.join(__dirname, '../public')));
  // app.use('/', routes);
  // app.use('/users', users);
  app.use('/api', api);
  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  // error handlers
  // development error handler
  // will print stacktrace
  if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err,
      });
    });
  }
  // production error handler
  // no stacktraces leaked to user
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {},
    });
  });
};
