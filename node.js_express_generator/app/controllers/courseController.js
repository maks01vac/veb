const courseController = {};

const courseService = require('../services/courseServise')

courseController.getAll = function (req, res, next) {
    res.send(courseService.getAll());
  };

courseController.getById = function (req, res, next) {

  let id = Number(req.params.id)

  if(courseService.getById(id)!==false){
    res.send(courseService.getById(id))
  }
  else res.send("Ошибка")
};

courseController.post = function (req, res, next) {
  let reqBody = req.body;
  let resultAddData = courseService.post(reqBody)
  if(resultAddData){
    res.status(200).send('Данные успешно добавлены')
  }
  else{
    res.status(404).send('Неправильно введенные данные')
  }
}


courseController.putById = function (req, res, next) {

  const id = Number(req.params.id);
  
  let resultAddData = courseService.putById(req.body,id)
  if(resultAddData){
    res.status(200).send('Данные успешно изменены')
  }
  else{
    res.status(404).send('Неправильно введенные данные')
  }

}


courseController.deleteById = function (req, res, next) {

  let id = Number(req.params.id)

  if(courseService.deleteById(id)){
    res.send(`Курс c id:${id} удален`)
  }
  else res.send("Ошибка")
};


module.exports = courseController;
