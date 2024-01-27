const express = require('express');
const bodyParser = require('body-parser');
const session=require('express-session')
const app = express();
const router=require("./route/router");

app.use(bodyParser.json());
app.use(express.json()); // 添加中间件来解析 JSON 格式的请求体


// 使用 express-session 中间件
app.use(session({
  secret: 'asdferf', // 用于签名 session ID 的密钥
  resave: false, // 如果为 true，强制保存 session 即使没有变化
  saveUninitialized: true, // 如果为 true，强制将未初始化的 session 存储
}));


app.set("view engine", "ejs");
app.set("views",'./views');
app.use(express.static("public"));
app.use('/css', express.static('public/css'));
app.use('/images', express.static('public/images'));


app.use(express.json());
app.use('/',router);
app.use(express.urlencoded({ extended: true }));


const port = 5950;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

module.exports = app;