const { where } = require('sequelize');
const User = require('../module/user.module')

class UserService {
    async createUser(username, password, is_admin = false){
        // 创建一个新用户
        const res = await User.create({ username, password, is_admin});
        console.log(res);
        return res.dataValues
    }
    async getUserInfo({id, username, password, is_admin}){
        const whereOpt = {}
        id && Object.assign(whereOpt, {id})
        username && Object.assign(whereOpt, {username})
        password && Object.assign(whereOpt, {password})
        is_admin && Object.assign(whereOpt, {is_admin})

        const res = await User.findOne({
            attributes: ['id', 'username', 'password', 'is_admin'],
            where: whereOpt
        })

        return res ? res.dataValues : null
    }
    async updateById ({id, username, password, is_admin}){
        const whereOpt = {id}
        const newUser = {}

        username && Object.assign(newUser, {username})
        password && Object.assign(newUser, {password})
        is_admin && Object.assign(newUser, {is_admin})
        const res = await User.update(newUser, {where: whereOpt})

        return res[0] > 0 ? true : false
    }
}

module.exports = new UserService()