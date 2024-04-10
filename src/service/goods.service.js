const { where } = require('sequelize');
const Goods = require('../module/goods.module')

class GoodsService {
    async createGoods(goods){
        // 创建一个新商品
        const res = await Goods.create(goods)
        return res.dataValues
    }
    async updateGoods(id, goods){
        const res = await Goods.update(goods, {where: {id}})
        return res[0] > 0 ? true : false 
    }
    async removeGoods(id){
        const res = await Goods.destroy({where: {id}})
        return res > 0 ? true : false
    }
    async restoreGoods(id){
        const res = await Goods.restore({where: {id}})
        return res > 0 ? true : false
    }
    async findGoods(pageNum, pageSize){
        // const count = await Goods.count()
        const offset = (pageNum - 1) * pageSize
        // const rows = await Goods.findAll({offset, limit: +pageSize})
        const {count, rows} = await Goods.findAndCountAll({offset, limit: +pageSize})

        return {
            pageNum,
            pageSize,
            total: count,
            list: rows
        }
    }
}

module.exports = new GoodsService()