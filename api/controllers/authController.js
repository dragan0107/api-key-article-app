const User = require('../Models/User');
const jwt = require('jsonwebtoken');


//Token generator function that takes the user ID as a parameter.
const generateToken = id => {
    return jwt.sign({ id: id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}


//Function that creates the token and sends it in a cookie.
const createSendToken = (user, res) => {

    const token = generateToken(user._id);

    res.cookie('jwtCookie', token, {
        maxAge: process.env.JWT_EXPIRES_IN
    })

    res.status(200).json({
        status: "success",
        token
    });
}

exports.userRegister = async(req, res) => {

    const { username, email, password, passwordConfirm } = req.body;
    try {
        const newUser = await User.create({
            username: username,
            password: password,
            passwordConfirm: passwordConfirm,
            email: email
        });

        createSendToken(newUser, res);

    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err
        })
    }
}