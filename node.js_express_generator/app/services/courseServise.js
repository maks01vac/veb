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




courseService.post =async function (dataReq) {
    if (validData.validProperty(courseModel.template, dataReq)) {

        const resultCreate = await courseStore.postCourse(dataReq);

        if(resultCreate === false){
            return false
        }

        return true

       
    }
    else return false

}




courseService.putById = async function (dataReq, paramsId) {
    if (validData.validProperty(courseModel.template, dataReq) && validData.validParamsId(paramsId)) {

        return await courseStore.putById(dataReq, paramsId)
    }
    else return false

}




courseService.deleteById = async function (paramsId) {
    if (validData.validParamsId(paramsId)) {
        return await courseStore.deleteById(paramsId);
    }
    else return false
}



module.exports = courseService;