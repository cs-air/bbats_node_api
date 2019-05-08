'use strict';
module.exports = function(app) {
  var Course = require('../controllers/CourseController');

  // course Routes
  app.route('/courses')
    .get(Course.getCourses)
    .post(Course.createCourse);


  app.route('/course/:courseNum')
    .get(Course.getCourse)
    .put(Course.updateCourse)
    .delete(Course.deleteCourse);
    
};
