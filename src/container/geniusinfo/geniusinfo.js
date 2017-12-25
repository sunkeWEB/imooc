import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {NavBar, InputItem, WhiteSpace, WingBlank, TextareaItem, Button} from 'antd-mobile';
import AvatarSelect from './../../component/avatarselect/avatar';
import {update} from './../../reducer/user.reducer';

@connect(state => state.user, {
    update
})

class GeniusInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            money: '',
            desc: '',
            avatar: ''
        };
    }

    handleChange(key, value) {
        this.setState({
            [key]: value
        });
    }

    render() {
        const pathname = this.props.location.pathname;
        const redirecTo = this.props.redirecTo;
        return (
            <div>
                { redirecTo && redirecTo!==pathname ? <Redirect to={redirecTo} />:null}
                <NavBar mode="dark">牛人信息完善</NavBar>
                <WingBlank>
                    <WhiteSpace/>
                    <AvatarSelect selectAvatar={(imagename) => {
                        this.setState({avatar: imagename})
                    }}/>
                    <WhiteSpace/>
                    <InputItem onChange={(v) => this.handleChange('title', v)}>
                        求职岗位
                    </InputItem>
                    <InputItem onChange={(v) => this.handleChange('money', v)}>
                        期望薪资
                    </InputItem>
                    <TextareaItem onChange={(v) => this.handleChange('desc', v)} row={3} title="个人简介" autoHeight
                                  clear="true"/>
                    <WhiteSpace/>
                    <Button type="primary" onClick={() => this.props.update(this.state)}>保存</Button>
                </WingBlank>
            </div>
        )
    }
}

export default GeniusInfo;