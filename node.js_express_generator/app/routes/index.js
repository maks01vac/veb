var express = require('express');
var router = express.Router();

var courseController = require('../controllers/courseController');
const courseService = require('../services/courseServise');


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
  idCourse = 0;
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

router.get('/courses/:id', courseController.getSingleCourse);


router.post('/courses', courseController.post);



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

router.delete('/courses/:id',courseController.delete);

module.exports = router;
