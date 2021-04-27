const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const playerRoutes = require('./routes/playerRoutes');

const app = express();

//connect to mongoDB
//为了确保读取数据库后用户可以访问网址，在读取到数据后app才监听端口开放
const DBURI = 'mongodb://localhost:27017/playerdata?serverSelectionTimeoutMS=5000&connectTimeoutMS=10000';
mongoose.connect(DBURI, { useNewUrlParser:true, useUnifiedTopology: true })
    .then((result) => { app.listen(3000);
        console.log('Server is running at http://127.0.0.1:3000') })
    .catch((err) => { console.log(err) });

// register views engineer
app.set('view engine', 'ejs');

//middleware
//路径加载后只会加载这个函数,后面get不能得到，所以需要增加next
// app.use((req, res, next) => {
//     console.log('new request made');
//     console.log('host:', req.hostname);
//     console.log('path:', req.path);
//     console.log('method:', req.method);
//     next();
// });

//middleware & static files
//中间件可以有效防止浏览器访问除views之外的其他文件
//如果需要使用在express中添加公开目录,并将文件放入，express将会将此目录添加
//调用则直接使用/style.css
app.use(express.static('public'));
//不进行编码
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

//route
app.get('/', (req,res) => {
    res.redirect('/players')
});

app.use('/players', playerRoutes);

app.get('/about', (req,res) => {
    //express auto setHeader
    res.render('about', { title: 'About' });
});

// redirects
app.get('/about-me', (req, res) => {
    res.redirect('/about');
})

// 404 not found pages below
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
})