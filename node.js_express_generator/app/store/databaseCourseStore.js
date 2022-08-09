const { json } = require('express')
const db_pool = require('../db_pool/db_pool')

const mappingData = require('../mappers/mappingDataModel')

const courseStore = {}


courseStore.getAll = async function () {
    try {
        const getAllUsersFromData = await db_pool.query('SELECT u.id_user,firstname,lastname,username FROM users u INNER JOIN username n ON u.id_user=n.id_user')
        return mappingData.mappingDataFromDatabase(getAllUsersFromData.rows)
    }
    catch (err) {
        throw err
    }

}

courseStore.getById = async function (id) {
    try {
        const getUserById = await db_pool.query('SELECT u.id_user,firstname,lastname,username FROM users u INNER JOIN username n ON u.id_user=n.id_user WHERE u.id_user=$1', [id]);

        if (getUserById.rows.length !== 0) {
            return mappingData.mappingDataFromDatabase(getUserById.rows)
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
        await db_pool.query('BEGIN;')

        const queryInsertInUsers = 'INSERT INTO users(firstname, lastname) VALUES ($1, $2) RETURNING id_user;';
        const returningIdUsers = await db_pool.query(queryInsertInUsers, [firstname, lastname]);
        const idUsername = returningIdUsers.rows[0].id_user

        const queryInsertInUsername = 'INSERT INTO username(id_user,username) VALUES ($1,$2)';
        await db_pool.query(queryInsertInUsername, [idUsername, username]);

        await db_pool.query('COMMIT;');
    }
    catch (err) {
        await db_pool.query('ROLLBACK;');
        throw err
    }
}


courseStore.putById = async function (dataReq, id) {
    const { name, username } = dataReq;
    const { firstname, lastname } = name;

    try {
        await db_pool.connect();

        await db_pool.query('BEGIN;');
        const findingId = await db_pool.query('SELECT id_user FROM users WHERE id_user=$1', [id]);

        if (findingId.rows.length === 0) return false

        await db_pool.query('UPDATE users SET firstname = $1, lastname =$2 WHERE id_user=$3', [firstname, lastname, id]);
        await db_pool.query('UPDATE username SET username = $1 WHERE id_user=$2', [username, id]);

        await db_pool.query('COMMIT;');

        db_pool.end();
        return true

    }
    catch (err) {
        await db_pool.query('ROLLBACK;');
        console.log(err)
        return false
    }


}




courseStore.deleteById = async function (id) {

    try {
        await db_pool.query('BEGIN;')

        const findingId = await db_pool.query('SELECT id_user FROM users WHERE id_user=$1', [id])

        if (findingId.rows.length === 0) return false

        await db_pool.query('DELETE FROM users WHERE id_user=$1', [id])

        await db_pool.query('COMMIT;')
        return true
    }
    catch (err) {
        await db_pool.query('ROLLBACK;');
        console.log(err)
        return false
    }

}




module.exports = courseStore;
