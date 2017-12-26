import React, {Component} from 'react';
import {List, InputItem, NavBar, Grid} from 'antd-mobile';
import {connect} from 'react-redux';
import {sendMsg, getMsgList, recvMsg} from './../../reducer/chat.redux';
import {getChatId} from './../../utli';

const Item = List.Item;

@connect(state => state, {
    sendMsg, getMsgList, recvMsg
})
class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            msg: [],
            showEmoji: false
        };
    }

    handleClick() {
        this.props.history.go(-1);
    }

    showem() {
        this.setState({
            showEmoji: !this.state.showEmoji
        });
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
        }, 0)
    }

    hadleSubmit() {
        const from = this.props.user._id;
        const to = this.props.match.params.user;
        const content = this.state.text;
        this.props.sendMsg({from, to, content});
        this.setState({
            text: ''
        });
    }

    componentDidMount() {
        if (this.props.chat.chatmsg.length < 1) {
            this.props.getMsgList();
            this.props.recvMsg();
        }
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
        }, 0)
    }

    render() {
        const userid = this.props.match.params.user;
        const users = this.props.chat.users;
        const chatid = getChatId(userid, this.props.user._id);
        const chatmsg = this.props.chat.chatmsg.filter(v => v.chatid === chatid);
        const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
            .split(' ')
            .filter(v => v)
            .map(v => ({text: v}));
        if (!users[userid]) {
            return null;
        }
        return (
            <div id="chat-page">
                <NavBar onLeftClick={() => this.handleClick()} mode="dark" leftContent="返回"
                        className="navbarList">{users[userid].name}</NavBar>
                <div className="msgListItem">
                    {chatmsg.map(v => {
                        const avatar = require(`./../img/${users[v.from].avatar}.png`);
                        return v.from === userid ? (
                            <Item key={Math.random() + v._id} thumb={avatar}>{v.content}</Item>
                        ) : (
                            <Item key={Math.random() + v._id} className='chat-me'
                                  extra={<img src={avatar}/>}>{v.content}</Item>
                        )
                    })}
                </div>
                <div className="stick-footer">
                    <List>
                        <InputItem
                            placeholder="请输入"
                            value={this.state.text}
                            onChange={v => this.setState({text: v})}
                            extra={
                                <div>
                                    <span
                                        style={{marginRight: 10}}
                                        onClick={() => this.showem()}
                                    >😀</span>
                                    <span onClick={() => this.hadleSubmit()}>发送</span>
                                </div>
                            }
                        />
                    </List>
                    {this.state.showEmoji ? <Grid
                        data={emoji}
                        columnNum={7}
                        isCarousel={true}
                        carouselMaxRow={4}
                        onClick={(v)=>this.setState({text:this.state.text+v.text})}
                    /> : null}
                </div>
            </div>
        )
    }
}

export default Chat;