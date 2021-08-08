const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.create_user =  (req, res, next) => {
    User.find({ email: req.body.email })
    .exec()
    .then( user => {
        if (user.length >= 1) {
            return res.status(409).json({
                message: 'email exists'
            });
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                } else {
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash
                    });
                    user
                    .save()
                    .then( result => {
                        res.status(201).json({
                            message: 'user created',
                            result: result
                        });
                    })
                    .catch( err => {
                        res.status(500).json({
                            error: err
                        });
                    });
                }
            });

        }
    })
    .catch( err => {
        res.status(500).json({
            error: err
        });
    });
}

exports.login_user = (req, res, next) => {
    User.findOne({ email: req.body.email })
    .exec()
    .then(user => {
        if ( !user ){
            return res.status(401).json({
                message: 'Auth failed'
            });
        }
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (err) {
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
            if (result) {
                bcrypt.hash(user.email, 12)
                .then( hashed => {
                    const token = jwt.sign({
                        userId: user._id,
                        email: hashed
                    },
                    process.env.JWT_KEY,
                    {
                        expiresIn: "1h"
                    });
                    return res.status(200).json({
                        message: 'Auth Successful',
                        token: token
                    });
                });         
            }
            else {
                res.status(401).json({
                    message: 'Auth failed'
                });
            }
            
        });
    })
    .catch( err => {
        res.status(500).json({
            error: err
        });
    });
}


exports.delete_user = (req, res, next) => {
    User.deleteOne({_id: req.params.userId})
    .exec()
    .then ( result => {
        res.status(200).json({
            message: "user deleted"
        })
    })
    .catch( err => {
        res.status(500).json({
            error: err
        });
    });
}