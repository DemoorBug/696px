var express = require('express'),
    // mongoose = require('mongoose'),
    path = require('path');

var port = process.env.PORT || 3000
var app = express();


// var dbUrl = 'mongodb://localhost/imooc'
// mongoose.connect(dbUrl)

app.set('views','./app/views/pages')
app.set('view engine','jade')    //设置默认的模板引擎
app.listen(port)

require('./config/routes')(app)
//引入路由

app.use(express.static(path.join(__dirname,'public')))
//应该就是静态资源获取了




console.log('imooc started on port' + port);
//要引入jade 模板。。我晕
