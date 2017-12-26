import axios from 'axios';
import io from 'socket.io-client';

const sockit = io('ws://127.0.0.1:9093');
// 获取聊天列表
const MSG_LIST = 'MSG_LIST';
// 读信息
const MSG_RECV = 'MSG_RECV';
// 标识已读
const MSG_READ = 'MSG_READ';

const init = {
    chatmsg: [],
    users: {},
    unread: 0,
};

export function chat(state = init, action) {
    switch (action.type) {
        case MSG_LIST:
            return {
                ...state,
                chatmsg: action.payload.msg,
                unread: action.payload.msg.filter(v => !v.read && v.to === action.payload.userid).length,
                users: action.payload.users
            };
        case MSG_RECV:
            const n = action.payload.msg.to === action.payload.userid ? 1 : 0;
            return {...state, chatmsg: [...state.chatmsg, action.payload.msg], unread: state.unread + n};
        case MSG_READ:
            return {...state};
        default:
            return state;
    }
}

function msgList(msg, users, userid) {
    return {type: MSG_LIST, payload: {msg, users, userid}}
}

function msgRecv(msg, userid) {
    return {type: MSG_RECV, payload: {msg, userid}}
}

export function getMsgList() {
    return (dispatch, getState) => {
        axios.get('/user/getmsglist').then(res => {
            if (res.status === 200 && res.data.code === 0) {
                const userid = getState().user._id;
                dispatch(msgList(res.data.msgs, res.data.users, userid));
            }
        });
    }
}

export function sendMsg(data) {
    return dispatch => {
        sockit.emit('sendmsg', data);
    }
}

export function recvMsg() {
    return (dispatch, getState) => {
        sockit.on('recvmsg', (data) => {
            const userid = getState().user._id;
            dispatch(msgRecv(data, userid))
        });
    }
}