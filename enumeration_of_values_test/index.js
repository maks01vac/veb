let templateData = {
    "Username": "Maks01vac",
    "name": {
        "firstname": "Maks",
        "lastname": "Glazkov"
    },
}

let dataArray = {
    data: [
        {
            id: 9,
            "name": {
                "firstname": "Maks",
                "lastname": "Glazkov"
            },
            "Username": "Maks01vac",
        },
        {
            id: 5,
            "name": {
                "firstname": "Pavel",
                "lastname": "Ivanov"
            },
            "Username": "Pavel_ivanov",
        },
        {
            id: 4,
            "name": {
                "firstname": "Dmitriy",
                "lastname": "Climenko"
            },
            "Username": "Dmitriy_Climenko",
        },
        {
            id: 15,
            "name": {
                "firstname": "Alex",
                "lastname": "Stark"
            },
            "Username": "Alex_Stark_01",
        }
    ]
}

const dataTest = {
    "Username": "truesvwevgwegvw",
    "name": {
        "firstname": "Maksqg34gv3w",
        "lastname": "fwefwe"
    },
}

const dataTest2 = {
    "Username": "truevvervwevgwegvwev",
    "name": {
        "firstname": "Maks",
        "lastname": "wfe"
    },
}

function idData(data) {
    idCourse = 1
    data.forEach(elem => {
        if (elem.id > idCourse) {
            idCourse = elem.id
        }
    });
    return idCourse + 1
}
function enumirationValue(dataDef, dataReq) {
    let rt = true;
    const len_obj1 = Object.keys(dataDef).length
    const len_obj2 = Object.keys(dataReq).length
    for (let property in dataReq) {

        if(typeof dataReq[property] === "string" && dataReq[property].length>20){
            return false
        }

        if (property in dataDef && len_obj1 === len_obj2 &&
            typeof dataDef[property] === typeof dataReq[property]) {

            if (typeof dataReq[property] === "object") {

                var objRt = enumirationValue(dataDef[property], dataReq[property])
                rt = objRt

            }
        }
        else {

            return false
        }
    }
    return rt
}
console.log(enumirationValue(templateData, dataTest));
console.log(idData(dataArray.data))

console.log(dataArray.data)

function okei(tempData, data, dataReq) {
    if (enumirationValue(tempData, dataReq)) {
        dataReq.id = idData(data)
        data.push(dataReq);
        console.log('Имя добавлено')
    }
    else {
        console.log('Неправильно введенные данные');
    }
}
okei(templateData, dataArray.data, dataTest)
console.log(dataArray.data)
okei(templateData, dataArray.data, dataTest2)
console.log(dataArray.data)
for (let property in dataTest) {
    if(typeof dataTest[property] === "string")
    console.log(dataTest[property].length)
}

