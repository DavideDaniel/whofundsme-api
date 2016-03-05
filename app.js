var express = require('express');
var app = express();
var config = require('./config/config.js');
config(app, express);

app.listen(3000);
console.log( "server listening on port: 3000" );

process.on('unhandledRejection', function (err, p) {
  console.error(err.stack)
})