const path = require('path')
const Koa = require('koa')
const router = require('../router/index')
const { koaBody } = require('koa-body')
const {handleError} = require('./handleError')
const KoaStatic = require('koa-static')
const parameter = require('koa-parameter')

const app = new Koa()

app.use(parameter(app))

app.use(koaBody({
    multipart: true,
    formidable: {
        uploadDir: path.join(__dirname, '../upload'), //上传地址
        keepExtensions: true //开启后缀
    }
}));
app.use(router.routes())
app.use(router.allowedMethods())

app.use(KoaStatic(path.join(__dirname, '../upload')))
// 同一错误处理
app.on('error', handleError)
module.exports = app