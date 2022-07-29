var express = require('express');
var router = express.Router();

const { Client } = require('pg')
const client = new Client()
client.connect()
client.query('SELECT $1::text as message', ['Hello world!'], (err, res) => {
  console.log(err ? err.stack : res.rows[0].message) // Hello World!
  client.end()
})


var courseController = require('../controllers/courseController');


router.get('/courses', courseController.getAll);

router.get('/courses/:id', courseController.getById);

router.post('/courses', courseController.post);

router.put('/courses/:id', courseController.putById);

router.delete('/courses/:id',courseController.deleteById);


module.exports = router;
