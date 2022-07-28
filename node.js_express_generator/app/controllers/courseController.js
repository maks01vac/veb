const courseController = {};

const courseService = require('../services/courseServise')

courseController.getAll = function (req, res, next) {
    res.send(courseService.getAll());
  };

courseController.getSingleCourse = function (req, res, next) {

  let id = Number(req.params.id)

  if(courseService.getSingleCourse(id)!==false){
    res.send(courseService.getSingleCourse(id))
  }
  else res.send("Ошибка")
};

courseController.post = function (req, res, next) {
  let reqBody = req.body;
  let resultInsertData = courseService.post(reqBody)
  if(resultInsertData){
    res.status(200).send('Данные успешно добавлены')
  }
  else{
    res.status(404).send('Неправильно введенные данные')
  }
}


courseController.delete = function (req, res, next) {

  let id = Number(req.params.id)

  if(courseService.delete(id)){
    res.send(`Курс c id:${id} удален`)
  }
  else res.send("Ошибка")
};


module.exports = courseController;
