/* ========================================================== 
Michael Cullen
server.js


Ref.
https://github.com/joelennon/bluemixpolls

============================================================ */

'use strict';

/* ========================================================== 
External Modules/Packages Required
============================================================ */
var express = require('express');
var http = require('http');
var path = require('path');
var logger = require('morgan');
var errorHandler = require('errorhandler');
var bodyParser = require('body-parser');
require('colors');
var methodOverride = require('method-override');
var mongoose = require('mongoose'); 				//mongoose for mongodb

var app = express();								//create a new application with express
var http = require('http').Server(app);
var io = require('socket.io')(http);


/* ========================================================== 
Internal App Modules/Packages Required
============================================================ */
var database = require('./server/config/database'); 	//database config - i.e. Local/remote MongoDB URL

var routes = require('./server/routes.js');				//Exchange routes & mongoose interaction with DB

var socketModule = require('./server/socket.js');



/*
* Export sio module so socket.io can be used in other modules
*/
module.exports.sio = io;   //ADDED this



/* ========================================================== 
Port the server will listen on
============================================================ */
app.set('port', process.env.PORT || 3000);




/********************************************************************
Run MongoDB in safe mode - wait for INSERT operations to succeed
important when altering passwords.
*********************************************************************/

/* ========================================================== 
Connect to mongoDB database - DB URL specified in database.js
============================================================ */
mongoose.connect(database.url, {safe:true}, function (err, res) {
  if (err) { 
    console.log ('ERROR connecting to: ' + database.url + '. ' + err);
  } 
  else {
    console.log ('Successfully connected to: ' + database.url);
  }
});


/* ===================================================================
Use Middleware
==================================================================== */
//app.use(express.favicon());
app.use(bodyParser.json());     //parse application/json

app.use(bodyParser.urlencoded({ 
  extended: true 
}))

app.use(methodOverride());

/* ==========================================================
serve the static index.html from the public folder
============================================================ */
app.use(express.static(__dirname + '/public/src'));
app.use(express.static(__dirname + '/public'));


//app.use(express.static(__dirname + '/public/dist'));


//development only
if (app.get('env') === 'development') {
    app.use(errorHandler());
    app.use(logger('dev'));  //log every request to the console in dev
}

//production only
if (app.get('env') === 'production') {
    // TODO
};





// Handle Errors gracefully
app.use(function(err, req, res, next) {
	if(!err) 
		return next();
	
	console.log(err.stack);
	res.json({error: true});
});


/* ========================================================== 
ROUTES - using Express
============================================================ */
routes(app);


/* ========================================================== 
Start server listening on a port
============================================================ */
http.listen(app.get('port'), function(req, res) {
	console.log('Express server listening on port ' .green + app.get('port'), app.settings.env );
});


/*
 * Connect to Socket.io - 
 * Enable socket.io operations in module sockModule inside the sockWorker function 
 */
io.on('connection', function (socket) {
  socketModule.sockWorker(socket, io);
});



