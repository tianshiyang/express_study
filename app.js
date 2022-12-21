const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin','*');//*表示可以跨域任何域名都行（包括直接存在本地的html文件）出于安全考虑最好只设置 你信任的来源也可以填域名表示只接受某个域名
  res.header('Access-Control-Allow-Headers','X-Requested-With,Content-Type');//可以支持的消息首部列表
  res.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS');//可以支持的提交方式
  res.header('Content-Type','application/json;charset=utf-8');//响应头中定义的类型
  next()
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
