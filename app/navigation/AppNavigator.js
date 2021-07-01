import { createAppContainer } from 'react-navigation';

import { createStackNavigator } from 'react-navigation-stack'

import React, { Component } from "react";

import Tabs from './TabsNavigator';

import SplashScreen from './../screens/Splash';

import DetailBlogTab from './DetailBlogTabNavigator';

import LoginTabNavigator from './LoginTabNavigator';
import RegisterTabNavigator from './RegisterTabNavigator';
import SinglePostTab from './SinglePostTabNavigator';
/*
import Quiz from './QuizTabTabNavigator';
import QuizResultTabNavigator from './QuizResultTabNavigator';
*/

/*
****
ÖNEMLİ 
eğer içerik navigation footer dan bağımsız olacaksa burada tanımlanır
*/

const AppStackNavigator = createStackNavigator({
    Splash: SplashScreen,

    Tabs: {
        screen: Tabs,
        navigationOptions: ({ navigation }) => ({
      
            tabBarVisible: false,
        })
    },

    DetailBlogTab: {
        screen: DetailBlogTab,
        navigationOptions: ({ navigation }) => ({
 
            tabBarVisible: false,
        })
    }, 
    
    LoginTabNavigator: {
        screen: LoginTabNavigator,
        navigationOptions: ({ navigation }) => ({
       
            tabBarVisible: false,
        })
    },
    RegisterTabNavigator: {
        screen: RegisterTabNavigator,
        navigationOptions: ({ navigation }) => ({
       
            tabBarVisible: false,
        })
    },

    SinglePostTab: {
        screen: SinglePostTab,
        navigationOptions: ({ navigation }) => ({
           
            tabBarVisible: false,
        })
    },


    /*
        QuizTab: {
            screen: Quiz,
            navigationOptions: ({ navigation }) => ({
              
                tabBarVisible: false,
            })
        },
        QuizResultTab: {
            screen: QuizResultTabNavigator,
            navigationOptions: ({ navigation }) => ({
              
                tabBarVisible: false,
            })
        },
    */
},
    {
        headerMode: 'none',
        mode: 'modal',
        // defaultNavigationOptions: {
        //     title: 'home ekran',
        //     headerStyle: {
        //         backgroundColor: '#f4511e',
        //     },
        //     headerTintColor: '#fff',
        //     headerTitleStyle: {
        //         fontWeight: 'bold',
        //     },
        // },

    }
);
const AppNavigator = createAppContainer(AppStackNavigator);

class AppStackNavig extends Component {
    render() {
        return (
            <AppStackNavigator />
        );
    }
}

export default AppNavigator;
// export default  createAppContainer(RootStack);