import React, {Component} from "react";
import {Switch, Route} from 'react-router-dom';
import {NavBar} from 'antd-mobile';
import {connect} from 'react-redux';
import NavLink from './../navlink/navlink';
import Boss from './../../component/boss/boss';
import Genius from './../../component/genius/genius';

function Msg() {
    console.log("asa");
    return <h3>消息列表</h3>
}

function User() {
    return <h3>个人中心</h3>
}

@connect(state => state)
class DashBorad extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {pathname} = this.props.location;
        const user = this.props.user;
        const navList = [
            {
                path: '/boss',
                text: '牛人',
                icon: 'boss',
                title: '牛人列表',
                component: Boss,
                hide: user.type === 'genius'
            }, {
                path: '/genius',
                text: 'BOSS',
                icon: 'job',
                title: 'BOSS列表',
                component: Genius,
                hide: user.type === 'boss'
            }, {
                path: '/msg',
                text: '消息',
                icon: 'msg',
                title: '消息列表',
                component: Msg
            }, {
                path: '/me',
                text: '我',
                icon: 'user',
                title: '个人中心',
                component: User
            }
        ];
        return (
            <div>
                <NavBar mode="dark" className="fixd-header">{navList.find(v => v.path === pathname).title}</NavBar>
                <div style={{marginTop: 45}}>
                    <Switch>
                        {navList.map(v => (
                            <Route key={v.path} path={v.path} component={v.component}/>
                        ))}
                    </Switch>
                </div>
                <NavLink navlist={navList}/>
            </div>
        )
    }
}

export default DashBorad;