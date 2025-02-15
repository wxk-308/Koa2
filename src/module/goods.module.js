const { DataTypes } = require('sequelize');
const seq = require('../db/seq')

const Goods = seq.define('Goods', {
    // 在这里定义模型属性
    goods_name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '商品名称 唯一'
    },
    goods_price: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
      comment: '商品价格'
    },
    goods_num: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '商品库存'
    },
    goods_img: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '商品图片'
    },
  }, {
    // timestamps: false,
    paranoid: true
  });

//   Goods.sync({ force: true });
module.exports = Goods