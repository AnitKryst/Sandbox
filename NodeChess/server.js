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
		var db = ravendb('http://localhost:11011','NodeChess');
		db.getDocument('/games', function(err, result){
			if (err){
				console.error(err);
				res.status(404).send('Not found');
			}
			else
				res.json(result);
		});
	});

baseRouter.route('/api/players')
	.get(function(req, res){
		var db = ravendb('http://localhost:11011','NodeChess');
		db.getDocument('/players', function(err, result){
			if (err){
				console.error(err);
				res.status(404).send('Not found');
			}
			else
				res.json(result);
		});
	});

baseRouter.route('/api/player')
	.post(function(req,res){
		var db = ravendb('http://localhost:11011','NodeChess');
		db.saveDocument('/players', {'id':''} , function(err, result){
			if (err){
				console.error(err);
				res.status(503).send('Not found');
			}
			else
				res.json(result);
		});
	});

app.listen(process.env.PORT || 15151);
