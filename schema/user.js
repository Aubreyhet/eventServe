//导入验证规则处理第三方模块
const joi = require('joi')

//定义用户名的验证规则  链式调用 用户名必须是字符串 0-1a-zA-Z 最小长度为1 最长为10位 必填  
const username = joi.string().alphanum().min(1).max(10).required()

//定义密码验证规则 密码必须是字符串 正则表达式 6到12位校验 必填
const password = joi.string().pattern(/^[\S]{6,12}$/).required()

//定义更新用户信息客户端向服务端提交的id数据
const id = joi.number().integer().min(1).required();

//定义更新用户信息时客户端向服务端提交的昵称信息校验规则
const nickname = joi.string().required();

//定义更新用户信息时客户端向服务端提交的email 信息校验规则
const email = joi.string().email().required()

//定义更换头像的检验规则
const avatar = joi.string().dataUri().required()

//将校验规则挂载到导出对象上 校验登录和注册时候的用户名和密码
exports.reg_login_schema = {
    body: {
        username,
        password
    }
}

//将用户信息更新的校验规则暴露出去
exports.update_userinfo_schema = {
    body: {
        id, 
        nickname,
        email
    }
}

//导出一个更新密码的验证规则
exports.update_password_schema = {
    body: {
        oldPwd: password,
        newPwd: joi.not(joi.ref('oldPwd')).concat(password)
    }
}

//将验证头像的校验规则导出
exports.update_avatar_schema = {
    body: {
        avatar
    }
}



