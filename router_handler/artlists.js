const db = require("../db");

//定义获取文章列表的函数
let getArtList = (req, res) => {
    let start = (req.query.pagenum - 1) * req.query.pagesize;
    let size = req.query.pagesize;
    let sql = `select * from ev_articles where is_delete<>1 limit ?, ?;`
    db.query(sql, [parseInt(start),parseInt(size)],(err, data) => {
        if(err) return res.cc(err);
        let sql = `select count(*) as total from ev_articles where is_delete<>1;`
        db.query(sql, (err, total) => {
            if(err) return res.cc(err);
            res.send({
                status: 0,
                message: '文章列表获取成功',
                data: data,
                total: total[0].total
            })
        })
    })
}

//定义删除文章的函数
let delArt = (req, res) => {
    let id = req.params.id;
    //根据id进行标记删除数据
    let sql = `update ev_articles set is_delete=1 where id=?`
    db.query(sql, id, (err, data) => {
        if(err) return res.cc(err);
        if(data.affectedRows !== 1) return res.cc('删除数据失败');
        res.cc('删除成功', 0)
    })
}

module.exports = {
    getArtList,
    delArt
}


