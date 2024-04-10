const {goodsFormatError, publishGoodsError, 
    invalidGoodsId, changeGoodsError,
     deleteGoodsError, offGoodsError,
     restoreGoodsError} = require('../constants/err.type')
const {createGoods, updateGoods, removeGoods, restoreGoods, findGoods} = require('../service/goods.service')
const validatorGoods = async (ctx, next) => {
    try{
        ctx.verifyParams({
            goods_name: {type:'string', required: true},
            goods_price: {type: 'number', required: true},
            goods_num: {type: 'number', required: true},
            goods_img: {type: 'string', required: true}
        })
    }catch(error){
        goodsFormatError.result = error
        ctx.app.emit('error', goodsFormatError, ctx)
        return 
    }

    await next()
}

const create = async (ctx, next) => {
    try{
        const res = await createGoods(ctx.request.body)
        ctx.body = {
            code: 0,
            message: '发布商品成功',
            result: res
        }
    }catch(error){
        console.log('发布商品失败123', error)
        ctx.app.emit('error', publishGoodsError, ctx)
        return 
    }
    await next()
}

const update = async (ctx, next) => {
    try{
        const res = await updateGoods(ctx.params.id, ctx.request.body)
        if(res){
            ctx.body = {
                code: 0,
                message: '修改商品成功',
                result: ''
            }
        }else{
            console.log('修改商品失败')
            ctx.app.emit('error', invalidGoodsId, ctx)
        }
    }catch(error){
        console.log('修改商品失败', error)
        ctx.app.emit('error', changeGoodsError, ctx)
        return 
    }

}
const remove = async (ctx, next) => {
    try{
        const res = await removeGoods(ctx.params.id)
        if(res){
            ctx.body = {
                code: 0,
                message: '下架商品成功',
                result: ''
            }
        }else{
            console.log('下架商品不存在');
            ctx.app.emit('error', offGoodsError, ctx)
            return 
        }
    }catch(error){
        console.log('下架商品错误', error)
        ctx.app.emit('error', deleteGoodsError, ctx)
        return 
    }
    await next()
}
const restore = async (ctx, next) => {
    try{
        const res = await restoreGoods(ctx.params.id)
        if(res){
            ctx.body = {
                code: 0,
                message: '上架商品成功',
                result: ''
            }
        }else{
            console.log('上架商品无效')
            ctx.app.emit('error', restoreGoodsError, ctx)
            return 
        }
    }catch(error){
        console.log('上架商品错误', error)
        ctx.app.emit('error', restoreGoodsError, ctx)
        return 
    }
    await next()
}
const findAll = async (ctx, next) => {
    const {pageNum = 1, pageSize = 10} = ctx.request.query
    const res = await findGoods(pageNum, pageSize)
    ctx.body = {
        code: 0,
        message: '获取商品列表成功',
        result: res
    }
}

module.exports = {
    validatorGoods,
    create,
    update,
    remove,
    restore,
    findAll
}