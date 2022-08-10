const validData = require('../valid/validData')


const courseStore = require('../store/databaseCourseStore')
const courseModel = require('../models/courseModel')

const courseService = {}

courseService.getAll = async function () {
    return courseStore.getAll()
}



courseService.getById =async function (paramsId) {

    if (validData.validParamsId(paramsId)) {
        return await courseStore.getById(paramsId);
    }
    else return {
        success:false,
        errorMessage:'Sorry, id is not valid',
        errorCode:'Invalid id'
    }

}




courseService.post =async function (dataReq) {
    console.log(`я проверка шаблона ${validData.validProperty(courseModel.template, dataReq)}`)
    if (validData.validProperty(courseModel.template, dataReq).success) {


        return await courseStore.postCourse(dataReq);
  
    }
    else return validData.validProperty(courseModel.template, dataReq)

}




courseService.putById = async function (dataReq, paramsId) {
    if (validData.validParamsId(paramsId)) {

        const resultValidInputData = validData.validProperty(courseModel.template, dataReq)

        if(resultValidInputData.success){
            return await courseStore.putById(dataReq, paramsId)
        }
        else return validData.validProperty(courseModel.template, dataReq)
    }
    else return {
        success:false,
        errorMessage:'Sorry, id is not valid',
        errorCode:'Invalid id'
    }

}




courseService.deleteById = async function (paramsId) {
    if (validData.validParamsId(paramsId)) {
        return await courseStore.deleteById(paramsId);
    }
    else return {
        success:false,
        errorMessage:'Sorry, id is not valid',
        errorCode:'Invalid id'
    }
}



module.exports = courseService;