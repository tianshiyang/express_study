const { connection } = require("../../config/db")
// 引入校验数据中间件
const Joi = require('joi')

// 定义校验规则
const schema = {
  // 必须是字符串类型，字母数字，最小6位，最长16位，必填
  username: Joi.string().alphanum().min(6).max(16).required().error(new Error("用户名不满足格式")),
  password: Joi.string().alphanum().min(6).max(16).required().error(new Error("密码不满足格式")),
  // 角色信息的值必须是1，2中的一个
  role: Joi.number().valid([1, 2]).required().error(new Error("角色信息错误"))
}

// 校验用户注册信息
const vaildateUserInfo = async (req, res) => {
  try {
    await Joi.valid(req.body, schema)
  } catch(e) {
    res.send({
      success: false,
      message: e
    })
    return
  }
}

// 连接mysql创建用户
const validateUserIsExist = (req, res) => {
  const { username, password, nickname, role } = req.body
  const searchUser = "SELECT * FROM users WHERE user_name = ?"
  const searchUserParams = {
    username
  }
  connection.query(searchUser, searchUserParams, (err, result) => {
    if (err) {
      return {
        success: false,
        message: err
      }
    }
    if (result.length !== 0) {
      res.send({
        success: false,
        message: `当前用户${ username }已存在`
      })
    }
  })
}

// 注册用户
const registerUser = (req, res) => {
  // 校验用户信息的结果
  vaildateUserInfo(req, res)
  // 校验用户是否存在
  validateUserIsExist(req, res)
}

module.exports = {
  registerUser
}