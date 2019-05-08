'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var CourseSchema = new Schema({
    ownerId: String,
    department: String,
    courseNum: String,
    section: String,
    term: String,
    year: String,
    room: String,
    building: String,
    startDate: Number,
    endDate: Number,
    id: String,
    students: [{}]
});

module.exports = mongoose.model('Courses', CourseSchema);
