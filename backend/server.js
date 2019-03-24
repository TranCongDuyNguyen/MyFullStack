require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5000;
const http = require('http').Server(app)
const io = require('socket.io')(http); //IO Socket
const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://127.0.0.1:1883');

http.listen(port, function(){
    console.log(`Server starts on port ${port}`);
  });

/* <====================================MQTT CONNECTION AND SUBSCRIBE==================================> */
client.on("connect", function () {
	console.log("MQTT connected");
	client.subscribe('tcdn', function (err) {
		console.log(err);
	});
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

/*<===================================IO SOCKET=============================================================>*/
let intervalId;
io.on('connection', function (socket) {
	console.log('server-side socket connected');
	if (intervalId) {
		clearInterval(intervalId);
	}
	socket.on("subscribeTimer", (interval) => {
		console.log('client is subscribing timer with interval');
		intervalId = setInterval(
			() => {
				client.on("message", function(topic, message) {
                    socket.emit("dataFromApi", JSON.parse(message));
                    console.log(message);
                })
				console.log('emitted');
			}, interval
		)
	});
	socket.on("disconnect", () => {
		console.log("Disconnect");
		clearInterval(intervalId);
	})
	// client.on("message", function(topic, message) {
	// 	socket.emit("numbApi", message.toString());
	// })
});

