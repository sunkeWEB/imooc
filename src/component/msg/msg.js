import React from 'react';
import {connect} from 'react-redux';
import {List,Badge} from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;

@connect(state => state, {})
class Msg extends React.Component {
    getArrLast(arr) {
        return arr[arr.length - 1];
    }

    render() {
        if (!this.props.chat.chatmsg.length) {
            return null;
        }
        const msgGroup = {};
        this.props.chat.chatmsg.forEach(v => {
            msgGroup[v.chatid] = msgGroup[v.chatid] || [];
            msgGroup[v.chatid].push(v);
        });
        const chatList = Object.values(msgGroup).sort((a,b)=>{
            const last_a = this.getArrLast(a).time;
            const last_b = this.getArrLast(b).time;
            console.log(last_b,last_a);
            return last_b - last_a;
        });
        const userid = this.props.user._id;// 当前登录的id
        const userarr = this.props.chat.users;  // 保存所有用户的头像  姓名

        return (
            <div>
                <List>
                    {chatList.map(v => {
                        const lastItem = this.getArrLast(v);
                        const targetid = lastItem.from === userid ? lastItem.to : lastItem.from;
                        const unreadnum = v.filter(v=>!v.read && v.to === userid).length;
                        return (
                            <Item
                                arrow="horizontal"
                                extra={<Badge text={unreadnum} />}
                                key={lastItem._id}
                                thumb={require(`./../img/${userarr[targetid].avatar}.png`)}
                                onClick={()=>this.props.history.push(`/chat/${targetid}`)}
                            >
                                {lastItem.content}
                                <Brief>{userarr[targetid].name}</Brief>
                            </Item>
                        )
                    })}
                </List>
            </div>
        )
    }
}

export default Msg;