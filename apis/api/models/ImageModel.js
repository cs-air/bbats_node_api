'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ImageSchema = new Schema({
    filename: String,
    originalName: String,
    classId: String,
    date: {type: Date,
         default: Date.now()}

});

module.exports = mongoose.model('Images', ImageSchema);
