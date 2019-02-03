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

exports.createImage = function(req, res, next) {
    let newImage = new Image();
    console.log(req);
    console.log(req.params);
    console.log(req.image);
    newImage.filename = req.file.filename;
    newImage.originalName = req.file.originalName;
    newImage.classId = req.body.classId;

    newImage.save(function(err, image) {
        if (err) {
            return res.sendStatus(400);
        }
        res.status(201).send({ image });
    });
};