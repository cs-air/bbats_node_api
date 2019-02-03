'use strict';

var jwt = require('jsonwebtoken');
var config = require('../../config');

var mongoose = require('mongoose'),
    User = mongoose.model('Users');

exports.getUsers = function (req, res) {
    User.find({}, function (err, user) {
        if (err) {
            res.send(err);
        } else {
            res.status(200);
            res.json(user);
        }
    });
};

exports.createUser = function (req, res, next) {
    console.log(req.body);
    console.log(req.body.email);
    if (req.body.email === null || req.body.password === null || req.body.firstName === null || req.body.lastName === null || req.body.department === null || req.body.title === null || req.body.phone === null || req.body.office === null) {
        res.statusCode = 400;
        var error = new Error('Missing fields');

        return next(error);
    }
    let newUser = new User(req.body);
    newUser.save(function (err, user) {
        if (err) {
            if (err.code === 11000) {
                res.send({
                    'status': '400',
                    'message': 'User already exists.',
                    'statusText': 'Bad Request'
                });
            }

            return next(err);

        }
        res.status(200);
        res.json(user);
    });
};

exports.getUser = function (req, res) {
    console.log('*********************************************************');
    console.log(req.session);
    User.findById(req.params.userId, function (err, user) {
        console.log(err);
        console.log(user);
        if (err) {
            res.send(err);
        } else if (user === null) {
            res.status(404);
            res.json({
                'status': '404',
                'message': 'User not found'
            });

        } else {
            res.status(200);
            res.json(user);
        }
    });
};

exports.updateUser = function (req, res) {
    console.log(req.params.userId);
    console.log(req.body);
    User.findOneAndUpdate({ _id: req.params.userId }, {'firstName': req.body.firstName, 'lastName': req.body.lastName, 'department': req.body.department, 'title': req.body.title, 'phone': req.body.phone, 'office': req.body.office }, { new: true }, function (err, user) {
        if (err) {
            res.send(err);
        } else {
            res.status(200);
            console.log(user);
            res.json(user);
        }
    });
};

exports.deleteUser = function (req, res) {
    User.remove({
        _id: req.params.userId
    }, function (err, user) {
        if (err) {
            res.send(err);
        } else {
            res.status(200);

            res.json({ message: 'User Successfully Deleted!' });
        }
    });


};

/* POST Route for login */
exports.login = function (req, res, next) {
    if (req.body.email && req.body.password) {
        User.authenticate(req.body.email, req.body.password, function (error, user) {
            if (error || !user || !user._id) {
                var err = new Error('Wrong email or password.');
                err.status = 401;

                return next(err);
            }
            // create token
            let token = jwt.sign({ id: user._id }, config.secret, {
                expiresIn: 1000000000
            });

            res.status(200).send({
                userId: user._id,
                firstName: user.firstName,
                token: token,
                auth: true
            });

            // return res.redirect('/users');

        });
    } else {
        var err = new Error('All fields are required.');
        err.status = 400;

        return next(err);
    }
};

exports.logout = function (req, res, next) {
    if (req.session) {
        // delete session
        req.session.destroy(function (err) {
            if (err) {
                res.status(400);

                return next(err);
            }
            res.status(200);

            return res.json({ message: 'User Successfully Logged Out' });
        });
        
    }
};