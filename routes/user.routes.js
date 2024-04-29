const express = require('express');
const { userModel } = require('../model/user.model');
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jsw = require("jsonwebtoken");


userRouter.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await userModel.findOne({ email: email });

        if (user) {
            res.status(200).send({ message: 'User already exists please try to login' });
        } else {
            bcrypt.hash(password, 5, async (err, hashedpass) => {
                if (err) {
                    res.status(404).send({ message: 'Password hashing failed', err: true });
                } else {
                    const newUser = new userModel({
                        name,
                        email,
                        password: hashedpass
                    })
                    await newUser.save();
                    res.status(201).send({ message: 'User created successfully', err: false });
                }
            })
        }
    } catch (error) {
        console.log(error);
        res.status(404).send({ message: error, err: true });
    }

});

userRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email: email });
        if (!user) {
            res.status(200).send({ message: 'User does not exist Register first' });
        }
        else {
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    res.status(404).send({ message: 'Password does not match', err: true });
                } else {
                    if (result) {
                        const token = jsw.sign({ userID: user._id, name: user.name }, "masai");
                        res.status(200).send({ message: 'User logged in successfully', token: token });
                    } else {
                        res.status(404).send({ message: 'Password does not match', err: true });
                    }
                }
            })
        }
    } catch (error) {
        log(error);
        res.status(404).send({ message: error, err: true });
    }
})

module.exports = {
    userRouter
}