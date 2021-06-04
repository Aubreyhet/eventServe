//导入验证规则处理第三方模块
const expressJoi = require('@escook/express-joi');
const joi = require('joi')

//定义文章分类名称的校验规则
const artName = joi.string().required();

//定义文章分类别名的校验规则
const alias = joi.string().alphanum().required()

//定义删除文章分类的id
const id = joi.number().integer().min(1).required()

//向外共享校验规则
exports.add_cates_schema = {    
    body: {
        name: artName,
        alias
    }
}

//共享删除校验规则
exports.del_cates_schema = {
    params: {
        id
    }
}

//共享获取校验规则
exports.get_cates_schema = {
    params: {
        id
    }
}

//更新分类数据校验规则
exports.updata_cate_schema = {
    body: {
        Id: id,
        name: artName,
        alias
    }
}


