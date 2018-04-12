import React from 'react';

import {StackNavigator,  SwitchNavigator} from 'react-navigation';

import LoginScreen from './screens/LoginScreen'
import AuthLoadingScreen from './screens/AuthLoadingScreen'
import TabNavigation from './screens/TabNavigation'

const AppTab = TabNavigation;
const AuthStack = StackNavigator({SignIn: LoginScreen});

export default SwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        App: AppTab,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'AuthLoading',
    }
);
