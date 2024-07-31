一个很简单的课程设计，很多东西没有考虑到。。。

## 如何运行：
1. 导入所有包
  在命令行中npm install
2. 配置数据库
  在config/database.js和config/config.json中将所有的数据库username和password改成自己的，以及在MySQL创建名为web_adoption的数据库
3. 运行
  运行app.js

## 介绍：
* 前端：HTML+CSS+JavaScript+Bootstrap
* 后端：Express+EJS+MySQL

## 项目目录
* config目录下为数据库配置
* models目录下为数据库中两张表animal和user的模型
* public目录下为图片、css等资源
* route目录下为路由，router.js封装所有路由；checkAuth为中间件，用于检测是否登录以及用户为普通用户还是机构用户；publishRoute和publishController用于实现发布功能；authRoute与authController用于实现登录与注册
* view目录下为ejs模板

## 数据库设计
动物↓
![image](https://github.com/user-attachments/assets/829d8bc1-9b00-48ff-ac4a-5472ad3758c0)
用户↓（organizationCode用于标识是否是机构，个人用户为空，机构用户为机构代码）
![image](https://github.com/user-attachments/assets/34133ba4-743a-42f6-9f1f-672d728433cb)


## 前端展示
1.注册与登录
注册：
个人注册↓
![image](https://github.com/user-attachments/assets/ee6f22ed-b64d-467a-8d5e-c678b76627e5)
组织机构注册↓
![image](https://github.com/user-attachments/assets/6f0be1ef-0afa-4e15-b3b1-e4f80f80e17d)
登录：
个人登录↓
![image](https://github.com/user-attachments/assets/a8ff1476-c555-4cfc-884e-3c4ec4b3f45a)
组织机构登录↓
![image](https://github.com/user-attachments/assets/f9d68123-c78e-4566-8112-e705354a37cf)
2. 首页
![image](https://github.com/user-attachments/assets/f0140d3e-8eac-40ec-836f-c2f3415f2ac2)
![image](https://github.com/user-attachments/assets/7855ddf5-513b-45fe-99f0-3a0bfe59aac6)
![image](https://github.com/user-attachments/assets/ff370c68-e37e-4774-a8d8-d9e7a6e80aeb)
3. 领养页面
![image](https://github.com/user-attachments/assets/ba21a94f-fc79-4b14-bc20-ae7f304dca96)
4. 发布领养
个人：
![image](https://github.com/user-attachments/assets/1e305ef1-10a3-4480-8483-00f07ba74f8c)
组织（后端不成功）：
![image](https://github.com/user-attachments/assets/e9214aed-e3bd-4177-8071-14c01663dc67)
5. 个人主页及联系我们页面
