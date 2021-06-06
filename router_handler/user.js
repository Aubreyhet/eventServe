//导入密码加密模块对密码进行加密操作
const bcryptjs = require('bcryptjs')

//导入jsonwebtoken模块 es6写法
const jwt = require('jsonwebtoken');

//导入token加密配置
const { jwtSecretKey, jwttimeout} = require('../config');

//导入数据库配置模块
const db = require('../db/index')

let reguser = (req, res) =>{
    let userinfo = req.body;
    //判空  已经使用校验规则中间件处理用户名密码的规则
    // if(!userinfo.username || !userinfo.password){
    //     return res.cc('用户名或者密码不能为空', 1) //res.send('用户名或者密码不能为空')
    // }
    //通过查询数据库进行查重操作
    //操作数据库 //定义查询语句
    let sql = `select * from ev_users where username=?`;
    //定义数据查询数组如果参数较少 可以不用定义
    let sqlArr = [userinfo.username];
    //调用数据库操作方法进行数据库查询
    db.query(sql, sqlArr, (err, data) => {
        if(err){
            return res.cc(err.message) //res.send({ status: 1, message: '数据库查询失败' })
        }
        //判断查询出来的数据长度是否大于0 大于0说明数据已经存在 否则可以注册
        if(data.length > 0){
            return res.cc('用户名已经存在！') //res.send({ status: 1, message: '用户名已经存在'} )
        }
        //用户名符合条件之后 可已进行密码的加密处理 并将数据存入到数据库
        //加密密码 bcryptjs.hashSync 参数1 是需要加密的数据  参数2是随机的几位数字
        userinfo.password = bcryptjs.hashSync(userinfo.password, 10)
        //定义操作数据库语句 存入数据
        let sql = `insert into ev_users set ?`
        db.query(sql, { username: userinfo.username, password: userinfo.password }, (err, data) => {
            if(err) return res.cc(err.message) //res.send({status : 1, message: '数据库操作失败!'})
            if(data.affectedRows !== 1) return res.cc('用户注册失败，请稍后重试！') //res.send({status: 1, message: '用户注册失败，请稍后重试！'})
            es.cc('用户注册成功， 请登录！', 0)
            // res.send({
            //     status: 0,
            //     msg: '用户注册成功，请登录！'
            // })
        })
    })
}



let login = (req, res) =>{
    // res.send('登录模块可以加载')
    //接收req表单数据
    let userinfo = req.body;
    //定义数据库查询语句
    let sql = `select * from ev_users where username=?`;
    //调用数据库查询函数 
    db.query(sql, userinfo.username, (err, data) => {
        if(err) return res.cc(err);
        if(data.length !== 1) return res.cc('登录失败！');
        //比较传入的密码和数据库中的密码 使用bcryptjs.compareSync 进行判断 参数1 是传入的参数 参数2 是数据库中的参数
        let judgePwd = bcryptjs.compareSync(userinfo.password, data[0].password)
        if(!judgePwd) return res.cc('用户名密码错误！')

         
        //定义要加密的用户信息 使用jwt加密用户信息
        let user = { ...data[0], password: '', user_pic: '' }
        //加密操作
        let token = jwt.sign(user, jwtSecretKey, {expiresIn: jwttimeout})
        res.send({
            status: 0,
            message: '登录成功！',
            token:'Bearer ' + token 
        })
    })
}

//将路由导出
module.exports = {
    reguser,
    login
}



