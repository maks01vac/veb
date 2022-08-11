const validators = require('../valid/validators')

const courseStore = require('../store/databaseUserStore')
const userModel = require('../models/userModel')
const logger = require('../logger/logger')

const userService = {}

userService.getAll = async function () {
    const result = courseStore.getAll();
    // if (resultGetAll.result.length === 0) {
    //     logger.debug('No data')
    // }
    logger.debug('data available')
    return result;
}



userService.getById = async function (paramsId) {

    if (validators.isNumber(paramsId)) {
        logger.info('id is valid')
        return await courseStore.getById(paramsId);
    }
    else {
        const err = {
            success: false,
            errorMessage: 'Sorry, id is not valid',
            errorCode: 'invalidId'
        }

        logger.error(err);

        return err;
    }

}




userService.post = async function (userData) {

    logger.debug('Validating new course data');
    const dataValidationResult = validators.validateSchema(userModel.template, userData);

    if (!dataValidationResult.success) {
        logger.error(dataValidationResult, 'Creating new course in the DB FAILED.');
        return dataValidationResult;
    }

    logger.debug('New course data is valid.');
    logger.debug('Creating new course in the DB');
    
    var res = await courseStore.postCourse(userData);
    logger.debug(res, 'New course created');

    return res;

}




userService.updateUser = async function (userData, userId) {

    const idValidationResult = validators.isNumber(userId)

    if (idValidationResult) {

        logger.debug('id is valid');
        const dataValidationResult = validators.validateSchema(userModel.template, userData);

        if (dataValidationResult.success) {
            logger.debug('data has been verified')
            return await courseStore.updateById(userData, userId)
        }
        else {
            logger.error(dataValidationResult);
            return dataValidationResult
        }
    }
    else {
        idValidationResult = {
            success: false,
            errorMessage: 'Sorry, id is not valid',
            errorCode: 'invalidId'
        }
        logger.error(idValidationResult);
        return idValidationResult;
    }

}




userService.deleteById = async function (paramsId) {

    const idValidationResult = validators.isNumber(paramsId)

    if (idValidationResult) {
        logger.debug('id is valid');
        return await courseStore.deleteById(paramsId);
    }
    else {
        const answer = {
            success: false,
            errorMessage: 'Sorry, id is not valid',
            errorCode: 'invalidId'
        }
        logger.error(answer);
        return answer;
    }
}



module.exports = userService;