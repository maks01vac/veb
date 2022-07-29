const courseStore = {};

courseStore.model = {
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




courseStore.createNewId = function () {
  idCourse = 0
  courseStore.model.data.forEach(elem => {
    if (elem.id > idCourse) {
      idCourse = elem.id
    }
  });
  return idCourse + 1
}



courseStore.existenseId = function (paramsId) {
  for (let i = 0; i < courseStore.model.data.length; i++) {
    if (courseStore.model.data[i].id == paramsId)
      return true;
  }
  return false
}

courseStore.findIndexModel = function (paramsId) {
  let findIdIdModel
  this.model.data.forEach((elem, index) => {
    if (elem.id === paramsId) {
      findIdIdModel = index

    }
  })
  return findIdIdModel
}


courseStore.getAll = function () {
  return this.model.data
}

courseStore.getById = function (id) {
  if (this.existenseId(id)) {

    let indexCourse = this.findIndexModel(id)
    return this.model.data[indexCourse]

  }
  else return false

}


courseStore.postCourse = function (courseData) {

  courseData.id = this.createNewId()

  this.model.data.push(courseData);
}

courseStore.deleteById = function (id) {
  if (this.existenseId(id)) {

    let indexCourse = this.findIndexModel(id)
    this.model.data.splice(indexCourse, 1)

    return true
  }
  else return false

}

courseStore.putById = function(dataReq,id){

  if (this.existenseId(id)) {

    let indexCourse = this.findIndexModel(id)

    dataReq.id = id;

    this.model.data[indexCourse] = dataReq;

    return true
  }
  else return false

}



module.exports = courseStore;