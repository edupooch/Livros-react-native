import React from 'react';

import {StackNavigator,  SwitchNavigator} from 'react-navigation';

import LoginScreen from './LoginScreen'
import AuthLoadingScreen from './AuthLoadingScreen'
import TabNavigation from './TabNavigation'

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
