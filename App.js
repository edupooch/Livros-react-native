// In App.js in a new project

import React from 'react';
import {StackNavigator} from 'react-navigation';

import HomeScreen from './HomeScreen'
import DetailsScreen from './DetailsScreen'


const RootStack = StackNavigator(
    {
        Home: {
            screen: HomeScreen,
        },
        Details: {
            screen: DetailsScreen,
        },
    },
    {
        initialRouteName: 'Home',
    }
);

export default class App extends React.Component {
    render() {
        return <RootStack/>;
    }
}