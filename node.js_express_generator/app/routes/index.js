var express = require('express');
var router = express.Router();

var courseController = require('../controllers/courseController')


///////////////////////////////////////////Data/////////////////////////////////////////////////////////////////////
let templateData ={
  "name": {
    "firstname": "Maks",
    "lastname": "Glazkov"
  },
  "Username": "Maks01vac",
}

let dataArray = {
  data: [
    {
      id: 3,
      "name": {
        "firstname": "Maks",
        "lastname": "Glazkov"
      },
      "Username": "Maks01vac",
    },
    {
      id: 1,
      "name": {
        "firstname": "Pavel",
        "lastname": "Ivanov"
      },
      "Username": "Pavel_ivanov",
    },
    {
      id: 2,
      "name": {
        "firstname": "Dmitriy",
        "lastname": "Climenko"
      },
      "Username": "Dmitriy_Climenko",
    },
    {
      id: 4,
      "name": {
        "firstname": "Alex",
        "lastname": "Stark"
      },
      "Username": "Alex_Stark_01",
    }
  ]
}
 

///////////////////////////////////////////////////////Function////////////////////////////////////////////////////////////////////////////////////


function enumirationValue(dataTemp, dataReq) {
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



function insertIdData(data) {
  idCourse = 1
  data.forEach(elem => {
      if (elem.id > idCourse) {
          idCourse = elem.id
      }
  });
  return idCourse + 1
}


function checkAndInsertData(tempData, data, dataReq) {
  if (enumirationValue(tempData, dataReq)) {
      dataReq.id = insertIdData(data)
      data.push(dataReq);
      return true
  }
  else return false

}




function existenseId(data, idBlock) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].id == idBlock)
      return true;
  }
  return false
}


/////////////////////////////////////////////////////Route///////////////////////////////////////////////////////////////////////////

router.get('/courses', courseController.getAll);

router.get('/courses/:id', function (req, res, next) {
  const id = Number(req.params.id);

  if (!isNaN(id)) {
    if (existenseId(dataArray.data, id)) {
        dataArray.data.forEach((elem, index) => {
          if (elem.id === id) {
            res.send(dataArray.data[index])
          }
        });
    }
    else {
      res.status(404).send('Блока с таким id нету')
    }
  }
  else {
    res.status(400).send('Wrong type')
  }
});


router.post('/courses', function (req, res, next) {
  let reqBody = req.body;
  let resultInsertData = checkAndInsertData(templateData,dataArray.data,reqBody)
  if(resultInsertData){
    res.status(200).send('Данные успешно добавлены')
  }
  else{
    res.status(404).send('Неправильно введенные данные')
  }

});


router.put('/courses/:id', function (req, res, next) {
  const id = Number(req.params.id);

  if (!isNaN(id)) {
    res.send({ name: `put single course with ${id}` })
  }
  else {
    res.status(400).send('Wrong type')
  }
});

router.delete('/courses', function (req, res, next) {
  res.send({ name: "delete all courses" });
});



router.delete('/courses/:id', function (req, res, next) {
  const id = Number(req.params.id);

  if (!isNaN(id)) {
    if (existenseId(dataArray.data, id)) {
      dataArray.data.forEach((elem, index) => {
        if (elem.id === id) {
          dataArray.data.splice(index, 1)
        }
      });
      res.send(`Блок с id:${id} удален`);
    }
    else {
      res.status(404).send('Блока с таким id нету')
    }
  }
  else {
    res.status(400).send('Wrong type')
  }
});

module.exports = router;
