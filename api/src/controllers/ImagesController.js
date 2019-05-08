'use strict';

var jwt = require('jsonwebtoken');
var config = require('../../config');

var mongoose = require('mongoose'),
    Image = mongoose.model('Images');


exports.getImages = function (req, res, next) {
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

exports.getImage = function (req, res, next) {
    console.log("Get Image Called.");
    let filename = req.params.filename;
    console.log(filename);
    Image.findOne({ filename: filename }).lean().exec((err, image) => {
        if (err) {
            res.sendStatus(400);
        }

        res.json(image);
    });
};

exports.createImage = function (req, res, next) {
    console.log('Create Image Called.');
    if (!req.body.data) {
        return res.status(400).send({ error: 'Missing fields' });
    }

    console.log(req.body);
    let imageData = {
        filename: req.body.data.image,
        result: JSON.stringify(req.body.data.students),
        classId: req.body.data.image
    };
    let image = new Image(imageData);
    console.log(image)
    image.save(async (err, img) => {
        if (err && err.code === 11000) {
            try {
                console.log('Image already exists, updating.');

                let updated = await Image.updateOne({ filename: image.filename }, {$set: {"result": image.result}}).exec();
                console.log('Updated:');
                console.log(updated);
            } catch (e) { console.log(e); }
        } else {
            res.status(400);
            res.send(error);
        }
        res.status(201).send({ img });
    });
};

