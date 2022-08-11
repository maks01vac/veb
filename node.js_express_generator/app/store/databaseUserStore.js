const { json } = require('express')
const dbPool = require('../db_pool/db_pool')
const userModel = require('../models/userModel');

const logger = require('../logger/logger')

const userStore = {}


userStore.getAll = async function () {
    const client = await dbPool.connect();
    try {
        const dbResult = await client.query('SELECT u.id_user,firstname,lastname,username FROM users u INNER JOIN username n ON u.id_user=n.id_user')
        return {
            success: true,
            data: dbResult.rows.map(userModel.maptoModel),
            //data: mappingData.mapToModel(getAllUsersFromData.rows)
        }

    }
    catch (err) {
        return {
            success: false,
            error: {
                errorMessage: "Sorry, database is not available",
                errorCode: "dropDatabase",
            }

        }
    }
    finally {
        client.release()
    }

}

userStore.getById = async function (id) {

    const resultSearchId = await this.findUserById(id)
    if (resultSearchId.success === false) {
        logger.error(resultSearchId);
        return resultSearchId
    } else logger.info('User with this id exists')

    const client = await dbPool.connect();
    try {
        const getUserById = await client.query('SELECT u.id_user,firstname,lastname,username FROM users u INNER JOIN username n ON u.id_user=n.id_user WHERE u.id_user=$1', [id]);



        return {
            success: true,
            result: getUserById.rows.map(userModel.maptoModel)
            // result: mappingData.mapToModel(getUserById.rows)
        }

    }
    catch (err) {
        logger.fatal('database problem');
        return {
            success: false,
            errorMessage: "Sorry, database is not available",
            errorCode: "dropDatabase",
        }
    }
    finally {
        logger.info('database query was successful');
        client.release()
    }
}


userStore.findUserById = async function (id) {
    try {
        const getUserById = await dbPool.query('SELECT u.id_user FROM users u INNER JOIN username n ON u.id_user=n.id_user WHERE u.id_user=$1', [id]);

        if (getUserById.rows.length !== 0) {
            return { success: true }
        } else return {
            success: false,
            errorMessage: 'Пользователь с таким id не найден',
            errorCode: 'idNotFound'
        }
    }
    catch (err) {
        return {
            success: false,
            errorMessage: "Sorry, database is not available",
            errorCode: "dropDatabase",
        }
    }

}


userStore.postCourse = async function (courseData) {

    logger.debug('input data deconstruction')
    const { name, username } = courseData;
    const { firstname, lastname } = name;

    logger.debug('database connection')
    const client = await dbPool.connect();

    try {
        await client.query('BEGIN;');

        logger.debug('connection to the database was successful');
        logger.debug('user creation transaction');

        const queryInsertInUsers = 'INSERT INTO users(firstname, lastname) VALUES ($1, $2) RETURNING id_user;';
        const returningIdUsers = await client.query(queryInsertInUsers, [firstname, lastname]);
        const idUsername = returningIdUsers.rows[0].id_user

        const queryInsertInUsername = 'INSERT INTO username(id_user,username) VALUES ($1,$2)';
        await client.query(queryInsertInUsername, [idUsername, username]);

        await client.query('COMMIT;');

        logger.debug('transaction to create a user was successful');
        logger.debug('database query was successful');

        return {
            success: true,
            user: {
                id: idUsername
            }
        }
    }
    catch (err) {
        logger.error(err, 'Error in database')

        debugger
        await client.query('ROLLBACK;');

        return {
            success: false,

            errorMessage: 'Failed to create user',
            errorCode: 'errorInDatabase',

            // details: {
            //     code: err.code,
            //     stack: err.stack,
            //     message: err.message,
            // },
        }
    }
    finally {

        client.release();
    }
}


userStore.updateById = async function (dataReq, id) {
    const { name, username } = dataReq;
    const { firstname, lastname } = name;

    const client = await dbPool.connect();

    const resultSearchId = await this.findUserById(id)
    if (resultSearchId.success === false) {
        logger.error(resultSearchId);
        return resultSearchId
    }

    try {
        await client.query('BEGIN;');

        await client.query('UPDATE users SET firstname = $1, lastname =$2 WHERE id_user=$3', [firstname, lastname, id]);
        await client.query('UPDATE username SET username = $1 WHERE id_user=$2', [username, id]);

        await client.query('COMMIT;');

        return { success: true }

    }
    catch (err) {
        await client.query('ROLLBACK;');
        console.log(err)
        return {
            success: false,
            errorMessage: 'Failed to change data',
            errorCode: 'dropDatabase'
        }
    }
    finally {
        client.release()
    }


}




userStore.deleteById = async function (id) {

    const resultSearchId = await this.findUserById(id);

    if (resultSearchId.success === false) {
        logger.error(resultSearchId);
        return resultSearchId
    } else logger.info('User with this id exists')

    const client = await dbPool.connect()

    try {

        await client.query('DELETE FROM users WHERE id_user=$1', [id])
        return { success: true }

    }
    catch (err) {
        await client.query('ROLLBACK;');

        console.log(err);

        return {
            success: false,
            errorMessage: 'Failed to delete data',
            errorCode: 'dropDatabase'
        }
    }
    finally {
        client.release()
    }

}




module.exports = userStore;
