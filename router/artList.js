const express = require('express');

const router = express.Router();

//导入处理函数模块
const artList = require('../router_handler/artlists');

router.get('/list', artList.getArtList)

//删除文章路由
router.get('/delete/:id', artList.delArt)


module.exports = router;





