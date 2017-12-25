import React, {Component} from 'react';
import {Card, WingBlank, WhiteSpace} from 'antd-mobile';
import {connect} from 'react-redux';
import {getUserLists} from './../../reducer/chatuser.redux';

@connect(state => state.chatuser, {
    getUserLists
})
class Boss extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        this.props.getUserLists('genius');
    }

    render() {
        return (
            <div>
                <WingBlank>
                    <WhiteSpace/>
                    {this.props.userlist.map(v => (
                        v.avatar ? (
                            <Card key={v._id}>
                                <Card.Header
                                    title={v.user}
                                    thumb={require(`../img/${v.avatar}.png`)}
                                    extra={v.title}
                                />
                                <Card.Body>
                                    {v.desc.split('\n').map(v => (
                                        <span key={Math.random() + v}>{v}</span>
                                    ))}
                                </Card.Body>
                                <Card.Footer content={"期望薪资" + v.money}/>
                            </Card>
                        ) : null
                    ))}
                </WingBlank>
            </div>
        );
    }
}

export default Boss;