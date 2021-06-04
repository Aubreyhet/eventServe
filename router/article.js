const express = require('express')


const router = express.Router();


router.post('/add', (req, res) => {
    res.send('添加文章接口请求成功')
})


module.exports = router

