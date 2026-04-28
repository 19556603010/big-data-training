const userModel = require('../models/userModel');

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ code: 400, message: '用户名和密码不能为空' });
    }

    const user = await userModel.login(username, password);
    
    if (!user) {
      return res.status(401).json({ code: 401, message: '用户名或密码错误' });
    }

    res.json({
      code: 200,
      message: '登录成功',
      data: {
        id: user.id,
        username: user.username,
        role: user.role,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar
      }
    });
  } catch (error) {
    res.status(500).json({ code: 500, message: '登录失败', error: error.message });
  }
};

const getUserInfo = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userModel.getUserById(userId);
    
    if (!user) {
      return res.status(404).json({ code: 404, message: '用户不存在' });
    }

    res.json({ code: 200, data: user });
  } catch (error) {
    res.status(500).json({ code: 500, message: '获取用户信息失败', error: error.message });
  }
};

const updateUserInfo = async (req, res) => {
  try {
    const userId = req.params.id;
    const result = await userModel.updateUser(userId, req.body);
    
    if (result) {
      res.json({ code: 200, message: '更新成功' });
    } else {
      res.status(404).json({ code: 404, message: '用户不存在' });
    }
  } catch (error) {
    res.status(500).json({ code: 500, message: '更新用户信息失败', error: error.message });
  }
};

module.exports = { login, getUserInfo, updateUserInfo };
