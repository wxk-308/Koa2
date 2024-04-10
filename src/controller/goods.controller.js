const path = require('path')
const {fileUploadError, unSupportFileType} = require('../constants/err.type')

class GoodsController {
    async upload (ctx, next){
        const file = ctx.request.files.file
        const fileType = ['image/jpeg', 'image/png']
        if(file){
            if(!fileType.includes(file.mimetype)){
                ctx.app.emit('error', unSupportFileType, ctx)
                return 
            }
            ctx.body = {
                code: 0,
                message: '商品图片上传成功',
                result: {
                    goods_img: path.basename(file.filepath)
                }
            }
        }else{
            ctx.app.emit('error', fileUploadError, ctx)
            return 
        }
        await next()
    }
}

module.exports = new GoodsController()
