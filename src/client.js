if(module.hot) {
    module.hot.accept();
}
import React from 'react';
import ReactDOM from 'react-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
var colors = require('material-ui/styles/colors');
import _ from 'lodash';

import App from './js/App.js';

//______________________ CUSTOM STYLING _________________________________________________________
import {fade} from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';

const muiTheme = getMuiTheme({
    spacing: spacing,
    fontFamily: 'Roboto, sans-serif',
    palette: {
        primary1Color: colors.cyan500,
        primary2Color: colors.cyan700,
        primary3Color: colors.grey400,
        accent1Color: colors.pinkA200,
        accent2Color: colors.grey100,
        accent3Color: colors.grey500,
        textColor: colors.darkBlack,
        alternateTextColor: colors.white,
        canvasColor: colors.white,
        borderColor: colors.grey300,
        disabledColor: fade(colors.darkBlack, 0.3),
        pickerHeaderColor: colors.cyan500,
        clockCircleColor: fade(colors.darkBlack, 0.07),
        shadowColor: colors.fullBlack
    },
    appBar: {
        height: 50,
    },
 // userAgent: req.headers['user-agent']
});

const customTheme = _.merge(darkBaseTheme, muiTheme);
//___________________________________________________________________________________________________

const app = document.getElementById('app');

ReactDOM.render(
    <MuiThemeProvider muiTheme={customTheme}>
        <App/>
    </MuiThemeProvider>
    , app);