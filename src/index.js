import React from 'react';
import ReactDom from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux'; //applyMiddleware 处理中间件
import {BrowserRouter, Route, Link, Redirect, Switch} from 'react-router-dom';
import thunk from 'redux-thunk';
import reducer from './reducer';
import {Provider} from 'react-redux';
import './config';
import 'antd-mobile/dist/antd-mobile.css';
import Login from './container/login/login';
import Register from './container/register/register';
import AuthRoute from './component/auth/auth';
import './index.css';
import BossInfo from "./container/bossinfo/bossinfo";
import GeniusInfo from "./container/geniusinfo/geniusinfo";
import DashBorad from "./component/dashborad/dashborad";


const store = createStore(reducer, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

ReactDom.render((
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <AuthRoute/>
                <Switch>
                    <Route path="/bossinfo" component={BossInfo}/>
                    <Route path="/geniusinfo" component={GeniusInfo}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/register" component={Register}/>
                    <Route  component={DashBorad} />
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>
), document.getElementById('root'));