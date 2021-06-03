//导入express模块
const express = require('express')

//挂载路由模块
const router = express.Router()

//导入用户信息处理函数模块
const userInfo  = require('../router_handler/userinfo')

router.get('/userinfo', userInfo.getUserInfo)



//暴露出用户信息模块
module.exports = router



