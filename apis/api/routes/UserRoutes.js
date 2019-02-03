'use strict';
module.exports = function (app) {
  var User = require('../controllers/UserController');
  var verifyToken = require('../verifyToken');
  // user Routes

  app.route('/')
  .get(verifyToken, User.getUsers);

  app.route('/users')
    .get(verifyToken, User.getUsers)
    .post(User.createUser);


  app.route('/users/:userId')
    .get(verifyToken, User.getUser)
    .put(verifyToken, User.updateUser)
    .delete(verifyToken, User.deleteUser);

  app.route('/logout')
    .get(User.logout);

  app.route('/login')
    .post(User.login);
};
