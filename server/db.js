const mongoose = require('mongoose');
const DB_URL = "mongodb://localhost:27017/imooc";
mongoose.connect(DB_URL);
mongoose.connection.on('connected',()=>{
    console.log("Mongodb start success");
});

const models = {
    user:{
        user:{
            type:String,
            require:true
        },
        pwd:{
            type:String,
            require:true
        },
        type:{
            type:String,
            require:true
        },
        avatar:{
            type:String
        },
        desc:{ // 个人简介 或者 职位介绍
            type:String
        },
        title:{ // 职位名
            type:String
        },
        //    如果是boss 还多了两个字段
        company:{
            type:String
        },
        money:{
            type:String
        }
    },
    chat:{

    }
};

for (let m in models) {
    mongoose.model(m,new mongoose.Schema(models[m]));
}

module.exports = {
    getModel:function (name) {
        return mongoose.model(name);
    }
};