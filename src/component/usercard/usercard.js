import React from 'react';
import {Card, WingBlank, WhiteSpace} from 'antd-mobile';
import PropTypes from 'prop-types';
import {withRouter} from "react-router-dom";

@withRouter
class UserCard extends React.Component {
    static propTypes = {
        userlist: PropTypes.array
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    handelClick(v) {
        this.props.history.push(`/chat/${v._id}`);
    }

    render() {
        return (
            <div>
                <WingBlank>
                    <WhiteSpace/>
                    {this.props.userlist.map(v => (
                        v.avatar ? (
                            <Card key={v._id} onClick={() => this.handelClick(v)}>
                                <Card.Header
                                    title={v.user}
                                    thumb={require(`../img/${v.avatar}.png`)}
                                    extra={v.title}
                                />
                                <Card.Body>
                                    {v.desc.split('\n').map(v => (
                                        <p key={Math.random() + v}>{v}</p>
                                    ))}
                                </Card.Body>
                                {v.type==='boss' ?
                                    <Card.Footer content={"职位薪资" + v.money} extra={"公司名称 "+v.company}/> :
                                    <Card.Footer content={"期望薪资" + v.money}/>
                                }
                            </Card>
                        ) : null
                    ))}
                </WingBlank>
            </div>
        )
    }
}

export default UserCard;