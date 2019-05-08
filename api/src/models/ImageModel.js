'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ImageSchema = new Schema({
    filename: {type: String, default: `${new Date().getMonth() + 1}-${new Date().getDate()}-${new Date().getFullYear()}`},
    classId: String,
    result: String,
});

ImageSchema.index({filename: 1}, {unique: true});

module.exports = mongoose.model('Images', ImageSchema);
