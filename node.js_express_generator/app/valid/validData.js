const validData = {}

validData.validProperty = function enumirationValue(dataTemp, dataReq) {
    let comparisonResult = {success:true};
    const lengthDataTemp = Object.keys(dataTemp).length
    const lengthDataReq = Object.keys(dataReq).length

    if (lengthDataTemp === 0 || lengthDataReq === 0) {
        return {
            success: false,
            errorMessage: 'Извините, пустоту нельзя отправлять',
            errorCode: 'empty data'
        }
    }

    for (let propertyObject in dataReq) {



        if (typeof dataReq[propertyObject] === "string"
            && dataReq[propertyObject].length > 20) {
            return {
                success: false,
                errorMessage: 'Поля не должны содержать больше 20 символов',
                errorCode: '>20 symbols'
            }
        }

        if (propertyObject in dataTemp) {
                if(lengthDataTemp === lengthDataReq){
                    if(typeof dataTemp[propertyObject] === typeof dataReq[propertyObject]){
                        if (typeof dataReq[propertyObject] === "object") {
                            var recursiveResult = enumirationValue(dataTemp[propertyObject], dataReq[propertyObject])
                            comparisonResult = recursiveResult
                        }
                        else if (dataTemp[propertyObject].trim() == '' || dataReq[propertyObject].trim() == '') {
                            return {
                                success: false,
                                errorMessage: 'Пожалуйста, заполните все поля',
                                errorCode: 'empty property'
                            }
                        }
                    }
                    else return{
                        success:false,
                        errorMessage:`у поля ${propertyObject} должен быть тип данных ${typeof dataTemp[propertyObject]}`,
                        errorCode:'type data invalid'
                    }
                }
                else return {
                    success:false,
                    errorMessage:'Количество полей отличается',
                    errorCode:'number property diferent'
                }
        }

        else {

            return {
                success: false,
                errorMessage: 'Такого поля или полей не существует',
                errorCode: 'different structure'
            }
        }
    }

   return comparisonResult;
}


validData.validParamsId = function (paramsId) {
    if (!isNaN(paramsId)) {
        return true
    }
    return false
}

module.exports = validData;
