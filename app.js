var express = require('express'),
    mongoose = require('mongoose'),
    path = require('path');

var port = process.env.PORT || 3000
var app = express();

var dbUrl = 'mongodb://localhost/696px'
mongoose.connect(dbUrl)

var session = require('express-session')  //回话
var cookieParser = require('cookie-parser') // 依赖一个中间件
var mongStore = require('connect-mongo')(session); //

app.use(cookieParser())
app.use(session({
  secret: 'imove',
  resave:false,
  saveUninitialized: false,
  store: new mongStore({
    url: dbUrl,
    collection: 'sessions'
  })
}))
// collection: 'sessions'  存储到mongodb里面的名称

var bodyParser = require('body-parser');  // 必须引入此插件 才能读取到post数据

app.set('views','./app/views/pages')
app.set('view engine','jade')    //设置默认的模板引擎
app.locals.moment = require('moment')    // 时间
app.use(bodyParser.urlencoded({ extended: true })) //表单数据格式化
app.listen(port)

require('./config/routes')(app)
//引入路由

app.use(express.static(path.join(__dirname,'public')))
//应该就是静态资源获取了




console.log('imooc started on port' + port);
//要引入jade 模板。。我晕
