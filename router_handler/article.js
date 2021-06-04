//导入数据库操作模块
const db = require('../db/index')

//path路径处理模块
const path = require('path')


let addArt = (req, res) => {

    //进行file数据的判断
    if(!req.file || req.file.fieldname !== 'cover_img') return res.cc('文章封面是必选参数');

    //定义文章数据
    const artInfo = {
        //文章标题、内容、所属分类id、发布状态
        ...req.body,
        //文章封面图片路径
        cover_img: path.join('/uploads', req.file.filename),
        //文章所属用户id
        author_id: req.user.id,
        //文章发布时间
        pub_date: new Date()
    }

    //发布文章 插入到数据库
    let sql = `insert into ev_articles set?`

    db.query(sql, artInfo, (err, data) => {
        if(err) return res.cc(err);
        if(data.affectedRows !== 1) return res.cc('文章发布失败');
        res.send({
            status: 0,
            message: '文章发布成功',
            imgUrl: artInfo.cover_img
        })
    })
}


module.exports = {
    addArt
}


