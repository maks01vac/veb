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
courseStore.getAll = function(){
    return this.model.data
}

module.exports = courseStore;