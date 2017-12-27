const express = require('express');
const router = express.Router();
const utility = require('utility');
const model = require('./db');
const Users = model.getModel('user');
const Chats = model.getModel('chat');

router.get('/list', (req, res) => {
    let {type} = req.query;
    if (!type) {
        res.json({
            code: 1,
            msg: ''
        });
    } else {
        Users.find({type}, (err, doc) => {
            res.json({
                code: 0,
                data: doc
            });
        });
    }
});

router.get('/info', (req, res) => {
    const {userid} = req.cookies;
    Users.findOne({_id: userid}, {__v: 0, pwd: 0}, (err, doc) => {
        if (err) {
            return res.json({
                code: 1,
                msg: '系统错误'
            });
        }
        if (doc) {
            console.log("1");
            return res.json({
                code: 0,
                msg: '获取用户数据成功',
                data: doc
            });
        } else {
            console.log("2");
            return res.json({
                code: 1,
                msg: '没找到用户相关数据'
            });
        }
    });
});

router.post('/login', (req, res) => {
    let {user, pwd} = req.body;
    Users.findOne({user, pwd: mdPwd(pwd)}, {pwd: 0, __v: 0}, (err, doc) => {
        if (err) {
            res.json({
                code: 1,
                msg: "系统错误"
            });
        }
        if (doc) {
            res.cookie('userid', doc._id);
            res.json({
                code: 0,
                msg: "登录成功",
                data: doc
            });
        } else {
            res.json({
                code: 1,
                msg: "用户名或密码错误"
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
        Users.create({user, type, pwd: mdPwd(pwd)}, (e, d) => {
            if (e) {
                return res.json({
                    code: 1,
                    msg: "系统错误"
                });
            }
            res.cookie('userid', d._id);
            const {user, type, _id} = d;
            return res.json({
                code: 0,
                msg: '注册成功',
                data: {user, type, _id}
            });
        });
    })
});

router.post('/update', (req, res) => {
    const {userid} = req.cookies;
    if (userid === '') {
        return res.json({code: 1, msg: "cookie过期或者不存在"});
    }
    const body = req.body;
    Users.findByIdAndUpdate(userid, body, (err, doc) => {
        const data = Object.assign({}, {
            user: doc.user,
            type: doc.type
        }, body);
        if (doc) {
            res.json({
                code: 0,
                msg: "数据修改成功",
                data: data
            });
        }
        else {
            res.json({
                code: 1,
                msg: "数据修改失败",
                data: {}
            });
        }
    });
});

router.get('/getmsglist', (req, res) => {

    const {userid} = req.cookies;


    Users.find({}, (err, userdoc) => {
        let users = {};
        userdoc.forEach(v => {
            users[v._id] = {name: v.user, avatar: v.avatar};
        });
        Chats.find({'$or': [{from: userid}, {to: userid}]}, (err, doc) => {
            if (!err) {
                return res.json({
                    code: 0,
                    msg: "获取聊天信息成功",
                    msgs: doc,
                    users: users
                });
            }
        });
    });
});

router.post('/readmsg', (req, res) => {
    const {userid} = req.cookies;
    const {from} = req.body;
    console
    Chats.update({from, to: userid}, {$set: {read: true}}, {multi: true}, (err, doc) => {
        if (err) {
            res.json({
                code: 1,
                msg: "系统错误"
            });
        } else {
            console.log(doc);
            res.json({
                code: 0,
                msg: "success",
                num: doc.nModified
            });
        }
    })
});

function mdPwd(value) {
    let solt = "(*)397633183@js(@)jquery.&(*)";
    let pwd = value + solt;
    return utility.md5(utility.md5(pwd));
}

module.exports = router;

