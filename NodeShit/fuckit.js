var console = require("console");
var http = require("http");
var utils = require("util");
var url = require("url");
var fs = require("fs");
var events = require("events");

var tickDelay = 20;

var sim = 
{
	snap: {v:0},
	lastTime: new Date().getTime(),
	nextTime: 0,
	listeners: [],
	Tick: function() {
		sim.snap.v = sim.snap.v + 1;
	},
};
sim.nextTime = sim.lastTime + tickDelay;

function Tick()
{
	sim.Tick();
	sim.lastTime = sim.nextTime;
	sim.nextTime = sim.nextTime + tickDelay;
	var snapJson = JSON.stringify(sim.snap);
	while (true) {
		var s = sim.listeners.pop();
		if (s === undefined) {
			break;
		}
		s.response.statusCode = 200;
		s.response.setHeader("Content-Type", "text/json");
		s.response.end(snapJson);
	}
	
	setTimeout(Tick, sim.nextTime - new Date().getTime());
}
setTimeout(Tick, sim.nextTime - new Date().getTime());

var server = http.createServer();
server.listen(15000);

console.log("http://localhost:15000");


server.on("request", function requestHandler(request, response)
{
	var requestUrl = url.parse(request.url);

	// console.log(request.method);
	// console.log(request.url);
	// console.log(request.headers);
	// console.log(requestUrl);
	
	var body = "";
	if (requestUrl.pathname === "/" && request.method === "GET")
	{
		console.log("App file request.");
		body = fs.readFile("app.html", {encoding:"utf-8",flag:"r"}, function (err, data)
		{
			response.statusCode = 200;
			response.setHeader("Content-Length", data.length);
			response.setHeader("Content-Type", "text/html");
			response.end(data);
		});
	}
	else if (requestUrl.pathname === "/api/ass" && request.method === "POST")
	{
		//console.log("Service post.");
		var body = "";
		var input = {};
		request.on("data", function (data) { body += data; });
		request.on("end", function (data) { 
			input = JSON.parse(body); 
			//console.log(input);
			
			sim.listeners.push({response: response, input: input});
			
			// response.statusCode = 200;
			// response.setHeader("Content-Type", "text/json");
			// response.data = sim.snap;
			// response.end();
		});
	}
	else
	{
		console.log("Bad request.");
		console.log(request.method);
		console.log(request.url);
		response.statusCode = 404;
		response.setHeader("Content-Length", 0);
		response.setHeader("Content-Type", "text/html");
		response.end();
	}
});


