var express = require('express');
var router = express.Router();

const  { registerUser } = require("../controllers/login/index")

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// 注册
router.post("/register", async (req, res) => {
  registerUser(req, res)
  // const userInfo = { username, password, nickname, role } = req.body
  // const result = await registerUser(userInfo)
  // res.send(result)
  // res.end()
})

// 登陆
router.get("/login", (req, res) => {
  res.send({
    status: 200,
    message: "服务返回的消息4444"
  })
  res.end()
})

module.exports = router;
