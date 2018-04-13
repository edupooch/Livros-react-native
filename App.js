import React from 'react';

import {StackNavigator,  SwitchNavigator} from 'react-navigation';

import LoginScreen from './src/screens/LoginScreen'
import AuthLoadingScreen from './src/screens/AuthLoadingScreen'
import TabNavigation from './src/navigation/TabNavigation'

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
