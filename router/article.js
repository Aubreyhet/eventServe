const express = require('express')

//导入formdata数据处理模块 和path模块
const multer = require('multer');
const path = require('path')

//引入校验规则模块
const expressJoi = require('@escook/express-joi')
const { add_article_schema } = require('../schema/article')

const uploads = multer({dest: path.join(__dirname, '../uploads')})

//
const article = require('../router_handler/article')


const router = express.Router();


router.post('/add',  uploads.single('cover_img'), expressJoi(add_article_schema), article.addArt)


module.exports = router

