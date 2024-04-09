const Koa = require('koa');
const userRouter = require('../router/user.router')
const { koaBody } = require('koa-body');
const {handleError} = require('./handleError')

const app = new Koa()

app.use(koaBody());
app.use(userRouter.routes())

// 同一错误处理
app.on('error', handleError)
module.exports = app