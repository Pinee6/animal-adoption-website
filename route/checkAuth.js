function checkAuth(req, res, next) {
    // 检查用户是否已经登录
    if (req.session && req.session.userId) {
      next(); // 进入路由
    } else {
      res.redirect('/auth/login'); // 重定向到登录
    }
}

function checkOrganizationAuth(req, res, next) {
  console.log("开始检查是否是机构用户")
    // 检查用户是否是组织用户
    if (req.session && req.session.userId&&req.session.organizationId) {
      console.log("检验组织用户通过")
      next(); // 进入路由
    } else {
      res.redirect('/auth/login'); // 重定向到登录
    }
}

module.exports={checkAuth,checkOrganizationAuth}