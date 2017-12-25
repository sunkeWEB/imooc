import {combineReducers} from 'redux';
import {user} from './reducer/user.reducer';
import {chatuser} from './reducer/chatuser.redux';

export default combineReducers({user,chatuser})