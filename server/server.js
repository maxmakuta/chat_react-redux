var fs = require("fs");
var path = require("path");
var bodyParser = require("body-parser");
var express = require("express");
var uuid = require("node-uuid");
var routes = require("./routes");
//var passport = require("passport");

var app = express();

app.use(function(req, res, next){
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST");
	next();
});
app.use( bodyParser.urlencoded({extended: false}) );
app.use( bodyParser.json() );
//app.use( express.static("./public") );
app.use(routes);
app.set("view engine", "jade");


app.listen(6060, function(err){
	if(!err){
		console.log("Server is running at port 6060");
	}
})



