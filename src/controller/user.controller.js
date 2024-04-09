const {createUser} = require('../service/user.service')
const {userRegisterError} = require('../constants/err.type')


class UserController {
    async register (ctx, next) {
        // 1. 获取数据
        const {username, password} = ctx.request.body
        
        //2. 数据操作
        // console.log(username, password);
        try{
            const res = await createUser(username, password)
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
        ctx.body = `欢迎回来， ${username}`
    }
}

module.exports = new UserController()