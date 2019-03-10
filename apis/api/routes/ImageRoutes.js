'use strict';
module.exports = function(app) {
  var Image = require('../controllers/ImagesController');

  // course Routes
  app.route('/images')
    .get(Image.getImages)
    .post(Image.createImage);


  app.route('/images/:filename')
    .get(Image.getImage)
    
};
