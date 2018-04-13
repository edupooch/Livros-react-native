import React from "react";
import {TabNavigator, TabBarBottom} from 'react-navigation';
import {MaterialIcons} from '@expo/vector-icons'

import LivrosStack from "./LivrosStack";
import LojasStack from "./LojasStack";

const Livros = LivrosStack;
const Lojas = LojasStack;

export default TabNavigator(
    {
        Home: {screen: Livros},
        Other: {screen: Lojas},
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
            activeTintColor: '#00897B',
            // inactiveTintColor: 'grey',
            // style: {
            //     marginTop: Constants.statusBarHeight
            // }
        },

        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        animationEnabled: false,
        // swipeEnabled: false,

    }
);