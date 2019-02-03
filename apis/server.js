var express = require('express'),
  app = express(),
  /* eslint-disable no-undef */
  port = process.env.PORT || 8081;
mongoose = require('mongoose'),
  User = require('./api/models/UserModel'), //created model loading here
  Course = require('./api/models/CourseModel'),
  Image = require('./api/models/ImageModel');
bodyParser = require('body-parser');

const cors = require('cors');

var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var jwt = require('jsonwebtoken');
var multer = require('multer');


// multer settings for file upload
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, '/home/shady/attendance_tracking/images/')
  },
  filename: function (req, file, callback) {
    callback(null, `${file.fieldname}-${Date.now()}`)
  }
});

exports.upload = multer({ storage: storage });

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/AttendanceTrackingDB');
var db = mongoose.connection;

// initialize cookie-parser to allow us access the cookies stored in the browser. 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());

var userRoute = require('./api/routes/UserRoutes'); //importing route
var courseRoute = require('./api/routes/CourseRoutes');
var imagesRoute = require('./api/routes/ImageRoutes');
app.get('/users1', function (req, res) {
  User.find({}, function (err, user) {
    if (err) {
      res.send(err);
    } else {
      res.json(user);
    }
  });
});

userRoute(app); //register the route
courseRoute(app);
imagesRoute(app);


app.listen(port);

console.log('Attendance Tracking RESTful API server started on: ' + port);
/* eslint-enable no-undef */
