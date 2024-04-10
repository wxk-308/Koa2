const Router = require('@koa/router');
const {upload} = require('../controller/goods.controller')
const {auth, hadAdminPermission} = require('../middleware/auth.middleware')
const {validatorGoods, create, update, remove, restore, findAll} = require('../middleware/goods.middleware')


const goodsRouter  = new Router({prefix : '/goods'});
//上传图片
goodsRouter.post('/upload', auth, hadAdminPermission, upload)
// 上传商品
goodsRouter.post('/', auth, hadAdminPermission, validatorGoods, create)
// 修改商品
goodsRouter.put('/:id', auth, hadAdminPermission, validatorGoods, update)
// 删除商品
// goodsRouter.delete('/:id', auth, hadAdminPermission, remove)
// 商品下架
goodsRouter.post('/:id/off', auth, hadAdminPermission, remove)
// 商品上架
goodsRouter.post('/:id/on', auth, hadAdminPermission, restore)
// 获取商品列表
goodsRouter.get('/', findAll)

module.exports = goodsRouter