'use strict';


var mongoose = require('mongoose'),
    Course = mongoose.model('Courses');

exports.getCourses = function (req, res) {
    console.log('hiii');
    let userId = req.query.userId;
    console.log(userId);
    if (userId) {
        Course.find({ownerId: req.query.userId}, function(err, courses) {
            if (err) {
                res.send(err);
            } else {
                res.json(courses);
            }
        });

    } else {
        console.log('id not found');
        Course.find({}, function (err, course) {
            if (err) {
                res.send(err);
            } else {
                res.json(course);
            }
        });
    }
    
};

exports.createCourse = function (req, res) {

    console.log(req.body);
    if (req.body.ownerId === null || req.body.department === null || req.body.courseNum === null || req.body.section === null || req.body.term === null || req.body.year === null || req.body.room === null || req.body.building === null || req.body.startDate === null || req.body.endDate === null) {
        res.status(400).send({ message: 'Missing fields' });
    } else {
        let newCourse = new Course(req.body);
        newCourse.save(function (err, course) {
            if (err) {
                res.send(err);
            } else {
                console.log(course);
                res.status(200).send({status: 200, data: course});
            }
        });
    }


};


exports.getCourse = function (req, res) {
    Course.findById(req.params.userid, function (err, course) {
        if (err) {
            res.send(err);
        } else {
            res.json(course);
        }
    });
};

exports.updateCourse = function (req, res) {
    Course.findOneAndUpdate({ _id: req.params.courseNum }, req.body, { new: true }, function (err, course) {
        if (err) {
            res.send(err);
        } else {
            res.json(course);
        }
    });
};

exports.deleteCourse = function (req, res) {
    Course.remove({
        _id: req.params.courseNum
    }, function (err, course) {
        if (err) {
            res.send(err);
        } else {
            res.json({ message: 'Course Successfully Deleted!' });
        }
    });
};