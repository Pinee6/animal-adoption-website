const express = require('express');
const router = express.Router();

// 导入处理注册和登录的控制器或函数
const { registerUser, loginUser } = require('./authController');


// 登录页面
router.get('/login', (req, res) => {
    res.render('login');
});
  
// 注册页面
router.get('/register', (req, res) => {
    res.render('register');
});

// 注册路由
router.post('/register',(req,res)=>{
    // console.log('Request Headers:', req.headers);
    // console.log('Request Body:', req.body);
    registerUser(req, res);
})

// 登录路由
router.post('/login', (req, res) => {
    // console.log('Request Headers:', req.headers);
    // console.log('Request Body:', req.body);
    loginUser(req,res);
    // 处理登录逻辑
});

module.exports = router;
