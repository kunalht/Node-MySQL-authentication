let express = require('express'),
    router = express.Router(),
    authenticationMiddleware = require('../middleware/authentication'),
    passport = require('passport')


router.get('/login', authenticationMiddleware.getLogin)
router.get('/register', authenticationMiddleware.getRegister)

// router.post('/register',(req,res)=>{
//     console.log("POSTED")
//     console.log(req.body)
// })
router.post('/login',
    passport.authenticate('local-login', {
        successRedirect: '/login',
        failureRedirect: '/loginn'
    }));
router.post('/register',
    passport.authenticate('local', {
        successRedirect: '/register',
        failureRedirect: '/registerr'
    }));

// router.get("/register", middlewareObj.getRegister)
router.get('/logout',authenticationMiddleware.logout)

module.exports = router;