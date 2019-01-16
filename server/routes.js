var router = require("express").Router();
var fs = require("fs");
var uuid = require("node-uuid");
var data = require("./data.json");
var msg = require("./msgs.json");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var jwt = require("jwt-simple");
var secret = "jgwhtdfjyqwdgv";


var users = [
	{
		name: "Peter",
		pwd: "qwerty"
	},
	{
		name: "Anna",
		pwd: "12345"
	}
];

passport.use( new LocalStrategy({
    usernameField: 'name',
    passwordField: 'pwd'
  }, function(username, password, done){
	console.log("localCheck");

	var uIndex = users.findIndex( function(user){
			return user.name == username && user.pwd == password
		});
	if(uIndex !== -1){
			done(null, users[uIndex]);
		}
		else {
			done(null, false);
		}
} ));

router.use( passport.initialize() );
		
		
router.post("/admin", function(req, res, next){
	console.log(req.body);
	next();
}, passport.authenticate("local", {session: false}), function(req, res){
	res.json(req.user);
});

// Creating a JS Web Token
router.post("/api/auth", function(req, res, next){

	var uName = req.body.name;
	var uPwd = req.body.password;

	var userIndex = users.findIndex(function(item){
		return item.name === uName;
	});

	if(userIndex !== -1){
		console.log(`${uPwd} & ${users[userIndex].pwd}`);

		if(users[userIndex].pwd === uPwd) {
			var dataObj = {
					user: users[userIndex],
					iat: new Date().getTime(),
				}
				var token = jwt.encode(dataObj, secret);
				res.json({token: token, name: users[userIndex].name});
		}
		else {
			res.sendStatus(401);
		}
	}
	else {
		res.sendStatus(401);
	}

	



	// 	bcrypt.compare(uPwd, users[userIndex].pwd, function(err, result){
	// 		if(err){
	// 			return next(err)
	// 		}
	// 		if(result){
	// 			var dataObj = {
	// 				user: users[userIndex],
	// 				iat: new Date().getTime(),
	// 			}
	// 			var token = jwt.encode(dataObj, secret);
	// 			res.json({token: token});
	// 		}
	// 		else {
	// 			res.sendStatus(401);
	// 		}
	// 	});
	// }
	// else {
	// 	return sendStatus(401);
	// }

});


// router.get("/", function(req, res){
// 	console.log(data.chats);
// 	res.render("index", {
// 		title: "Chats page",
// 		chatsArr: data.chats
// 	});
// });


router.get("/api", function(req, res){
	console.log(req.url);
	res.send(data);
});

router.get("/api/:roomId/messages", function(req, res){
	var roomId = req.params.roomId;
	if( msg.messages.findIndex(function(room){
		return room.roomId === roomId
	}) !== -1 ) {
		var roomMessages = msg.messages.filter(function(item){
			return item.roomId === roomId;
		});	
		res.json(roomMessages);
	}
	else {
		res.sendStatus(404);
	}
	
});

router.post("/api/addmessage", function(req, res){
	var newMsgObj = {
		text: req.body.text,
		roomId: req.body.roomId,
		userId: req.body.userId
	};
	var arr = [...msg.messages];
	arr.push(newMsgObj);
	msg.messages = arr;
	fs.writeFile("./msgs.json", JSON.stringify(msg), function(err){
		if(!err){
			res.json(msg.messages);
		}
	});	
	
});

var dataObject = {
	cars: [
		{
			make: "MB",
			color: "gold"
		},
		{
			make: "Lincoln",
			color: "white"
		},
		{
			make: "BMW",
			color: "yellow"
		},
	],

	motos: [
		{
			make: "HD",
			color: "gold"
		},
		{
			make: "Yamaha",
			color: "white"
		},
		{
			make: "Kawasaki",
			color: "yellow"
		},
	]
}


router.get("/goods/:id", function(req, res){
	res.json(dataObject[req.params.id]);
});


router.post("/fbdata", function(req, res){
	var jsonObj = req.body;	
	console.log(jsonObj);
	fs.writeFile("./fbdata.json", JSON.stringify(jsonObj), function(err){
		if(!err){
			res.sendStatus(200);
			console.log(jsonObj);
		}
	});
});

router.get("/fbdata", function(req, res){
	fs.readFile("./fbdata.json", "utf-8", function(err, file){
		if(!err){
			res.json(file);
		}
	})
});

module.exports = router;
