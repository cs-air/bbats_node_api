'use strict';
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },

    userId: Number,
    firstName: String,
    lastName: String,
    department: String,
    title: String,
    phone: String,
    office: String
});

UserSchema.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    });
});

//authenticate input against database
/* eslint-disable */
UserSchema.statics.authenticate = function (email, password, callback) {
    User.findOne({ email: email }, function (err, user) {
        console.log(err);
        console.log(user);
        if (err) {
            return callback(err, null);
        
        
        } else if (user){

            bcrypt.compare(password, user.password, function (err, result) {
                if (result === true) {

                    return callback(null, user);
                }

                return callback("d", null);

            });
        } else  {
            var errr = new Error('User not found.');

            return callback(errr, null);
        }
        //return callback(null, null);
        
    })

};
/* eslint-enable */

module.exports = mongoose.model('Users', UserSchema);