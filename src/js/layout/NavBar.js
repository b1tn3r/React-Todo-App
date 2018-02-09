import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ActionHome from 'material-ui/svg-icons/action/assignment';

class Login extends Component {
    static muiName = 'FlatButton';

    render() {
        const props = Object.assign({}, this.props);
        delete props.showLogin;

        return (
            <FlatButton {...props}
                        label="Login"
                        onClick={this.props.showLogin}
            />
        );
    }
}

class Logged extends Component {

    refresh() {
        this.props.refresh();
    }

    signOut(event) {
        this.props.firebaseApp.signOut();
    }

    render() {
        const props = Object.assign({}, this.props);
        delete props.firebaseApp;
        delete props.refresh;

        return (
            <IconMenu
                {...props}
                iconButtonElement={
                    <IconButton><MoreVertIcon/></IconButton>
                }
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
                <MenuItem primaryText="Refresh" onClick={this.refresh.bind(this)}/>
                <MenuItem primaryText="Sign Out" onClick={this.signOut.bind(this)}/>
            </IconMenu>
        )
    }
}

Logged.muiName = 'IconMenu';


const AppBarExampleComposition = (props) => {
    return (
        <div>
            <AppBar
                title="The To-Do App"
                iconElementLeft={
                    <IconButton tooltip="Todo List">
                        <ActionHome />
                    </IconButton>}
                iconElementRight={
                    props.loggedIn ?
                        <Logged firebaseApp={props.firebaseApp}
                                refresh={props.refresh}
                        />
                        : <Login showLogin={props.showLogin} />
                }
            />
        </div>
    );
};

export default AppBarExampleComposition;