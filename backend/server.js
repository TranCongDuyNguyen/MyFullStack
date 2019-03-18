require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');



const app = express();
const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Hello") );

//Body-parser to read body req
app.use(express.json()); // for parsing application/json, express provide its own body-parser

//Use routes
app.use('/api/users', require('./routes/api/route.users'));
app.use('/api/items', require('./routes/api/route.items'));
app.use('/api/auth', require('./routes/api/route.auth'));

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