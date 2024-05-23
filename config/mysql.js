const mysql = require('mysql2')
require('dotenv').config();


const conn = mysql.createConnection({
    host:process.env.LOCAL_HOST,
    user:process.env.LOCAL_USERNAME,
    password:process.env.LOCAL_PASSWORD,
    database:process.env.LOCAL_DATABASE
})

conn.connect((err)=>{
    if (err) {
        console.log('================error database====================');
        console.log(err);
        console.log('====================================');
    }
    return;
})
module.exports = conn;