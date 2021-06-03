//导入数据库配置模块
const db = require('../db/index')

//导入密码加密模块对密码进行加密操作
const bcryptjs = require('bcryptjs')

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

//更新用户信息的方法 根据id更改用户信息
let updateUserInfo = (req, res) => {
    //获取传过来的用户信息
    let user = req.body;
    //获取传过来的id
    let id = req.body.id;
    //定义sql更新数据语句
    let sql =  `update ev_users set ? where id=?;`
    //定义参数数组
    let sqlArr = [user, id]
    //调用db数据库操作方法
    db.query(sql, sqlArr, (err, data) => {
        if(err) return res.cc(err);
        if(data.affectedRows !== 1) return res.cc('用户信息更改失败!');
        res.send({
            status: 0,
            message: '用户信息更改成功！'
        })
    })
}

//重置用户密码
let updatePassword = (req, res) => {
    //根据req携带的用户id 进行查询用户是否存在
    let sql = `select * from ev_users where id=?`
    //调用数据库操作函数
    db.query(sql, req.user.id, (err, data) => {
        //数据库处理失败
        if(err) return res.cc(err);
        //没有查询到该id对应的用户
        if(data.length < 1) return res.send('用户不存在');
        //使用密码加密模块的方法进行检验密码是否相同
        if(!bcryptjs.compareSync(req.body.oldPwd, data[0].password)) return res.cc('旧密码错误！')
        //定义sql 将新密码加密 调用数据库操作函数更新密码
        let sql = `update ev_users set password=? where id=?`
        let newPwd = bcryptjs.hashSync(req.body.newPwd, 10)
        db.query(sql, [newPwd, req.user.id], (err, data) => {
            if(err) return res.cc(err);
            if(data.affectedRows !== 1) return res.cc('密码更新失败!');
            res.cc('密码更改成功！', 0)
        }) 
    })
}


//更换用户头像方法
let updateAvatar = (req, res) => {
    //定义更新头像sql 
    let sql = `update ev_users set user_pic=? where id=?;`
    //定义传入数据操作的参数数组
    let sqlArr = [req.body.avatar, req.user.id];
    //调用数据库操作方法
    db.query(sql, sqlArr, (err, data) => {
        if(err) return res.cc(err);
        if(data.affectedRows !== 1) return res.cc('头像更换失败，请稍后重试');
        res.cc('更换头像成功！', 0)
    })
}

//将操作方法暴露出去
module.exports = {
    getUserInfo,
    updateUserInfo,
    updatePassword,
    updateAvatar
}


