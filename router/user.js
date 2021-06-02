//导入express模块
const express = require('express')

//导入检验规则的模块
const expressjoi = require('@escook/express-joi');

//导入需要检验规则的对象 使用解构的方式
const { reg_login_schema } = require('../schema/user')

//导入路由模块
const router = express.Router();

//导入用户路由处理函数对应的模块
const userRouter = require('../router_handler/user')

//注册接口 在注册接口中加入第二个参数 使用中间间校验传入的数据是否合法 然后在全局定义错误捕获中间件  需要在路由中间件之后检验
router.post('/reguser',expressjoi(reg_login_schema), userRouter.reguser)

//登录接口 在登录接口中加入第二个参数 使用中间间校验传入的数据是否合法 然后在全局定义错误捕获中间件 
router.post('/login',expressjoi(reg_login_schema), userRouter.login)

//将模块暴露出去
module.exports = router




