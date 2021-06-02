//导入mysql 模块
const mysql = require('mysql');

//创建数据库连接
const db = mysql.createPool({
    host: '47.115.220.142',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'ev_db'
})

//暴露数据库配置出去
module.exports = db


