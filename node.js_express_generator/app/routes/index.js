var express = require('express');
var router = express.Router();

/* GET home page. */
let templateData ={
  id: 3,
  "name": {
    "firstname": "Maks",
    "lastname": "Glazkov"
  },
  "Username": "Maks01vac",
}

function r(i){
  if(i==1) return 1
  return i+r(i-1)
}
console.log(r(20));

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

const dataTest = {
 
  "Username": 1,
  "name": {
    "firstname":"Max",
    "lastname": "Glazkov"
  }, 
  id: 3,
}


let oneData = dataArray.data[0];

function objectСomparison(dataReq,dataBase) {
  let countDef = 0;
  let countProp = 0;
  for (let property in dataBase) {
    countDef++
    if(typeof property === "object"){
      objectСomparison(property)
    }
   
    for (key in dataReq) {

      if (key === property && typeof dataReq[key] === typeof dataBase[property]) {
        countProp ++;
      }
    } 

  }

  if (countProp === countDef) {
    return true;
  }

return false;
}



function existenseId(data, idBlock) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].id == idBlock)
      return true;
  }
  return false
}

router.get('/courses', function (req, res, next) {
  res.send(dataArray.data);
});

router.get('/courses/:id', function (req, res, next) {
  const id = Number(req.params.id);

  if (!isNaN(id)) {
    if (existenseId(dataArray.data, id)) {
      res.send(dataArray.data[id - 1])
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
  if(objectСomparison(reqBody,templateData)){
    dataArray.data.push(reqBody)
    res.send('Прошло успешно')
  }
  else{
    res.send('ошибка')
  }

});

// router.put('/courses', function (req, res, next) {
//   res.send({ name: "put all courses" });
// });

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
