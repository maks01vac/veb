var express = require('express');
var router = express.Router();

var courseController = require('../controllers/courseController');


router.get('/courses', courseController.getAll);

router.get('/courses/:id', courseController.getById);

router.post('/courses', courseController.post);

router.put('/courses/:id', courseController.putById);

router.delete('/courses/:id',courseController.deleteById);

module.exports = router;
