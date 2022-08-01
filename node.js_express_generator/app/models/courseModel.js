const courseModel ={}


courseModel.template = {
    "name": {
      "firstname": "Maks",
      "lastname": "Glazkov"
    },
    "Username": "Maks01vac",
  }

courseModel.mappingTemplate = function (user) {
    return{
      id:user.id_user,
      "name": {
        "firstname": user.firstname,
        "lastname": user.lastname
      },
      "Username": user.username,
    }
  }

  module.exports = courseModel;