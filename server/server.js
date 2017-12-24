const express = require('express');
const app = express();
const BodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
app.use(BodyParser.json());
app.use(cookieParser());
const user = require('./user');
app.use('/user',user);


app.get('/',(req, res)=>{
    res.json({
        code:0,
        msg:'ok',
        data:[]
    });
});
app.get('/data', (req, res) => {
    res.json({
        code: 0,
        msg: "数据获取成功",
        data: {
            user: "孙科",
            age: 24
        }
    });
});

app.listen(9093,()=>{
    console.log("node server start success");
});