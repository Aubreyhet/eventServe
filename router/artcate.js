const express = require('express')

const router = express.Router()

//映入校验第三方模块和校验规则模块进行处理
const expressJoi = require('@escook/express-joi');
const { add_cates_schema, del_cates_schema, get_cates_schema, updata_cate_schema } = require('../schema/artcate')


//导入处理函数模块
const artCate = require('../router_handler/artcate')

router.get('/cates', artCate.getArtCates)

//新增文章分类处理路由
router.post('/addcates', expressJoi(add_cates_schema), artCate.addArtCate)

//删除文章分类处理路由
router.get('/deletecate/:id', expressJoi(del_cates_schema), artCate.delArtCateById)

//定义使用id获取文章分类的路由
router.get('/cates/:id', expressJoi(get_cates_schema), artCate.getArtCateById)

//定义更新分类数据的路由
router.post('/updatecate', expressJoi(updata_cate_schema), artCate.updataCate)



module.exports = router


