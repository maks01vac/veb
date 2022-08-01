
const {Client} = require('pg')
const client1 = new Client({
    host:"localhost",
    user:"postgres",
    port:5432,
    password:'1928',
    database:"postgres"
})

client1.connect();

client1.query('SELECT * from users u INNER JOIN username n on u.id_user=n.id_user WHERE u.id_user = 1',(err, res)=>{
    if(!err){

        console.log(res.rows);
    }
    else{
        console.log(err.message)
    }
    client1.end();
})