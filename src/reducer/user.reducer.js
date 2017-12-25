import axios from 'axios';
import {getRedirectPath} from './../utli';

const AUTH_SUCCESS = 'AUTH_SUCCESS';
const ERR_MSG = 'ERR_MSG';
const USER_DATA = 'USER_DATA';
const LOGOUT = 'LOGOUT';
const init = {
    msg: '',
    type: '',
    redirecTo: '' // 登录成功或者注册成功跳转地址  有多种可能
};

export function user(state = init, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {...state, msg: '', redirecTo: getRedirectPath(action.payload), ...action.payload};
        case USER_DATA:
            return {...state, ...action.payload};
        case ERR_MSG:
            return {...state, isAuth: false, msg: action.msg};
        case LOGOUT:
            return {...init, redirecTo: '/login'};
        default:
            return state;
    }
}

function errorMsg(msg) {
    return {msg, type: ERR_MSG};
}

function authSuccess(data) {  // 注册成功
    return {type: AUTH_SUCCESS, payload: data}
}

export function register({user, pwd, type, repeatpwd}) {
    if (!user || !pwd) {
        return errorMsg("用户名密码必须输入");
    }
    if (pwd !== repeatpwd) {
        return errorMsg("密码和确认密码不相等");
    }
    return dispatch => {
        axios.post('/user/register', {user, pwd, type}).then((res) => {
            if (res.status === 200 && res.data.code === 0) {
                dispatch(authSuccess(res.data.data));
            } else {
                dispatch(errorMsg(res.data.msg));
            }
        })
    }
}

export function login({user, pwd}) {
    if (!user || !pwd) {
        return errorMsg("用户名或密码不能为空");
    }
    return dispatch => {
        axios.post('/user/login', {
            user,
            pwd
        }).then((res) => {
            if (res.status === 200 && res.data.code === 0) {
                dispatch(authSuccess(res.data.data));
            } else {
                dispatch(errorMsg(res.data.msg));
            }
        });
    }
}

export function loadDate(userinfo) {
    return {type: USER_DATA, payload: userinfo}
}

export function update(data) {
    return dispatch => {
        axios.post('/user/update', data).then(res => {
            if (res.status === 200 && res.data.code === 0) {
                dispatch(authSuccess(res.data.data));
            } else {
                return errorMsg("");
            }
        })
    }
}

export function logouSubmit() {
    return {type: LOGOUT}
}