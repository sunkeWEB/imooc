import {combineReducers} from 'redux';
import {user} from './reducer/user.reducer';
import {chatuser} from './reducer/chatuser.redux';
import {chat} from './reducer/chat.redux';

export default combineReducers({user, chatuser,chat})