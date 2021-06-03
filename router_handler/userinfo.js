//导入数据库配置模块
const db = require('../db/index')

//获取用户信息处理函数
let getUserInfo = (req, res) => {
    //定义查询用户信息sql
    let sql = `select username, nickname, email, user_pic from ev_users where id=?`;
    //调用数据库处理函数
    db.query(sql, req.user.id, (err, data) => {
        //如果发生错误将错误抛出
        if(err) return res.cc(err)
        //如果没有查询到用户信息 抛出用户信息查询失败提醒
        if(data.length < 1) return res.cc('未查询到用户信息')
        //数据查询成功之后 提醒查询成功 将数据返回给客户端
        res.send({status: 0,message: '用户信息查询成功！', data: data[0]})
    })
}

//更新用户信息的方法


//将操作方法暴露出去
module.exports = {
    getUserInfo
}


