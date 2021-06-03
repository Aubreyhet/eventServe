//导入express模块
const express = require('express')

//导入检验规则中间件
const expressJoi = require('@escook/express-joi');

//导入校验规则对象
const { update_userinfo_schema, update_password_schema, update_avatar_schema } = require('../schema/user')

//挂载路由模块
const router = express.Router()

//导入用户信息处理函数模块
const userInfo  = require('../router_handler/userinfo')

//获取用户信息的接口
router.get('/userinfo', userInfo.getUserInfo)

//更改用户信息的接口
router.post('/userinfo', expressJoi(update_userinfo_schema), userInfo.updateUserInfo)

//重置用户密码的接口
router.post('/updatepwd', expressJoi(update_password_schema), userInfo.updatePassword)

//重置用户头像
router.post('/update/avatar', expressJoi(update_avatar_schema), userInfo.updateAvatar)


//暴露出用户信息模块
module.exports = router



