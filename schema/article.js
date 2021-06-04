const joi = require('joi')

//定义校验规则
const title = joi.string().required();
const cate_id = joi.number().integer().min(1).required();
const content = joi.string().required().allow();
const state = joi.string().valid('已发布', '草稿').required();

//共享出去
exports.add_article_schema  = {
    body: {
        title,
        cate_id,
        content,
        state
    }
}

