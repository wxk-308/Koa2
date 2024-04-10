const Router = require('@koa/router');
const {register, login} = require('../controller/user.controller')
const {userVaildator, verifyUser, crpytPassword, verifyLogin, changePassword} = require('../middleware/user.middleware')
const {auth} = require('../middleware/auth.middleware')

const userRouter  = new Router({prefix : '/users'});

userRouter.post('/login', userVaildator, verifyLogin, login)
userRouter.post('/register',userVaildator, verifyUser, crpytPassword, register)

userRouter.patch('/', auth, crpytPassword, changePassword)

module.exports = userRouter 