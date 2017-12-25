const navList = [
    {
        path: '/boss',
        text: '牛人',
        icon: 'boss',
        title: '牛人列表',
    },{
        path: '/genius',
        text: 'BOSS',
        icon: 'genius',
        title: 'BOSS列表',
    },{
        path: '/msg1',
        text: '消息',
        icon: 'msg',
        title: '消息列表',
    },{
        path: '/me',
        text: '我',
        icon: 'user',
        title: '个人中心',
    }
];

let x = navList.find(v => v.path === '/msg').title;
console.log(x);
