import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {Result, WingBlank, WhiteSpace, List, Button, Modal} from 'antd-mobile';
import browserCookies from 'browser-cookies';
import {logouSubmit} from './../../reducer/user.reducer';

@connect(state => state.user, {
    logouSubmit
})
class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    logout() {
        browserCookies.erase('userid');
        this.props.logouSubmit();
    }


    render() {
        const props = this.props;
        const Item = List.Item;
        const Brief = Item.Brief;
        const alert = Modal.alert;
        return this.props.user ? (
            <div>
                <WingBlank>
                    <WhiteSpace/>
                    <Result
                        img={<img src={require(`../img/${props.avatar}.png`)} style={{width: 50}} alt="" />}
                        title={props.title}
                        message={props.type === 'boss' ? props.company : null}
                    />
                    <WhiteSpace/>
                    <List renderHeader="个人介绍">
                        <Item multipleLine={true} >
                            {props.title}
                            {props.desc.split('\n').map(v => (
                                <Brief key={v + Math.random()}>{v}</Brief>
                            ))}
                        </Item>
                    </List>
                    <WhiteSpace/><WhiteSpace/>
                    <Button type="primary" onClick={() => alert('友情提示', '你确定退出登录吗???', [
                        {text: '取消', onPress: () => console.log('cancel')},
                        {text: '确定', onPress: () => this.logout()},
                    ])}
                    >退出登录</Button>
                </WingBlank>
            </div>
        ) : <Redirect to={props.redirecTo}/>
    }
}

export default User;