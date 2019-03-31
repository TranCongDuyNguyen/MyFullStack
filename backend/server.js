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

client.on("connect", function () {
	console.log("MQTT connected");
});

client.on("error", function (err) {
	console.log(err);
	client.end();
})

client.subscribe('n', function (err) {
	console.log(err);
});
client.subscribe('n/torque', function (err) {
	console.log(err);
})
client.subscribe('n/status', function (err) {
	console.log(err);
})

//trending initial var
let torqueBuffer = [{
	torque: 0,
	time: 0
}];
let ampereBuffer = [{
	ampere: 0,
	time: 0
}];
let torqueObj = {};
let ampereObj = {};
let time = 0;
//trending MQTT transfer
client.on("message", function (topic, message) {
	if (topic === "n/torque") {
		time += 1;

		torqueObj = {
			...torqueObj,
			torque: JSON.parse(message.toString()).torque
		};
		torqueObj.time = time;

		torqueBuffer.push(torqueObj);
		if (torqueBuffer.length >= 10) {
			torqueBuffer.splice(0, 1)
		}

		ampereObj = {
			...ampereObj,
			ampere: JSON.parse(message.toString()).ampere
		};
		ampereObj.time = time;

		ampereBuffer.push(ampereObj);
		if (ampereBuffer.length >= 10) {
			ampereBuffer.splice(0, 1)
		}
	}

})
//doughnut MQTT, io transfer and trend io transfer
io.on('connection', function (socket) {
	console.log('server-side socket connected');

	//doughnut
	client.on("message", function (topic, message) {
		if (topic === "n") {
			socket.emit("apiTData", JSON.parse(message.toString()));
		}
	});
	//status
	client.on("message", function(topic, message) {
		if (topic === "n/status") {
			socket.emit("apiStatus", message.toString());
			console.log(message.toString());
		}
	})

	let id1 = setInterval(function () {
		//console.log(torqueBuffer);
		socket.emit("apiTorque", torqueBuffer);
		socket.emit("apiAmpere", ampereBuffer);
	}, 11000);

	socket.on("disconnect", () => {
		time = 0;
		clearInterval(id1);
		console.log("Disconnect");
	});
});




