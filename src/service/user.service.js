const { where } = require('sequelize');
const User = require('../module/user.module')

class UserService {
    async createUser(username, password){
        // 创建一个新用户
        const res = await User.create({ username: username, password:password});
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

        return res.dataValues ? res.dataValues : null
    }
}

module.exports = new UserService()