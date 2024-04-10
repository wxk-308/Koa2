var jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config/config.default')
const {tokenExpiredError, invalidToken, hasNotAdminPermission} = require('../constants/err.type')

const auth = async (ctx, next) => {
    const {authorization = ''} = ctx.request.header
    const token = authorization.replace('Bearer ', '')
    // console.log(token);

    try{
        // user(id, username, is_admin)
        const user = jwt.verify(token, JWT_SECRET)
        ctx.state.user = user
    }catch(error){
        switch (error.name){
            case'TokenExpiredError':
                console.log('token过期', error)
                ctx.app.emit('error', tokenExpiredError, ctx)
                return 
            case 'JsonWebTokenError':
                console.log('token无效', error)
                ctx.app.emit('error', invalidToken, ctx)
                return 
        }
    }   

    await next()
}
const hadAdminPermission = async (ctx, next) => {
    const {id_admin} = ctx.state.user
    if(id_admin === false){
        console.log('用户没有管理权限', ctx.state.user)
        ctx.app.emit('error', hasNotAdminPermission, ctx)
        return 
    }

    await next()
}
module.exports = {
    auth,
    hadAdminPermission
}