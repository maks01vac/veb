
const courseStore = require('../store/courseStore')

const courseService = {}



courseService.getAll = function () {
    return courseStore.model.data
}



courseService.validProperty = function enumirationValue(dataTemp, dataReq) {
    let comparisonResult = true;
    const lengthDataTemp = Object.keys(dataTemp).length
    const lengthDataReq = Object.keys(dataReq).length

    if (lengthDataTemp === 0 || lengthDataReq === 0) {
        return false
    }

    for (let propertyObject in dataReq) {



        if (typeof dataReq[propertyObject] === "string"
            && dataReq[propertyObject].length > 20) {
            return false
        }

        if (propertyObject in dataTemp && lengthDataTemp === lengthDataReq &&
            typeof dataTemp[propertyObject] === typeof dataReq[propertyObject]) {

            if (typeof dataReq[propertyObject] === "object") {
                var recursiveResult = enumirationValue(dataTemp[propertyObject], dataReq[propertyObject])
                comparisonResult = recursiveResult
            }
            else if (dataTemp[propertyObject].trim() == '' || dataReq[propertyObject].trim() == '') {
                return false
            }
        }

        else {

            return false
        }
    }
    return comparisonResult
}


courseService.createNewId = function () {
    idCourse = 0
    courseStore.model.data.forEach(elem => {
        if (elem.id > idCourse) {
            idCourse = elem.id
        }
    });
    return idCourse + 1
}



courseService.post = function (dataReq) {
    if (this.validProperty(courseStore.template, dataReq)) {
        dataReq.id = this.createNewId()
        courseStore.postCourse(dataReq);
        return true
    }
    else return false

}

courseService.validParamsId = function (ParamsId) {
    if (!isNaN(ParamsId)) {
        return true
    }
    return false
}


courseService.findIdInModel = function (ParamsId) {
    let findIdIdModel
    courseStore.model.data.forEach((elem, index) => {
        if (elem.id === ParamsId) {
            findIdIdModel = index

        }
    })
    return findIdIdModel
}

courseService.existenseId = function (ParamsId) {
    for (let i = 0; i < courseStore.model.data.length; i++) {
        if (courseStore.model.data[i].id == ParamsId)
            return true;
    }
    return false
}


courseService.delete = function (ParamsId) {

    if (this.validParamsId(ParamsId) && this.existenseId(ParamsId)) {

        let foundId = this.findIdInModel(ParamsId);
        courseStore.deleteCourse(foundId);
        return true

    }
    return false

}

courseService.getSingleCourse = function (ParamsId) {

    if (this.validParamsId(ParamsId) && this.existenseId(ParamsId)) {

        let foundId = this.findIdInModel(ParamsId);
        return courseStore.getSingleCourse(foundId);
    }
else return false
}

    module.exports = courseService;