const courseModel ={}


courseModel.template = {
    "name": {
      "firstname": "Maks",
      "lastname": "Glazkov"
    },
    "username": "Maks01vac",
  }

courseModel.mappingTemplate = function (user) {
    return{
      id:user.id_user,
      "name": {
        "firstname": user.firstname,
        "lastname": user.lastname
      },
      "username": user.username,
    }
  }

  module.exports = courseModel;