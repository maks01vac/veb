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
    try {
        const getAllUsersFromData = await db.query('SELECT * FROM users u INNER JOIN username n ON u.id_user=n.id_user')
        return this.mappingDataFromDatabase(getAllUsersFromData.rows)
    }
    catch (err) {
        throw err
    }

}

courseStore.getById = async function (id) {
    try {
        const getUserById = await db.query('SELECT * FROM users u INNER JOIN username n ON u.id_user=n.id_user WHERE u.id_user=$1', [id]);

        if (getUserById.rows.length !== 0) {
            return this.mappingDataFromDatabase(getUserById.rows)
        } else return false
    }
    catch (err) {
        throw err
    }



}

courseStore.postCourse = async function (courseData) {

    const { name, username } = courseData;
    const { firstname, lastname } = name;

    try {
        await db.query('BEGIN;')

        const queryInsertInUsers = 'INSERT INTO users(firstname, lastname) VALUES ($1, $2);';
        await db.query(queryInsertInUsers, [firstname, lastname]);

        const queryInsertInUsername = 'INSERT INTO username SELECT id_user, $1 FROM users WHERE id_user = (SELECT MAX(id_user) FROM users);';
        await db.query(queryInsertInUsername, [username]);

        await db.query('COMMIT;');
    }
    catch (err) {
        await db.query('ROLLBACK;');
        throw err
    }
}


courseStore.putById = async function (dataReq, id) {
    const { name, username } = dataReq;
    const { firstname, lastname } = name;

    try {
        await db.query('BEGIN;')
        const findingId = await db.query('SELECT id_user FROM users WHERE id_user=$1', [id])

        if (findingId.rows.length === 0) return false

        await db.query('UPDATE users SET firstname = $1, lastname =$2 WHERE id_user=$3', [firstname, lastname, id])
        await db.query('UPDATE username SET username = $1 WHERE id_user=$2', [username, id])

        await db.query('COMMIT;')
        return true

    }
    catch (err) {
        await db.query('ROLLBACK;');
        console.log(err)
        return false
    }


}




courseStore.deleteById = async function (id) {

    try {
        await db.query('BEGIN;')

        const findingId = await db.query('SELECT id_user FROM users WHERE id_user=$1', [id])

        if (findingId.rows.length === 0) return false

        await db.query('DELETE FROM users WHERE id_user=$1', [id])

        await db.query('COMMIT;')
        return true
    }
    catch (err) {
        await db.query('ROLLBACK;');
        console.log(err)
        return false
    }

}




module.exports = courseStore;
