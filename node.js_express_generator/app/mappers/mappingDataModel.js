const model = require('../models/courseModel')

const mappingDataModel = {};

mappingDataModel.mappingDataFromDatabase = function (data) {

    const mappingData = data.map(user => {
        return model.mappingTemplate(user)
    })
    return mappingData;
}

mappingDataModel.mapErrorsCode = function(code){
    let statusCode
    switch(code){

        case 'Invalid id':
        case 'different structure':
        case '>20 symbols':
        case 'empty property':
        case 'type data invalid':
        case 'number property diferent':
        case 'empty data':
            statusCode = 400;
            break;
        case 'id Not Found':
            statusCode = 404;
            break;
        case 'Drop database':
            statusCode = 500;
    }

    return statusCode;
    

}

module.exports = mappingDataModel;