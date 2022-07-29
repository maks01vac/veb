
const {Client} = require('pg')
const client1 = new Client({
    host:"localhost",
    user:"postgres",
    port:5432,
    password:'192837',
    database:"postgres"
})

client1.connect();

client1.query('SELECT * from users',(err, res)=>{
    if(!err){
        console.log(res.rows);
    }
    else{
        console.log(err.message)
    }
    client1.end();
})