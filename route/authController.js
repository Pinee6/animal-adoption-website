const  User  = require('../models/user');
// 注册用户的控制器
async function registerUser(req, res) {
  // 检查请求体是否存在
  if (!req.body) {
    res.status(400).json({ error: '请求体不存在' });
    return;
  }
  // console.log('Request body:', req.body);
  // console.log('req:',req) 
  try {
    // 从请求体中获取用户注册信息
    const { username, phoneNumber,email,password,organizationCode,address,description} = req.body;

    // 使用 Sequelize 模型创建用户
    const newUser=await User.create({
      username,
      phoneNumber,
      email,
      password,
      organizationCode,
      address,
      description
    });

    // 响应注册成功的信息
    res.json({ message: '注册成功' });
  } catch (error) {
    console.error(error);
    // 响应注册失败的信息
    res.status(500).json({ error: '注册失败' });
  }
}

// 登录用户的控制器
async function loginUser(req, res) {
    try {
      // 从请求体中获取用户登录信息
      const {username, password, organizationCode } = req.body;

      // 从请求头中获取用户类型
      const userType = req.headers['user-type'];

       // 根据用户类型（个人用户或机构用户）查询用户
      let user_;
  
      // 定义查询条件
      // const query = {
      //   where: {},
      // };

      // 根据用户类型设置查询条件
      if (userType === 'individual') {
        user_ = await User.findOne({
          where: {
            username,
          },
        });
      } else if (userType === 'organization') {
        user_ = await User.findOne({
          where: {
            organizationCode,
          },
        });
      }

  
      // 判断用户是否存在
      if (!user_) {
        res.status(404).send('用户不存在');
        return;
      }
  
      // 验证密码
      if (user_.password !== password) {
        res.status(401).json({ error: '密码错误' });
        return;
      }

      // 根据用户类型设置相应的 session 属性
      if (userType === 'individual') {
        req.session.userId = user_.id; // 个人用户ID
      } else if (userType === 'organization') {
        req.session.userId = user_.id; 
        req.session.organizationId = user_.id; // 组织用户ID
      }

      console.log('Session userId:', req.session.userId);
      console.log('Session organizationId:', req.session.organizationId);
  
      // 登录成功
      res.json({ message: '登录成功' });
      
    } catch (error) {
      console.error(error);
      // 响应登录失败的信息
      res.status(500).json({ error: '登录失败' });
    }
}

module.exports = { registerUser, loginUser };
