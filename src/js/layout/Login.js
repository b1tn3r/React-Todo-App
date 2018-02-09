import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import Checkbox from 'material-ui/Checkbox';


const styles = {
    dialogStyle: {
        width: '350px',
    },
    dialogContainer: {
        paddingLeft: '22px',
        paddingRight: '22px',
    },
    toggle: {
        marginTop: '15px'
    },
    checkbox: {
        marginTop: '15px'
    }
};

export default class extends React.Component {
    constructor() {
        super();
        this.state = {
            // Controlled Inputs
            username: '',
            password: '',
            createToggled: false,
            agreeChecked: false,

            // Toggled Text
            dialogTitle: 'Sign-In',
            dialogLabel: 'Sign in to To-Do app with username & password.',
            btnLabel: 'Sign In',

            // Btn/Loader Usage
            signInBtnStyle: {
                display: 'inline'
            },
            btnLoaderStyle: {
                display: 'none'
            },

            // Validation Error Text
            usernameError: "",
            passwordError: "",
            checkError: ""
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const target = event.target;

        let value;
        if(target.type === 'checkbox') {
            value = target.checked;
        } else {
            value = target.value;
        }

        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    onToggle(event) {
        let toggleValue = event.target.checked;

        if(toggleValue) {
            this.setState({
                dialogTitle: "Create New Account",
                dialogLabel: "Create new account with a username & password.",
                btnLabel: "Create Account",

                usernameError: '',
                passwordError: ''
            });
        } else {
            this.setState({
                dialogTitle: "Sign-In",
                dialogLabel: "Sign in to To-Do app with username & password.",
                btnLabel: 'Sign In',

                usernameError: '',
                passwordError: '',
                checkError: ''
            })
        }

        this.setState({
            createToggled: toggleValue
        });
    }


    signIn(event) {
        let username = this.state.username;
        let password = this.state.password;
        let agreeChecked = this.state.agreeChecked;
        let createToggled = this.state.createToggled;

        // Create User Toggle
        if(createToggled) {
            if (agreeChecked && username.includes('@') && password.length >= 7) {
                console.log("Validated New User Data");

                // Display Loader
                this.setState({
                    signInBtnStyle: {display: 'none'},
                    btnLoaderStyle: {
                        display: 'inline',
                        marginRight: '59px',
                        marginLeft: '59px',
                        bottom: '-6px'
                    }
                });

                // Create User in Firebase
                let authPromise = this.props.firebaseApp.createAccount(username, password);

                authPromise.catch((error) => {
                    console.log(error);

                    this.setState({
                        dialogLabel: error.message
                    })
                });

            } else {
                if (!username.includes('@')) {
                    this.setState({usernameError: "Email needs have \"bob@gmail.com\" format."})
                }
                if (password.length < 7) {
                    this.setState({passwordError: "Password needs 7 or more characters."});
                }
                if (!agreeChecked) {
                    this.setState({checkError: "Required."})
                }
            }
        // Sign In Toggle
        } else {
            if (username.length > 0 && password.length > 0) {
                console.log("Validated Sign In");

                // Display Loader
                this.setState({
                    signInBtnStyle: {display: 'none'},
                    btnLoaderStyle: {
                        display: 'inline',
                        marginRight: '29px',
                        marginLeft: '29px',
                        bottom: '-6px'
                    }
                });

                // Sign In to Firebase
                let authPromise = this.props.firebaseApp.signIn(username, password);

                authPromise.catch((error) => {
                    console.log(error);

                    this.setState({
                        dialogLabel: error.message
                    })
                });

            } else {
                if(username.length <= 0) {
                    this.setState({usernameError: "Cannot leave blank"})
                }
                if(password.length <= 0) {
                    this.setState({passwordError: "Cannot leave blank"});
                }
            }
        }
    }



    render() {

        // Dialog Action Buttons
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.props.closeLogin}
            />,
            <FlatButton
                label={this.state.btnLabel}
                primary={true}
                disabled={false}
                style={this.state.signInBtnStyle}
                onClick={this.signIn.bind(this)}
            />,
            <CircularProgress
                size={30}
                thickness={7}
                style={this.state.btnLoaderStyle}
            />
        ];

        return (
            <div class="login">
                <Dialog
                    title={this.state.dialogTitle}
                    titleStyle={{textAlign: 'center'}}
                    actions={actions}
                    modal={true}
                    autoScrollBodyContent={true}
                    contentStyle={styles.dialogStyle}
                    open={this.props.loginScreen}
                >
                    <div style={styles.dialogContainer}>
                        <label>{this.state.dialogLabel}</label>
                        <br />
                        <TextField
                            hintText="Enter Username/Email"
                            floatingLabelText="Email"
                            type="email"
                            name="username"
                            value={this.state.username}
                            onChange={this.handleChange}
                            errorText={this.state.usernameError}
                        />
                        <br />
                        <TextField
                            hintText="Enter Password"
                            floatingLabelText="Password"
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            errorText={this.state.passwordError}
                        />
                        <Toggle
                            label="Create New Account"
                            labelPosition="right"
                            style={styles.toggle}
                            name="createToggled"
                            toggled={this.state.createToggled}
                            onToggle={this.onToggle.bind(this)}
                        />
                        { this.state.createToggled ?
                            <Checkbox
                                label={"I agree to terms. " + this.state.checkError}
                                style={styles.checkbox}
                                name="agreeChecked"
                                checked={this.state.agreeChecked}
                                onCheck={this.handleChange}
                            />
                            : null
                        }
                    </div>
                </Dialog>
            </div>
        )
    }
}