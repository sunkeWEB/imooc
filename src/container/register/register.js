import React, {Component} from 'react';
import {List, InputItem, WingBlank, WhiteSpace, Button, Radio} from 'antd-mobile';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {register} from './../../reducer/user.reducer';
import Logo from './../../component/logo/logo';

@connect(state => state.user, {
    register
})
class Register extends Component {
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.state = {
            user: '',
            pwd: '',
            repeatpwd: '',
            type: 'genius'
        };

    }

    handleChange(key, value) {
        this.setState({
            [key]: value
        });
    }

    handleRegister() {
        this.props.register(this.state);
    }

    render() {
        const RadioItem = Radio.RadioItem;
        return (
        <div>
            { this.props.redirecTo ? <Redirect to={this.props.redirecTo} /> : null}
            <Logo/>
            <WingBlank>
                <p className="err-msg">{this.props.msg ? this.props.msg : null}</p>
                <List>
                    <InputItem onChange={v => this.handleChange('user', v)}>用户名</InputItem>
                    <InputItem onChange={v => this.handleChange('pwd', v)}>密码</InputItem>
                    <InputItem onChange={v => this.handleChange('repeatpwd', v)}>确认密码</InputItem>
                    <RadioItem
                        onChange={v => this.handleChange('type', 'genius')}
                        checked={this.state.type === 'genius'}
                    >牛人</RadioItem>
                    <RadioItem
                        checked={this.state.type === "boss"}
                        onChange={v => this.handleChange('type', 'boss')}
                    >BOSS</RadioItem>
                    <WhiteSpace/>
                    <Button type="primary" onClick={this.handleRegister}>注册</Button>
                </List>
            </WingBlank>
        </div>
    )
    }
}

export default Register;