const {createUser, getUserInfo} = require('../service/user.service')
const {userRegisterError} = require('../constants/err.type')
const {JWT_SECRET} = require('../config/config.default')
var jwt = require('jsonwebtoken')

class UserController {
    async register (ctx, next) {
        // 1. 获取数据
        const {username, password, is_admin} = ctx.request.body
        
        //2. 数据操作
        // console.log(username, password);
        try{
            const res = await createUser(username, password, is_admin)
            // 3. 返回结果
            ctx.body = {
                code: 0,
                message: '用户注册成功',
                result: {
                    id: res.id,
                    username: res.username
                }
                
            }
        }catch(error){
            ctx.app.emit('error',userRegisterError, ctx)
        }
      
    }
    async login (ctx, next) {
        const {username} = ctx.request.body
        
        try{
            const {password, ...res} = await getUserInfo({username})
            ctx.body = {
                code: 0,
                message: '用户登录成功',
                result: {
                    token: jwt.sign(res, JWT_SECRET,{expiresIn: '1d'})
                }
            }
        }catch(error){
            console.log('用户登录失败');
        }
        
    }
}

module.exports = new UserController()