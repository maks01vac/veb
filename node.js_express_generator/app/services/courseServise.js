const validData = require('../valid/validData')


const courseStore = require('../store/databaseCourseStore')
const courseModel = require('../models/courseModel')

const courseService = {}

courseService.getAll = async function () {
    return await courseStore.getAll()
}



courseService.getById =async function (paramsId) {

    if (validData.validParamsId(paramsId)) {
        return await courseStore.getById(paramsId);
    }
    else return false

}




courseService.post = function (dataReq) {
    if (validData.validProperty(courseModel.template, dataReq)) {

        courseStore.postCourse(dataReq);

        return true
    }
    else return false

}




courseService.putById = function (dataReq, paramsId) {
    if (validData.validProperty(courseModel.template, dataReq) && validData.validParamsId(paramsId)) {

        return courseStore.putById(dataReq, paramsId)
    }
    else return false

}




courseService.deleteById = function (paramsId) {
    if (validData.validParamsId(paramsId)) {
        return courseStore.deleteById(paramsId);
    }
    else return false
}



module.exports = courseService;