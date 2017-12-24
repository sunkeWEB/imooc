import React from 'react';
import {Grid,List} from 'antd-mobile';

class AvatarSelect extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            text:'',
            icon:''
        };
    }

    render() {
        const avatarList = 'boy,bull,chick,crab,girl,hedgehog,man,pig,tiger,whale,woman,zebra'.split(',').map(v => ({
            icon: require(`./../img/${v}.png`),
            text: v
        }));
        const avatarimg = {
            width:20,
            marginLeft:8,
            verticalAlign:'text-bottom'
        };
        const avatarHeader = this.state.icon ? (<div>
            <span style={{fontSize:16}}>已经选择的头像</span>
            <img style={avatarimg} src={this.state.icon} alt="头像"/>
        </div>) : (<div style={{fontSize:16}}>请选择你的头像</div>);
        return (
            <div>
                <List renderHeader={()=>avatarHeader}>
                    <Grid
                        data={avatarList}
                        activeStyle={false}
                        columnNum={4} hasLine={true}
                        onClick={ e => {
                            this.setState({
                                icon:e.icon
                            });
                            this.props.selectAvatar(e.text);
                        }}
                    />
                </List>
            </div>
        );
    }
}

export default AvatarSelect;