var express = require('express');
var router = express.Router();


var userController = require('../controllers/userController');


router.get('/courses', userController.getAll);

router.get('/courses/:id', userController.getById);

router.post('/courses', userController.post);

router.put('/courses/:id', userController.updateById);

router.delete('/courses/:id',userController.deleteById);


module.exports = router;
