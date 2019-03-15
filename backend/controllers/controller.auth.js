const User = require('../models/model.users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//login with authentication
module.exports.login = function(req, res, next){
    const { email, password } = req.body;
    //simple validation
    if ( !email || !password){
        return res.status(400).json({msg: "Please enter all fields"});
    }
    // check existing user
    User.findOne({email})
    .then(user => {
        if(!user) return res.status(400).json({msg: "Invalid credentials"});

        //validate password
        bcrypt.compare(password, user.password)
        .then(isMatch => {
            if(!isMatch) return res.status(400).json({msg: 'Invalid credentials'});

             //distribute JWT for login user
             jwt.sign(
                {id :user.id},
                process.env.secret_key,
                { expiresIn: '1h'},
                (err, token) => {
                    if(err) throw err;
                    res.json({
                        token, //i think it's for localStorage in frontend
                        user: {
                            id: user.id,
                            name: user.name,
                            email: user.email
                        }
                    });
                }
            );
        })
    })
}
//response user info, api/auth/user
module.exports.getUserInfo = (req, res) => {
    User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user));
}