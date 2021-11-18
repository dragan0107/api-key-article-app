const User = require('../Models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


//Token generator function that takes the user ID as a parameter.
const generateToken = id => {
    return jwt.sign({ id: id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}


//Function that creates the token and sends it in a cookie.
const createSendToken = (user, res) => {

    const token = generateToken(user._id);

    // res.cookie('jwtCookie', token, {
    //     maxAge: process.env.JWT_EXPIRES_IN
    // });
    user._id = null;
    user.password = null;
    user.email = null;

    res.status(200).json({
        status: "success",
        data: user,
        jwt: token
    });
}

exports.tokenCheck = async(req, res) => {
    const { inputToken } = req.body;

    const decoded = jwt.verify(inputToken, process.env.JWT_SECRET);

    try {
        const user = await User.findById(decoded.id);

        user._id = null;
        user.password = null;
        user.email = null;

        res.status(200).json({
            foundUser: user
        })

    } catch (err) {
        console.log(err);
    }
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
            error: err.message
        })
    }
}

exports.userLogin = async(req, res) => {

    const { username, password } = req.body;
    try {

        const user = await User.findOne({ username });
        if (!user) res.status(400).json({ msg: "Wrong credentials!" })

        const validate = await bcrypt.compare(password, user.password);
        if (!validate) res.status(400).json({ msg: "Wrong credentials!" });

        createSendToken(user, res);

    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err
        })
    }
}