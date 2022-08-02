const courseController = {};

const courseService = require('../services/courseServise')

courseController.getAll =async function (req, res, next) {
    res.send(await courseService.getAll());
  };

courseController.getById =async function (req, res, next) {

  let id = Number(req.params.id)

  const resultQuery = await courseService.getById(id)

  if(resultQuery!==false){
    res.send(resultQuery)
  }
  else res.send("Ошибка")
};

courseController.post =async function (req, res, next) {
  let reqBody = req.body;
  let resultAddData = await courseService.post(reqBody)
  if(resultAddData){
    res.status(200).send('Данные успешно добавлены')
  }
  else{
    res.status(404).send('Неправильно введенные данные')
  }
}


courseController.putById = async function (req, res, next) {

  const id = Number(req.params.id);
  
  let resultAddData = await courseService.putById(req.body,id)
  if(resultAddData){
    res.status(200).send('Данные успешно изменены')
  }
  else{
    res.status(404).send('Неправильно введенные данные')
  }

}


courseController.deleteById =async function (req, res, next) {

  const id = Number(req.params.id)
  const resultDelete = await courseService.deleteById(id)
  if(resultDelete){
    res.send(`Курс c id:${id} удален`)
  }
  else res.send("Ошибка")
};


module.exports = courseController;
