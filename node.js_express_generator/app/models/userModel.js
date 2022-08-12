const userModel = {}


userModel.template = {
  "name": {
    "firstname": "Maks",
    "lastname": "Glazkov"
  },
  "username": "Maks01vac",
}

userModel.mapToModel = function (rawUserDBData) {
  return {
    id: rawUserDBData.id_user,
    "name": {
      "firstname": rawUserDBData.firstname,
      "lastname": rawUserDBData.lastname
    },
    "username": rawUserDBData.username,
  }
}

module.exports = userModel;