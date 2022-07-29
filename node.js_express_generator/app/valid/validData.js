const validData ={}

validData.validProperty = function enumirationValue(dataTemp, dataReq) {
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


validData.validParamsId = function (paramsId) {
    if (!isNaN(paramsId)) {
        return true
    }
    return false
}

module.exports =validData;
