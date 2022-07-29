const validData = require('../valid/validData')


const courseStore = require('../store/courseStore')
const courseModel = require('../models/courseModel')

const courseService = {}

courseService.getAll = function () {
    return courseStore.getAll()
}



courseService.getById = function (paramsId) {

    if (validData.validParamsId(paramsId)) {
        return courseStore.getById(paramsId);
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