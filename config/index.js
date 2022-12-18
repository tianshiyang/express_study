const { env } = process
// 使用env2这个插件，导入env.dev的配置文件
require('env2')('./.env.dev')

module.exports = {
  PORT: env.PORT,
  HOST: env.HOST,
};