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

    if (getUserById.rows.length !== 0) {
        return this.mappingDataFromDatabase(getUserById.rows)
    } else return false
}

courseStore.postCourse = async function (courseData) {

    const { name, username } = courseData;
    const { firstname, lastname } = name;

    try {
        await db.query('INSERT INTO users (firstname,lastname) VALUES ($1,$2)', [firstname, lastname],);
    }
    catch (err) {
        console.log(err);
        return false
    }

    const queryMaxIdUser = await db.query('SELECT id_user FROM users WHERE id_user = (SELECT MAX(id_user) FROM users)');
    const idUsername = queryMaxIdUser.rows[0].id_user

    try {
        await db.query('INSERT INTO username (id_user,username) VALUES ($1,$2)', [idUsername, username])
    }
    catch (err) {
        console.log(err);
        return false
    }

}



courseStore.putById = async function(dataReq,id){
    const { name, username } = dataReq;
    const { firstname, lastname } = name;


    const findingId = await db.query('SELECT id_user FROM users WHERE id_user=$1', [id])

    if (findingId.rows.length === 0) {
        return false
    }

    try {
        await db.query('UPDATE users SET firstname = $1, lastname =$2 WHERE id_user=$3', [firstname,lastname,id])
        await db.query('UPDATE username SET username = $1 WHERE id_user=$2', [username,id])
        return true
    }
    catch (err) {
        console.log(err)
        return false
    }


  }




courseStore.deleteById = async function (id) {
    const findingId = await db.query('SELECT id_user FROM users WHERE id_user=$1', [id])

    if (findingId.rows.length === 0) {
        return false
    }

    try {
        const deletionRequest = await db.query('DELETE FROM users WHERE id_user=$1', [id])
        return true
    }
    catch (err) {
        console.log(err)
        return false
    }

}




module.exports = courseStore;
