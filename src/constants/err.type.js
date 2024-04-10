module.exports = {
    userFormateError: {
        code: '10001',
        message: '用户名或密码为空',
        result:''
    },
    userAlreadyExist: {
        code: '10002',
        message: '用户已经存在',
        result: ''
    },
    userRegisterError:{
        code: '10003',
        message: '用户注册错误',
        result: ''
    },
    userDoseNotExist: {
        code: '10004',
        message: '用户不存在',
        result: ''
    },
    userLoginError: {
        code: '10005',
        message: '用户登录失败',
        result: ''
    },
    invaildPassword: {
        code: '10006',
        message: '密码不匹配',
        result: ''
    },
    tokenExpiredError: {
        code: '10101',
        message: 'token已过期',
        result:''
    },
    invalidToken: {
        code: '10102',
        message: 'token无效',
        result: ''
    },
    changePasswordError: {
        code: 0,
        message: '修改密码错误',
        result: ''
    },
    hasNotAdminPermission: {
        code: '10103',
        messgae: '无管理员权限',
        result:''
    },
    fileUploadError: {
        code: '10201',
        message: '商品上传失败',
        result: ''
    },
    unSupportFileType: {
        code: '10202',
        message: '上传文件格式不支持',
        result: ''
    },
    goodsFormatError: {
        code: '10203',
        message: '商品参数格式错误',
    },
    publishGoodsError: {
        code: '10204',
        message: '发布商品失败',
        result: ''
    },
    invalidGoodsId: {
        code: '10205',
        message: '修改的商品不存在',
        result: ''
    },
    changeGoodsError: {
        code: '10206',
        message: '修改商品失败',
        result: ''
    },
    deleteGoodsError: {
        code: '10207',
        message: '删除商品失败',
        result: ''
    },
    offGoodsError: {
        code: '10208',
        message: '下架商品失败',
        result: ''
    },
    restoreGoodsError: {
        code: '10209',
        message: '上架商品失败',
        result: ''
    }
}