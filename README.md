如何运行：
1、导入所有包
  在命令行中npm install
2、配置数据库
  在config/database.js和config/config.json中将所有的数据库username和password改成自己的，以及在MySQL客户端创建名为web_adoption的数据库（可以改）
3、运行
  运行app.js

介绍：
这是一个node.js实现的动物领养网站
config目录下为数据库配置
models目录下为数据库中两张表animal和user的模型
public目录下为图片、css等资源
route目录下为路由，router.js封装所有路由；checkAuth为中间件，用于检测是否登录以及用户为普通用户还是机构用户；publishRoute和publishController用于实现发布功能；authRoute与authController用于实现登录与注册
view目录下为ejs模板（相当于html，但是可以进行动态渲染）
