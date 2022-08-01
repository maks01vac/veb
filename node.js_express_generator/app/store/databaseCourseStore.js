const { json } = require('express')
const db = require('../config')

const model = require('../models/courseModel')


const courseStore = {}

courseStore.mappingDataFromDatabase = function (data) {

    const mappingData = data.map(user => {
        return model.mappingTemplate(user)
    })
    return mappingData;
}



courseStore.getAll = async function () {

    const getAllUsersFromData = await db.query('SELECT * FROM users u INNER JOIN username n ON u.id_user=n.id_user')
    return this.mappingDataFromDatabase(getAllUsersFromData.rows)
}

courseStore.getById = async function (id) {
    const getUserById = await db.query('SELECT * FROM users u INNER JOIN username n ON u.id_user=n.id_user WHERE u.id_user=$1', [id])

    if (getUserById.rows.length !== 0){
         return this.mappingDataFromDatabase(getUserById.rows)
        }else return false
}




module.exports = courseStore;
