import React from "react";
import {TabNavigator, TabBarBottom, TabBarTop} from 'react-navigation';
import {MaterialIcons} from '@expo/vector-icons'
import {Constants} from 'expo'
import LivrosScreen from './LivrosScreen'
import LojasScreen from './LojasScreen'

export default TabNavigator(
    {
        Home: {screen: LivrosScreen},
        Other: {screen: LojasScreen},
    },
    {
        navigationOptions: ({navigation}) => ({
            tabBarIcon: ({focused, tintColor}) => {
                const {routeName} = navigation.state;
                let iconName;
                if (routeName === 'Home') {
                    iconName = 'collections-bookmark';
                } else if (routeName === 'Other') {
                    iconName = 'store';
                }

                // You can return any component that you like here! We usually use an
                // icon component from react-native-vector-icons
                return <MaterialIcons name={iconName} size={25} color={tintColor}/>;
            },
        }),
        tabBarOptions: {

            // activeTintColor: '#2196F3',
            // inactiveTintColor: 'grey',
            style: {
                marginTop: Constants.statusBarHeight
            }
        },

        // tabBarComponent: TabBarTop,
        // tabBarPosition: 'bottom',
        animationEnabled: false,
        // swipeEnabled: false,

    }
);