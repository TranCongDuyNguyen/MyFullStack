const User = require('../models/model.users');

module.exports.fetchUsers = async function(req, res, next){
    var users = await User.find();
    res.json(users); 
}