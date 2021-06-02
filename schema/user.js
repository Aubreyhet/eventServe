//导入验证规则处理第三方模块
const joi = require('joi')

//定义用户名的验证规则  链式调用 用户名必须是字符串 0-1a-zA-Z 最小长度为1 最长为10位 必填  
const username = joi.string().alphanum().min(1).max(10).required()

//定义密码验证规则 密码必须是字符串 正则表达式 6到12位校验 必填
const password = joi.string().pattern(/^[\S]{6,12}$/).required()


//将校验规则挂载到导出对象上 校验登录和注册时候的用户名和密码
exports.reg_login_schema = {
    body: {
        username,
        password
    }
}


