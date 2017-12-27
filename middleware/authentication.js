const mysql = require('mysql'),
    mysqlAuth = require('../config/mysqlAuth').mysqlAuth,
    passport = require('passport'),
    LocalStrategy = require("passport-local")


let authPassportLogic = {};


let pool = mysql.createPool({
    connectionLimit: 10,
    host: mysqlAuth.host,
    user: mysqlAuth.user,
    password: mysqlAuth.password,
    database: mysqlAuth.db,
    port: mysqlAuth.port
});


let authenticationMiddleware = {};

authenticationMiddleware.getLogin = (req, res) => {
    console.log(req.user)
    res.render('login')
}

authenticationMiddleware.getRegister = (req, res) => {
    res.render('register')
}

authenticationMiddleware.logout = (req, res) => {
    req.logout()
    res.redirect('back')
}
module.exports = authenticationMiddleware;