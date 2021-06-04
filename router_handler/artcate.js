//导入数据库配置模块
const db = require('../db/index')


//定义获取文章分类处理函数
let getArtCates = (req, res) => {
    //定义sql 调用数据库操作方法 查询文章分类数据‘
    let sql = `select * from ev_article_cate where is_delete=0 order by id;`
    db.query(sql, (err, data) => {
        if(err) return res.cc(err);
        res.send({
            status: 0,
            message:'文章分类数据请求成功',
            data: data[0]
        })
    })
}

//定义新增文章分类处理函数
let addArtCate = (req, res) => {
    let name = req.body.name;
    let alias = req.body.alias;
    //定义sql进行文章分类名的查重和分类别名查重
    let sql = `select * from ev_article_cate where name=? or alias=?`
    //定义参数数组
    let sqlArr = [name, alias];
    //调用数据库操作函数方法进行操作数据库
    db.query(sql, sqlArr, (err, data) => {
        if(err) return res.cc(err);
        //分别针对分类名称和别名进行查重判断
        if(data.length == 2) return res.cc('分类名称与分类别名均已被占用');
        if(data.length == 1 && name == data[0].name && alias == data[0].alias) return res.cc('分类名称与分类别名均已被占用');
        if(data.length == 1 && name == data[0].name) return res.cc('分类名称被占用')
        if(data.length == 1 && alias == data[0].alias) return res.cc('分类别名被占用')
        //进行数据的插入
        let sql = `insert into ev_article_cate set ?`
        db.query(sql, req.body, (err, data) => {
            if(err) return res.cc(err);
            if(data.affectedRows !== 1) return res.cc('数据插入失败');
            res.send({
                status: 0,
                message: '数据插入成功'
            })
        })
    })
}

//根据id删除文章分类操操作函数
let delArtCateById = (req, res) => {
    //根据id删除数据
    let id = req.params.id;
    let sql = `update ev_article_cate set is_delete=1 where id=?;`
    db.query(sql, id, (err, data) => {
        if(err) return res.cc(err);
        if(data.affectedRows !== 1) return res.cc('删除数据失败');
        res.cc('删除数据成功', 0)
    })
}

//根据id获取文章分类信息
let getArtCateById = (req, res) => {
    let id = req.params.id;
    let sql = `select * from ev_article_cate where id=?`
    db.query(sql, id, (err, data) => {
        if(err) return res.cc(err);
        if(data.length < 1) return res.cc('未查询到相关数据');
        res.send({
            status: 0,
            message: '数据查询成功',
            data: data[0]
        })
    })
}

//更新分类数据
let updataCate = (req, res) => {
    //先查询 再更新数据
    let id = req.body.Id;
    let name = req.body.name;
    let alias = req.body.alias;

    //定义sql
    let sql = `select * from ev_article_cate where id<>? and (name=? or alias=?)`
    let sqlArr = [id, name, alias]
    db.query(sql, sqlArr, (err, data) => {
        if(err) return res.cc(err);
        //判重
        if(data.length == 2) return res.cc('分类名称与分类别名均已被占用');
        if(data.length == 1 && name == data[0].name && alias == data[0].alias) return res.cc('分类名称与分类别名均已被占用');
        if(data.length == 1 && name == data[0].name) return res.cc('分类名称被占用')
        if(data.length == 1 && alias == data[0].alias) return res.cc('分类别名被占用')

        let sql = `update ev_article_cate set ? where id=?`
        db.query(sql, [{name, alias}, id], (err, data) => {
            if(err) return res.cc(err);
            if(data.affectedRows !== 1) return res.cc('更新数据失败');
            res.cc('更新数据成功', 0)
        })
        // res.send('更新数据接口调用成功')
    })
}



module.exports = {
    getArtCates,
    addArtCate,
    delArtCateById,
    getArtCateById,
    updataCate
}


