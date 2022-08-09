const model = require('../models/courseModel')

const mappingDataModel = {};

mappingDataModel.mappingDataFromDatabase = function (data) {

    const mappingData = data.map(user => {
        return model.mappingTemplate(user)
    })
    return mappingData;
}

module.exports = mappingDataModel;