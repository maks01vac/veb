const { json } = require('express')
const db_pool = require('../db_pool/db_pool')

const mappingData = require('../mappers/mappingDataModel')

const courseStore = {}


courseStore.getAll = async function () {
    try {
        const getAllUsersFromData = await db_pool.query('SELECT u.id_user,firstname,lastname,username FROM users u INNER JOIN username n ON u.id_user=n.id_user')
        return {
            success: true,
            result: mappingData.mappingDataFromDatabase(getAllUsersFromData.rows)
        }

    }
    catch (err) {
        return {
            success: false,
            errorMessage: "Sorry, database is not available",
            errorCode: "Drop database",
        }
    }

}

courseStore.getById = async function (id) {

    const resultSearchId = await this.findUserById(id)

    if (resultSearchId.success) {
        try {

            const getUserById = await db_pool.query('SELECT u.id_user,firstname,lastname,username FROM users u INNER JOIN username n ON u.id_user=n.id_user WHERE u.id_user=$1', [id]);
            return {
                success: true,
                result: mappingData.mappingDataFromDatabase(getUserById.rows)
            }
        }
        catch(err){
            return {
                success: false,
                errorMessage: "Sorry, database is not available",
                errorCode: "Drop database",
            }
        }
    }
    else return resultSearchId;
}

courseStore.findUserById = async function (id) {
    try {
        const getUserById = await db_pool.query('SELECT u.id_user FROM users u INNER JOIN username n ON u.id_user=n.id_user WHERE u.id_user=$1', [id]);

        if (getUserById.rows.length !== 0) {
            return { success: true }
        } else return {
            success: false,
            errorMessage: 'Пользователь с таким id не найден',
            errorCode: 'id Not Found'
        }
    }
    catch (err) {
        return {
            success: false,
            errorMessage: "Sorry, database is not available",
            errorCode: "Drop database",
        }
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

        const queryInsertInUsername = 'NSERT INTO username(id_user,username) VALUES ($1,$2)';
        await db_pool.query(queryInsertInUsername, [idUsername, username]);

        await db_pool.query('COMMIT;');
        return {
            success: true
        }
    }
    catch (err) {
        await db_pool.query('ROLLBACK;');
        return {
            success: false,
            errorMessage: 'Failed to create user',
            errorCode: 'Drop database'
        }
    }
}


courseStore.putById = async function (dataReq, id) {
    const { name, username } = dataReq;
    const { firstname, lastname } = name;

    const resultSearchId = await this.findUserById(id)
    if(resultSearchId.success === false){
        return resultSearchId
     }

    try {
        await db_pool.query('BEGIN;');

        await db_pool.query('UPDATE users SET firstname = $1, lastname =$2 WHERE id_user=$3', [firstname, lastname, id]);
        await db_pool.query('UPDATE username SET username = $1 WHERE id_user=$2', [username, id]);

        await db_pool.query('COMMIT;');

        return { success: true }

    }
    catch (err) {
        await db_pool.query('ROLLBACK;');
        console.log(err)
        return {
            success: false,
            errorMessage: 'Failed to change data',
            errorCode: 'Drop database'
        }
    }


}




courseStore.deleteById = async function (id) {

    const resultSearchId = await this.findUserById(id)

    if(resultSearchId.success === false){
       return resultSearchId
    }

    try {
        await db_pool.query('BEGIN;')

        await db_pool.query('DELETE FROM users WHERE id_user=$1', [id])

        await db_pool.query('COMMIT;')
        return { success: true }
    }
    catch (err) {
        await db_pool.query('ROLLBACK;');
        console.log(err)
        return {
            success: false,
            errorMessage: 'Failed to delete data',
            errorCode: 'Drop database'
        }
    }

}




module.exports = courseStore;
