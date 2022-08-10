const courseController = {};

const courseService = require('../services/courseServise')

const mappers = require('../mappers/mappingDataModel')


courseController.getAll =async function (req, res, next) {

  const resultGetAll = await courseService.getAll()

  if(resultGetAll.success){
    res.status(200).send(resultGetAll.result);
  }
  else res.status(mappers.mapErrorsCode(resultGetAll.errorCode)).send(resultGetAll.errorMessage)
    

  };




courseController.getById =async function (req, res, next) {

  let id = Number(req.params.id)

  const result = await courseService.getById(id)

  if(result.success){
    res.send(result.result)
  }
  else res.status(mappers.mapErrorsCode(result.errorCode)).send(result.errorMessage)
};




courseController.post =async function (req, res, next) {
  const reqBody = req.body;
  const result = await courseService.post(reqBody)
  if(result.success){
    res.status(200).send('Пользователь добавлен')
  }
  else{
    res.status(mappers.mapErrorsCode(result.errorCode)).send(result)
  }
}





courseController.putById = async function (req, res, next) {

  const id = Number(req.params.id);
  
  let result = await courseService.putById(req.body,id)
  console.log(result);
  
  if(result.success){
    res.status(200).send(`Данные пользователя с id:${id} изменены`)
  }
  else{
    res.status(mappers.mapErrorsCode(result.errorCode)).send(result)
  }

}




courseController.deleteById =async function (req, res, next) {

  const id = Number(req.params.id)
  const resultDelete = await courseService.deleteById(id)
  console.log(resultDelete);
  if(resultDelete.success){
    res.send(`Курс c id:${id} удален`)
  }
  else res.status(mappers.mapErrorsCode(resultDelete.errorCode)).send(resultDelete.errorMessage)
};


module.exports = courseController;
