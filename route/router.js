const express = require('express');
const path = require('path');
const router=express.Router();
const Animal = require('../models/animal');
const User = require('../models/user');
const { Op } = require('sequelize');
router.use(express.json());

// 导入auth路由
const authRoute = require('./authRoute');
const publishRoute = require('./publishRoute');
const {checkAuth,checkOrganizationAuth} = require('./checkAuth');
// 使用auth路由，将login和register挂载在auth下
router.use('/auth',authRoute);
router.use(publishRoute);

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/adoption', async (req, res) => {
    try {
      console.log('Attempting to retrieve Animal data...');
      // 从数据库中获取所有 Animal 数据
      const animals = await Animal.findAll();
  

      res.render('adoption', {animals });
      // res.json({ animals });
    } catch (error) {
      console.error('获取 Animal 数据时出错:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});
  

router.get('/organization', async (req, res) => {
  try {
    console.log("开始查询组织")
    // 查询具有 organizationCode 字段的所有用户
    const usersWithOrganizationCode = await User.findAll({
      where: {
        organizationCode: {
          [Op.not]: null, // 确保 organizationCode 字段不为 null
        },
      },
    });

    // 渲染ejs模板并传递数据
    res.render('organization', { users: usersWithOrganizationCode });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/contact', (req, res) => {
    res.render('contact');
});

router.get('/profile', checkAuth, async (req, res) => {
    try {
      // 获取登录用户的ID
      const userId = req.session.userId;
  
      // 根据用户ID从数据库中获取用户数据
        const user = await User.findByPk(userId);

        // 获取当前用户发布的动物数据
        const animals = await Animal.findAll({
        where: { publisher: userId },
        });
  
      // 渲染ejs模板并传递数据
      res.render('profile', { user, animals });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
});


// 处理 POST 请求，更新用户信息
router.post('/profile', checkAuth, async (req, res) => {
  try {
      const userId = req.session.userId;

      // 获取用户提交的编辑信息
      const { editDescription, editPhoneNumber, editAddress, editEmail, editUsername } = req.body;

      // 根据用户ID从数据库中获取用户数据
      const user = await User.findByPk(userId);

      // 更新用户信息
      user.description = editDescription;
      user.phoneNumber = editPhoneNumber;
      user.address = editAddress;
      user.email = editEmail;
      user.username = editUsername;

      // 保存更新后的用户信息到数据库
      await user.save();

      // 获取当前用户发布的动物数据
      const animals = await Animal.findAll({
          where: { publisher: userId },
      });

      // 渲染ejs模板并传递数据
      res.render('profile', { user, animals });
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
});

router.get('/animalProfile', async (req, res) => {
  try {
    // 获取动物的ID参数
    const animalId = req.query.id;
    console.log('animalID:',animalId);

    if (!animalId) {
      // 如果没有提供animalId参数，返回错误状态
      return res.status(400).json({ error: 'Animal ID is required' });
    }

    console.log(`Attempting to retrieve Animal data for ID: ${animalId}`);

    // 从数据库中获取指定ID的动物数据
    const animal = await Animal.findByPk(animalId);

    if (!animal) {
      // 如果找不到对应ID的动物，返回错误状态
      return res.status(404).json({ error: 'Animal not found' });
    }

    // 查询对应的用户数据
    const user = await User.findByPk(animal.publisher);

    if (!user) {
      // 如果找不到对应 ID 的用户，返回错误状态
      return res.status(404).json({ error: 'User not found' });
    }


    res.render('animalProfile', { animal,user });

    // 将动物数据以 JSON 格式发送给前端
    // res.json({ animal });
  } catch (error) {
    console.error('获取 Animal 数据时出错:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



router.get('/organizationProfile', async (req, res) => {
  try {
    // 获取动物的ID参数
    const userId = req.query.id;
    console.log('userID:',userId);

    if (!userId) {
      // 如果没有提供Id参数，返回错误状态
      return res.status(400).json({ error: 'User ID is required' });
    }

    console.log(`Attempting to retrieve Animal data for ID: ${userId}`);

    // 从数据库中获取指定ID的动物数据
    const user = await User.findByPk(userId);

    if (!user) {
      // 如果找不到对应ID的动物，返回错误状态
      return res.status(404).json({ error: 'user not found' });
    }

    res.render('organizationProfile', { user });

  } catch (error) {
    console.error('获取 Organization 数据时出错:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




module.exports=router;