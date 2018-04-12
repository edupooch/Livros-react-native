import React from 'react';

import {StackNavigator, TabNavigator, SwitchNavigator} from 'react-navigation'; // Version can be specified in package.json

import LoginScreen from './LoginScreen'
import AuthLoadingScreen from './AuthLoadingScreen'
import TabNavigation from './TabNavigation'

const AppStack = TabNavigation;
const AuthStack = StackNavigator({SignIn: LoginScreen});

export default SwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        App: AppStack,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'AuthLoading',
    }
);
