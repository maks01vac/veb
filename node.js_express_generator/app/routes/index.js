var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/courses?', function(req, res, next) {
  res.send(req.query);

});

router.post('/courses', function(req, res, next) {
  res.send(req.body);
});

router.put('/courses', function(req, res, next) {
  res.send(req.body);
});

router.delete('/courses', function(req, res, next) {
  res.send(req.body);
});

module.exports = router;
