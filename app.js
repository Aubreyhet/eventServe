//导入express
const express = require('express')
const app = express()

//导入cors 中间件 用于跨域处理
const cors = require('cors');

//导入用户路由模块
const userRouter = require('./router/user')

//导入用户信息模块
const userInfoRouter = require('./router/userinfo')

//导入需要检验数据的对象模块
const joi = require('joi')

//导入token的配置文件
const config = require('./config');

//导入解析token的模块
const expressJWT = require('express-jwt');

//全局注册跨域中间件
app.use(cors());


//使用express内置中间件配置解析表单数据
app.use(express.urlencoded({ extended:false }))

//定义全局的错误处理函数
app.use(function(req, res, next){
    //status = 0 表示 成功 1是失败
    res.cc = function(err, status = 1){
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }
    next()
})


//在路由挂载之前配置全局token解析
app.use(expressJWT({secret: config.jwtSecretKey}).unless({path:[/^\/api\//]}))

//全局注册路由模块中间件
app.use('/api', userRouter)

//全局注册用户信息路由中间件
app.use('/my', userInfoRouter)

//在全局路由中间件之后定义数据校验的异常处理中间件
app.use((err, req, res, next) => {
    //验证失败导致的错误
    if(err instanceof joi.ValidationError) return res.cc(err)
    //token验证的错误判断处理
    if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
    //未知的错误抛出
    res.cc(err.message)
})

const port = 3001

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))



