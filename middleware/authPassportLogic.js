const mysql = require('mysql'),
mysqlAuth = require('../config/mysqlAuth').mysqlAuth,
bcrypt = require('bcrypt-nodejs'),
bodyParser = require('body-parser'),
methodOverride = require('method-override'),
cookieParser = require('cookie-parser'),
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

passport.serializeUser(function (user, done) {
    done(null, user);
})
passport.deserializeUser(function (user, done) {
    done(null, user);
});
passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    (req, email, password, done) => {
        console.log("register")
        pool.query("SELECT * FROM user WHERE email= ?", [email], (err, rows) =>  {
            if (err) {
                return done(err)
            } else {
                if (rows.length) {
                    return done(null, false)
                } else {
                    
                    let newUser = {}
                    newUser.email = email
                    let hash = bcrypt.hashSync(password)
                    newUser.password = hash
                    pool.query('INSERT INTO user(email,password) VALUES (?,?)', [email, hash],
                         (err, rows) => {
                            req.login(newUser, function (err) {
                                if (err) {
                                    console.log(err)
                                } else {
                                    return done(null, newUser)
                                }
                            })
                        })
                }
            }
        })
    }
))

passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
     (req, email, password, done) => {
        console.log("here")
        // console.log(password)
        pool.query("SELECT * FROM user WHERE email=?", [email],(err, foundUser) => {
            if (err) {
                console.log(err)
                // return done(err)
            } else if (!foundUser.length) {
                return done(null, false)
                // return done(null)
            } else {
                bcrypt.compare(password, foundUser[0].password, (err, res) => {
                    if (res == false) {
                        console.log('wrong password')
                        return done(null, false)
                    } else {
                        req.login(foundUser[0], (err) =>  {
                            if (err) {
                                console.log(err)
                            }
                        })
                        return done(null, foundUser[0])
                    }

                })
            }
        })
    }
))



module.exports = authPassportLogic;