const mysql = require('mysql'),
    mysqlAuth = require('../config/mysqlAuth').mysqlAuth,
    fs = require('fs'),
    path = require('path');

global.appRoot = path.resolve(__dirname);
let sqlMiddleware = {};

let pool = mysql.createPool({
    connectionLimit: 10,
    host: mysqlAuth.host,
    user: mysqlAuth.user,
    password: mysqlAuth.password,
    database: mysqlAuth.db,
    port: mysqlAuth.port
});


let sqlFile = './sql/mainDB.sql'
fs.readFile(sqlFile, 'utf8', (err, data) => {
    if(err) console.log(err)
    pool.query(data,(err,result)=>{
        if(err) console.log(err)
        console.log(result)
    })
});
module.exports = sqlMiddleware;