'use strict';

var jwt = require('jsonwebtoken');
var config = require('../../config');

var mongoose = require('mongoose'),
    Image = mongoose.model('Images');


exports.getImages = function(req, res, next) {
    // use lean() to get a plain JS object
    // remove the version key from the response
    Image.find({}, '-__v').lean().exec((err, images) => {
        if (err) {
            res.sendStatus(400);
        }
 
        // Manually set the correct URL to each image
        for (let i = 0; i < images.length; i++) {
            var img = images[i];
            img.url = req.protocol + '://' + req.get('host') + '/images/' + img._id;
        }
        res.json(images);
    });
};

exports.getImage = function(req, res, next) {
    // use lean() to get a plain JS object
    // remove the version key from the response
    let filename = req.params.filename;
    console.log(filename);
    Image.findOne({filename: filename}).lean().exec((err, image) => {
        if (err) {
            res.sendStatus(400);
        }
 
        res.json(image);
    });
};

exports.createImage = function(req, res, next) {
    let newImage = new Image();
    console.log(req.body);
    newImage.filename = req.body.data.image;
    newImage.classId = req.body.classId;
    let result = req.body.data.students;
    newImage.result = JSON.stringify(result);

    newImage.save(function(err, image) {
        if (err) {
            return res.status(400).send({error: err});
        }
        res.status(201).send({ image });
    });
};