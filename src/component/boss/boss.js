import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUserLists} from './../../reducer/chatuser.redux';
import  UserCard from './../usercard/usercard';

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
        return <UserCard userlist={this.props.userlist} />
    }
}

export default Boss;