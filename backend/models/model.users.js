const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name: String,
    age: Number
})

var Users = mongoose.model("Users", userSchema, "users");

module.exports = Users;