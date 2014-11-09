var ravendb = require('ravendb');
var express = require('express');
var app  = express();

var basePath = "";
if (process.env.PORT)
	// if you are hosting using iisnode this is the relative path to the root of the web app.
	var basePath = "/NodeChess";

app.use(basePath, express.static(__dirname + '/content'));

// configure the base path for the app
// every other route within this app should build off of the base path
var baseRouter = express.Router();

app.use(basePath,baseRouter);

baseRouter.route('/')
	.get(function(req, res){
		res.send("What?");
	});

baseRouter.route('/api/games')
	.get(function(req, res){
		res.json([{id:1,player1:{id:1,name:"player1"},player2:{id:2,name:"player2"}}]);
	});

baseRouter.route('/api/players')
	.get(function(req, res){
		res.json([{id:1,name:"player1"},{id:2,name:"player2"}]);
	});

app.listen(process.env.PORT || 15151);
