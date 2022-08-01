const Pool = require('pg').Pool

const dataBase = new Pool({
    host:"localhost",
    user:"postgres",
    port:5432,
    password:'1928',
    database:"postgres"
})

module.exports = dataBase;
