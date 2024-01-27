const Animal = require('../models/animal');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/animal'); // 存储图片的目录
    },
    
    filename: function (req, file, cb) {
        const uploadTimestamp = Date.now(); // 获取当前时间戳
        const fileExtension = file.originalname.split('.').pop(); // 获取文件后缀

        console.log(file)

        // 检查用户类型
        const userType = req.headers['user-type'];
        let userId;

        console.log("当前的用户类型:",userType)

        userId = req.session.userId;

        // if (userType === 'individual') {
        //     userId = req.session.userId;
        // } else if (userType === 'organization') {
        //     userId = req.session.organizationId;
        // }

        console.log(userId)

        const fileName = `${userId}_${uploadTimestamp}.${fileExtension}`; // 拼接文件名
        req.uploadTimestamp = uploadTimestamp; // 将时间戳存储在请求对象中
        cb(null, fileName);
    }
});

const upload = multer({ storage: storage });

async function createIndividualAnimal(req, res) {
    try {
        // 使用 multer 中间件处理上传的文件
        upload.single('image')(req, res, async (err) => {
            if (err) {
                console.error('Error uploading file:', err);
                res.status(500).json({ error: 'Error uploading file' });
            } else {
                const { name, age, species, gender, description } = req.body;
                console.log(req.body);
                console.log(name, age, species, gender, description);

                // 获取当前登录用户的 ID
                const publisher = req.session.userId;

                // 从 req.file 获取图片路径
                // const uploadTimestamp = Date.now(); // 获取当前时间戳
                const fileExtension = req.file.originalname.split('.').pop(); // 获取文件后缀
                const imageName = `${publisher}_${req.uploadTimestamp}.${fileExtension}`; // 拼接图片名

                // 将信息保存到数据库
                const animal = await Animal.create({
                    name,
                    age,
                    species,
                    gender,
                    description,
                    publisher,
                    imageName: imageName,
                });

                // 发送成功响应
                res.status(201).json({ 'message': '发布成功！' });
            }
        });
    } catch (error) {
        // 发送错误响应
        console.error('Error creating animal:', error);
        res.status(500).json({ error: 'Error creating animal' });
    }
}



async function createOrganizationAnimal(req, res) {
    console.log('进入创建动物数据');
    // console.log(req.files);

    try {
        // 使用 multer 中间件处理上传的文件
        upload.single('image')(req, res, async (err) => {
            if (err) {
                console.error('Error uploading file:', err);
                res.status(500).json({ error: 'Error uploading file' });
            } else {
                const { name, age, species, gender, description } = req.body;
                console.log(req.body);
                console.log(name, age, species, gender, description);

                // 获取当前登录用户的 ID
                const publisher = req.session.organizationId;
                console.log("当前用户id：",publisher);

                // 从 req.file 获取图片路径
                const fileExtension = req.file.originalname.split('.').pop(); // 获取文件后缀
                const imageName = `${publisher}_${req.uploadTimestamp}.${fileExtension}`; // 拼接图片名

                // 将信息保存到数据库
                const animal = await Animal.create({
                    name,
                    age,
                    species,
                    gender,
                    description,
                    publisher,
                    imageName: imageName,
                });

                // 发送成功响应
                res.status(201).json({ 'message': '发布成功！' });
            }
        });
    }catch (error) {
        // 发送错误响应
        console.error('Error creating animals:', error);
        res.status(500).json({ error: 'Error creating animals' });
    }
}    
    


module.exports = { createIndividualAnimal, createOrganizationAnimal };
