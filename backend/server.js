require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const usersRoute = require('./routes/route.users');

const app = express();
const port = 5000;
app.listen(port, () => console.log("Hello") );


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use('/api/users', usersRoute);


mongoose.connect(process.env.mongo_url);