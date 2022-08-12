const userService = require('../services/userService');
const mappers = require('../mappers/mappers');
const logger = require('../logger/logger');

const userController = {};

userController.getAll = async function (req, res, next) {

  const allUsersResult = await userService.getAll()

  if (allUsersResult.success) {
    logger.info('No errors');
    res.status(200).send(allUsersResult.data);
  }
  else {
    const statusCode = mappers.mapErrorCodeToHttpCode(allUsersResult.error.errorCode);

    res.status(statusCode).send(allUsersResult.error);
  }
};




userController.getById = async function (req, res, next) {

  let id = Number(req.params.id);
  const resultGetUserByUser = await userService.getById(id)

  if (resultGetUserByUser.success) {
    logger.info(resultGetUserByUser);
    res.send(resultGetUserByUser.result);
  }
  else res.status(mappers.mapErrorCodeToHttpCode(resultGetUserByUser.errorCode)).send(resultGetUserByUser)
};




userController.post = async function (req, res, next) {

  const reqBody = req.body;

  logger.info('Entering CourseController.POST');
  logger.debug(`Trying to create a course with params:${reqBody} `);

  const resultCreateNewUser = await userService.createNewUser(reqBody);
  logger.debug('Trying to create a course with params.', resultCreateNewUser);

  if (resultCreateNewUser.success) {
    logger.info({ newUserId: resultCreateNewUser?.user?.id }, 'Entering CourseController.POST: Success');
    res.status(200).send('Пользователь добавлен');
  }
  else {
    // logger.debug();
    logger.warn("Entering CourseController.POST: Failure.", resultCreateNewUser); // depends
    // logger.error(); // depends
    res.status(mappers.mapErrorCodeToHttpCode(resultCreateNewUser.errorCode)).send(resultCreateNewUser);
  }
}





userController.updateById = async function (req, res, next) {

  const id = Number(req.params.id);

  let resultUpdateById = await userService.updateUser(req.body, id)
  console.log(resultUpdateById);

  if (resultUpdateById.success) {
    logger.info('User update');
    res.status(200).send(`Данные пользователя с id:${id} изменены`);
  }
  else {
    res.status(mappers.mapErrorCodeToHttpCode(resultUpdateById.errorCode)).send(resultUpdateById);
  }

}




userController.deleteById = async function (req, res, next) {

  const id = Number(req.params.id);
  const resultDelete = await userService.deleteById(id);

  if (resultDelete.success) {
    logger.info('User delete');
    res.send(`Курс c id:${id} удален`);
  }
  else res.status(mappers.mapErrorCodeToHttpCode(resultDelete.errorCode)).send(resultDelete);
};


module.exports = userController;
