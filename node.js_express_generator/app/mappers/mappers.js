const mappers = {};

// mappingDataModel.mapToModel = function (data) {

//     const mappingData = data.map(user => {
//         return model.maptoModel(user)
//     })
//     return mappingData;
// }

mappers.mapErrorCodeToHttpCode = function (code) {
    let statusCode
    switch (code) {

        case 'invalidId':
        case 'invalidDataStructure':
        case 'limitSymbols':
        case 'emptyProperty':
        case 'invalidDataType':
        case 'invalidNumberOfProperties':
        case 'emptyData':
            statusCode = 400;
            break;

        case 'idNotFound':
            statusCode = 404;
            break;

        case 'errorInDatabase':
            statusCode = 500;

        default:
            statusCode = 500;
    }

    return statusCode;
}

module.exports = mappers;