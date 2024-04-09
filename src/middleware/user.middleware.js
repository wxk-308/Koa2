const {getUserInfo} = require('../service/user.service')
const {userFormateError, userAlreadyExist,userRegisterError, userDoseNotExist, userLoginError, invaildPassword} = require('../constants/err.type')
var bcrypt = require('bcryptjs');

const userVaildator = (async (ctx, next) => {
    // 1. 获取数据
    const {username, password} = ctx.request.body
    // 合法性
    if(!username || !password){
        console.log('用户名或密码为空', ctx.request.body);
        ctx.app.emit('error', userFormateError, ctx)
        return 
    }
    await next()
})
const verifyUser = (async (ctx, next) => {
    // 合理性判断
    const {username} = ctx.request.body

    try{
        const res = await getUserInfo({username})
        if(res){
            console.log('用户已经存在')
            ctx.app.emit('error', userAlreadyExist, ctx)
            return 
        }
    }catch(error){
        console.log('用户注册错误');
        ctx.app.emit('error', userRegisterError, ctx)
        return 
    }
    await next()

})

const crpytPassword = (async (ctx, next) => {
    const {password} = ctx.request.body
    var salt = bcrypt.genSaltSync(10);
    var hashPassword = bcrypt.hashSync(password, salt);
    ctx.request.body.password = hashPassword
    await next()
})

const verifyLogin = (async (ctx, next) => {
    const {username, password} = ctx.request.body

    try{
        const res = await getUserInfo({username})
        if(!res){
            console.log('用户不存在')
            ctx.app.emit('error', userDoseNotExist, ctx)
            return 
        }
        if(!bcrypt.compareSync(password, res.password)){
            console.log('密码错误');
            ctx.app.emit('error', invaildPassword, ctx)
            return 
        }
    }catch(error){
        console.log('用户登录错误');
        ctx.app.emit('error', userLoginError, ctx)
        return 
    }
    
    await next()

})

module.exports = {userVaildator, verifyUser, crpytPassword, verifyLogin}