const Router = require('@koa/router');
const {register, login} = require('../controller/user.controller')
const {userVaildator, verifyUser, crpytPassword, verifyLogin} = require('../middleware/user.middleware')

const userRouter  = new Router({prefix : '/users'});

userRouter.post('/login', userVaildator, verifyLogin,login)
userRouter.post('/register',userVaildator,verifyUser, crpytPassword, register)

module.exports = userRouter 