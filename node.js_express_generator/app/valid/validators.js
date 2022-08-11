const validator = {}

validator.validateSchema = function enumirationValue(targetSchema, sourceSchema) {
    let comparisonResult = {success:true};
    const lengthDataTemp = Object.keys(targetSchema).length
    const lengthDataReq = Object.keys(sourceSchema).length

    if (lengthDataTemp === 0 || lengthDataReq === 0) {
        return {
            success: false,
            errorMessage: 'Извините, пустоту нельзя отправлять',
            errorCode: 'emptyData'
        }
    }

    for (let propertyObject in sourceSchema) {



        if (typeof sourceSchema[propertyObject] === "string"
            && sourceSchema[propertyObject].length > 20) {
            return {
                success: false,
                errorMessage: 'Поля не должны содержать больше 20 символов',
                errorCode: 'limitSymbols'
            }
        }

        if (propertyObject in targetSchema) {
                if(lengthDataTemp === lengthDataReq){
                    if(typeof targetSchema[propertyObject] === typeof sourceSchema[propertyObject]){
                        if (typeof sourceSchema[propertyObject] === "object") {
                            var recursiveResult = enumirationValue(targetSchema[propertyObject], sourceSchema[propertyObject])
                            comparisonResult = recursiveResult
                        }
                        else if (targetSchema[propertyObject].trim() == '' || sourceSchema[propertyObject].trim() == '') {
                            return {
                                success: false,
                                errorMessage: 'Пожалуйста, заполните все поля',
                                errorCode: 'emptyProperty'
                            }
                        }
                    }
                    else return{
                        success:false,
                        errorProperties:propertyObject,
                        dataTypeProperty:typeof targetSchema[propertyObject],
                        errorMessage:`у поля ${propertyObject} должен быть тип данных ${typeof targetSchema[propertyObject]}`,
                        errorCode:'invalidDataType'
                    }
                }
                else return {
                    success:false,
                    errorMessage:'Количество полей отличается',
                    errorCode:'invalidNumberOfProperties'
                }
        }

        else {

            return {
                success: false,
                errorMessage: 'Такого поля или полей не существует',
                errorCode: 'invalidDataStructure'
            }
        }
    }

   return comparisonResult;
}


validator.isNumber = function (value) {
    if (!isNaN(value)) {
        return true
    }
    return false
}

module.exports = validator;
