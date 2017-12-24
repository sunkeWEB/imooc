import React from 'react';
import {connect} from 'react-redux';
import {NavBar, InputItem, WhiteSpace, WingBlank, TextareaItem, Button} from 'antd-mobile';
import AvatarSelect from './../../component/avatarselect/avatar';
import {update} from './../../reducer/user.reducer';

@connect(state=>state.user,{
    update
})

class BossInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            company: '',
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
        return (
            <div>
                <NavBar mode="dark">BOSS信息完善</NavBar>
                <WingBlank>
                    <WhiteSpace/>
                    <AvatarSelect selectAvatar={(imagename) => {
                        this.setState({avatar: imagename})
                    }}/>
                    <WhiteSpace/>
                    <InputItem onChange={(v) => this.handleChange('title', v)}>
                        招聘职位
                    </InputItem>
                    <InputItem onChange={(v) => this.handleChange('company', v)}>
                        公司名称
                    </InputItem>
                    <InputItem onChange={(v) => this.handleChange('money', v)}>
                        职位薪资
                    </InputItem>
                    <TextareaItem onChange={(v) => this.handleChange('desc', v)} row={3} title="职位要求" autoHeight
                                  clear="true"/>
                    <WhiteSpace/>
                    <Button type="primary" onClick={() => this.props.update()}>保存</Button>
                </WingBlank>
            </div>
        )
    }
}

export default BossInfo;