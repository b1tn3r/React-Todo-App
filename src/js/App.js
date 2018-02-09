import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
var FirebaseAPI = require('./FirebaseAPI');

import NavBar from './layout/NavBar';
import Login from "./layout/Login";
import Main from './layout/Main';
import Footer from "./layout/Footer";


export default class App extends React.Component {

    constructor() {
        super();
        this.state = {
            loading: false,
            firebaseApp: new FirebaseAPI(),
            loggedIn: false,
            loginScreen: true,
        };

        this.state.firebaseApp.onAuthChange(this.userLogin.bind(this));
    }

    userLogin(user) {
        console.log(user);

        if(user) {
            this.setState({
                loggedIn: true,
                loginScreen: false
            });
        } else {
            this.setState({
                loggedIn: false,
                loginScreen: true
            });
        }
    }

    showLogin() {
        this.setState({loginScreen: true});
    }
    closeLogin() {
        this.setState({loginScreen: false});
    }

    refresh() {
        this.setState({loading: true, loggedIn: false});

        setTimeout(() => {
            this.setState({loading: false, loggedIn: true});
        }, 700);

        console.log('Page Refreshed');
    }

    render() {

        return (
            <div>
                <NavBar {...this.state} showLogin={this.showLogin.bind(this)} refresh={this.refresh.bind(this)}/>

                { this.state.loading ?
                    <div class="loader">
                        <CircularProgress size={100} thickness={8} />
                    </div>
                    : null
                }

                { !this.state.loggedIn && this.state.loginScreen ?
                    <Login firebaseApp={this.state.firebaseApp}
                           loginScreen={this.state.loginScreen}
                           closeLogin={this.closeLogin.bind(this)}
                    />
                    : null
                }


                { this.state.loggedIn ?
                    <Main {...this.state} />
                    : null
                }

                <Footer/>
            </div>
        );
    }
}
