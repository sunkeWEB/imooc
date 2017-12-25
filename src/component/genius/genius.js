import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUserLists} from './../../reducer/chatuser.redux';
import UserCard from './../usercard/usercard';

@connect(state => state.chatuser, {
    getUserLists
})
class Genius extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        this.props.getUserLists('boss');
    }

    render() {
        return <UserCard userlist={this.props.userlist} />
    }
}

export default Genius;