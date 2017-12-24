const express = require('express');
const router = express.Router();
const utility = require('utility');
const model = require('./db');
const Users = model.getModel('user');

router.get('/list', (req, res) => {
    Users.find({}, (err, doc) => {
        res.json({
            code: 0,
            msg: doc
        });
    });
});

router.get('/info', (req, res) => {
    const {userid} = req.cookies;
    Users.findOne({_id:userid},{__v:0,pwd:0},(err,doc)=>{
        if (err) {
            return res.json({
                code:1,
                msg:'系统错误'
            });
        }
        if (doc) {
            return res.json({
                code:0,
                msg:'获取用户数据成功',
                data:doc
            });
        }else{
            return res.json({
                code:1,
                msg:'没找到用户相关数据'
            });
        }
    });
});

router.post('/login',(req,res)=>{
    let {user, pwd} = req.body;
    Users.findOne({user,pwd:mdPwd(pwd)},{pwd:0,__v:0},(err,doc)=>{
        if (err) {
            res.json({
                code:1,
                msg:"系统错误"
            });
        }
        if (doc) {
            res.cookie('userid',doc._id);
            res.json({
                code:0,
                msg:"登录成功",
                data:doc
            });
        }else{
            res.json({
                code:1,
                msg:"用户名或密码错误"
            });
        }
    })
});

router.post('/register', (req, res) => {
    let {user, pwd, type} = req.body;
    Users.findOne({user: user}, (err, doc) => {
        if (doc) {
            return res.json({
                code: 1,
                msg: "用户名重复"
            });
        }
        Users.create({user,type,pwd:mdPwd(pwd)},(e,d)=>{
            if (e) {
                return res.json({
                    code:1,
                    msg:"系统错误"
                });
            }
            res.cookie('userid',d._id);
            const {user,type,_id} = d;
            return res.json({
                code:0,
                msg:'注册成功',
                data:{user,type,_id}
            });
        });
    })
});

function mdPwd(value) {
    let solt = "(*)397633183@js(@)jquery.&(*)";
    let pwd = value + solt;
    return utility.md5(utility.md5(pwd));
}

module.exports = router;