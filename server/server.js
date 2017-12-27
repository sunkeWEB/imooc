const express = require('express');
const app = express();
const BodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');
app.use(BodyParser.json());
app.use(cookieParser());
app.use('/',express.static(path.resolve('build')));
app.use((req, res, next) => {
    if (req.url.startsWith('/user/') || req.url.startsWith('/static/')) {
      return  next();
    }
    console.log(path.resolve('build/index.html'));
    return res.sendFile(path.resolve('build/index.html'));
});
const model = require('./db');
const Chats = model.getModel('chat');
const user = require('./user');

io.on('connection',(socket)=>{
    socket.on('sendmsg',(data)=>{
        const {from, to, content} = data;
        const chatid = [from, to].sort().join('_');
        Chats.create({chatid, from, to, content}, (err, doc) => {
            console.log(doc);
            io.emit('recvmsg',Object.assign({},doc._doc));
        });
    });
});

app.use('/user',user);

app.get('/',(req, res)=>{
    res.json({
        code:0,
        msg:'ok',
        data:[]
    });
});

server.listen(9093,()=>{
    console.log("node server start success");
});