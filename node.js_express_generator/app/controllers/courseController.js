const courseController = {};

const courseService = require('../services/courseServise')

courseController.getAll = function (req, res, next) {
    res.send(courseService.getAll());
  };


module.exports = courseController;


