const express = require('express');
const opn = require('opn');
const cors = require('cors');
const UserModel = require('./db/model/user.js');

// 路由库
const routers = require('./routers/index.js');

//express 3.x 版本中自带，4.x 版本需要安装引入
const bodyParser = require('body-parser');

//hash算法加密
const crypto = require('crypto');

//url解析包
const qs = require('qs');

//mongoose 连接数据库
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');

//密码
const pass = require('pwd');

//数据库连接状态
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));

db.once('open', function () {
  console.log('数据连接成功 ...');
})

let port = process.env.PORT || 3705;

let uri = 'http://localhost:' + port;


if('development' === process.env.NODE_ENV){
    // opn(uri);
}

let resStatus = {
  success: {
    statusCode: 20000,
    message: 'success',
  },
  notFound: {
    statusCode: 10004,
    message: 'not found'
  }
}

const app = express();

// const server = require('http').createServer(app);
// 解析post传过来的值，客户端请求头必须为Content-Type:application/json
app.use(bodyParser.json({limit: '1mb'}));  //body-parser 解析json格式数据
//此项必须在 bodyParser.json 下面,为参数编码
app.use(bodyParser.urlencoded({
  extended: true
}));
//静态文件的路径
app.use(express.static('./views/'));

app.use(cors());

// 使用该路由库
routers(app);

app.listen(port);
