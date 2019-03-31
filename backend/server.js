require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5000;
const http = require('http').Server(app)
const io = require('socket.io')(http); //IO Socket
const mqtt = require('mqtt');

http.listen(port, function () {
	console.log(`Server starts on port ${port}`);
});

//Body-parser to read body req
app.use(express.json()); // for parsing application/json, express provide its own body-parser

//Use routes
app.use('/api/users', require('./routes/api/route.users'));
app.use('/api/items', require('./routes/api/route.items'));
app.use('/api/auth', require('./routes/api/route.auth'));
app.use('/api/motors', require('./routes/api/route.motors'));

/*
//Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    //Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}
*/

//connect to mongoDB
mongoose.connect(process.env.mongo_url, {
	useNewUrlParser: true,
	useCreateIndex: true
})
	.then(() => console.log('Connected to MongoDB'))
	.catch(err => console.log(err));

/*<===========================================IO SOCKET=======================================================>*/
/*<============================================MQTT CONNECTION AND SUBSCRIBE==================================> */

const client = mqtt.connect('mqtt://127.0.0.1:1883', {
	clientId: "my-client",
	username: "admin",
	password: "admin"
});

const client1 = mqtt.connect('mqtt://127.0.0.1:1883', {
	clientId: "my-client1",
	username: "admin",
	password: "admin"
});

client.on("connect", function () {
	console.log("MQTT connected");
});

client1.on("connect", function () {
	console.log("MQTT 1 connected");
});

client.on("error", function (err) {
	console.log(err);
	client.end();
})

client.subscribe('tcdn', function (err) {
	console.log(err);
});
client1.subscribe('tcdn/torque', function (err) {
	console.log(err);
})
//trending initial var
let dataBuffer = [{
	torque: 0,
	time: 0
}];
let data = {};
let time = 0;

client1.on("message", function (topic, message) {
	data = JSON.parse(message.toString());
	data.time = ++time;
	dataBuffer.push(data);
	if( dataBuffer.length >= 10 ) {
		dataBuffer.splice(0,1)
	}	
})

io.on('connection', function (socket) {
	console.log('server-side socket connected');


	client.on("message", function (topic, message) {
		socket.emit("apiMotorData", JSON.parse(message.toString()));
	});

	let id1 = setInterval(function() {
		console.log(dataBuffer);
		socket.emit("apiTorque", dataBuffer);
	}, 11000);

	socket.on("disconnect", () => {
		time = 0;
		clearInterval(id1);
		console.log("Disconnect");
	});
});

	
// client1.on("message", function (topic, message) {
// 	data = JSON.parse(message.toString());
// 	data.time = ++time;
// 	if( dataBuffer.length >= 10 ) {
// 		dataBuffer.splice(0,1)
// 	}
// 	dataBuffer.push(data);
// })


