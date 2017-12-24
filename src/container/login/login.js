import React, {Component} from 'react';
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import Logo from './../../component/logo/logo';
import {login} from './../../reducer/user.reducer';

@connect(state => state.user, {
    login
})
class Login extends Component {
    constructor(props) {
        super(props);
        this.register = this.register.bind(this);
        this.logins = this.logins.bind(this);
        this.state = {
            user: '',
            pwd: ''
        };
    }

    register() {
        this.props.history.push('/register');
    }

    logins() {
        this.props.login({...this.state});
    }

    handleChange(key, value) {
        this.setState({
            [key]: value
        });
    }

    render() {
        return (
            <div>
                {this.props.redirecTo ? <Redirect to={this.props.redirecTo}/> : null}
                <Logo/>
                <WingBlank>
                    <List>
                        <InputItem onChange={(v) => this.handleChange('user', v)}>
                            用户名
                        </InputItem>
                        <WhiteSpace/>
                        <InputItem type="password" onChange={v => this.handleChange('pwd', v)}>
                            密 码
                        </InputItem>
                    </List>
                    <Button type="primary" onClick={this.logins}>登录</Button>
                    <WhiteSpace/>
                    <Button type="primary" onClick={this.register}>注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Login;