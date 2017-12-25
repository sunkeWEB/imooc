import React, {Component} from "react";
import PropTypes from 'prop-types';
import {TabBar} from 'antd-mobile';
import {withRouter} from 'react-router-dom';

@withRouter
class NavLink extends Component {
    constructor(props) {
        super(props);
    }
    static propTypes = {
        navlist: PropTypes.array
    };

    render() {
        const TabBarItem = TabBar.Item;
        const {pathname} = this.props.location;
        const navlist = this.props.navlist.filter(v => !v.hide);
        return (
            <div className="navtar-div">
                <TabBar>
                    {navlist.map(v => (
                        <TabBarItem
                            key={v.text}
                            title={v.text}
                            icon={{uri: require(`./image/${v.icon}.png`)}}
                            selectedIcon={{uri: require(`./image/${v.icon}-active.png`)}}
                            selected={v.path===pathname}
                            onPress={()=>{
                                this.props.history.push(v.path);
                            }}
                        />
                    ))}
                </TabBar>
            </div>
        )
    }
}

export default NavLink;