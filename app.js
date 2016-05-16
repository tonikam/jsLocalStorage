var http = require("http");
var static = require("node-static");
var _port = 8000;
 
var fileServer = new static.Server("./public",{
	defaultDocument: "index.html",							// default document to serve
	maxAge: 604000,  														// 7 days
});
 
http.createServer(
	function handleRequest(request, response) {
    fileServer.serve(request, response);
 }).listen(_port);
 console.log("Server running on port " + _port);