const User = require('../Models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//process.env.JWT_EXPIRES_IN
//Token generator function that takes the user ID as a parameter.
const generateToken = id => {
    return jwt.sign({ id: id }, process.env.JWT_SECRET, {
        expiresIn: "1h"
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

    let token;

    jwt.verify(inputToken, process.env.JWT_SECRET, (err, decoded) => {

        if (!err) {
            token = decoded;
        } else {
            console.log(err);
        }

    });

    if (token) {

        try {
            const user = await User.findById(token.id);

            user._id = null;
            user.password = null;
            user.email = null;

            res.status(200).json({
                foundUser: user
            })

        } catch (err) {
            res.status(500).json({
                message: "User session has expired, please login in again!"
            })
        }
    } else {
        res.status(400).json({
            message: 'User session has expired, please login in again!'
        })
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

    if (!username || !password) {
        res.status(500).json({
            message: "You did not input all information"
        });
    }

    try {

        const user = await User.findOne({ username });

        if (!user) {
            res.status(404).json({
                message: "Wrong credentials!"
            });
        } else {

            const validate = await bcrypt.compare(password, user.password);
            if (!validate) {
                res.status(404).json({ msg: "Wrong credentials!" })
            } else {
                createSendToken(user, res);

            }
        }



    } catch (err) {
        console.log(err)
            // res.status(500).json({
            //     error: err
            // })
    }
}

exports.getUser = async(req, res) => {
    const { inputUser } = req.body;

    try {
        const userFound = await User.findOne({ username: inputUser });
        res.status(200).json({
            user: userFound.username
        })
    } catch (err) {
        res.status(400).json({
            message: "User not found, its free!"
        })
    }
}