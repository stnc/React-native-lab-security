import React from 'react';

import { createBottomTabNavigator } from 'react-navigation-tabs';

import { createStackNavigator } from 'react-navigation-stack'

import { Icon } from 'native-base';

//ilerde açılacak bunlar 
// import AllBlog from '../screens/posts/AllBlog';
// import SinglePost from '../screens/posts/SinglePost';
// import CommentsNews from '../screens/posts/CommentsNews';
// import DetailBlogTab from './DetailBlogTabNavigator';

import HomeAccordion from './../screens/posts/HomeAccordion';

import Profile from './../screens/Profile';

import VideoScreen from './../screens/Video';

import About from './../screens/About';

import Quiz from './QuizTabTabNavigator';

import QuizResultTabNavigator from './QuizResultTabNavigator';
import LoginTabNavigator from './LoginTabNavigator';
import RegisterTabNavigator from './RegisterTabNavigator';

const ProfileTab = createStackNavigator({
  ProfileTab: Profile,
},
  {
    defaultNavigationOptions: {
      headerStyle: {
        // backgroundColor: '#F7F7F7',
        backgroundColor: '#0091EA',
      },
      headerTintColor: '#fff',
      // title: 'Profil Bilgilerim',

    },
  }
);

const BlogTab = createStackNavigator({
  // Home: AllBlog,
  Home: HomeAccordion,
  //  DetailBlogTab:DetailBlogTab, //eğer  bu data  navigation footer da olacaksa burada tanımlanır
  VideoTab: VideoScreen,
  QuizTab: Quiz,
  QuizResult: QuizResultTabNavigator,
  Login: LoginTabNavigator,
  Register: RegisterTabNavigator,
  
  // CommentsNews: CommentsNews,
},
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#0091EA',
      },
      headerTintColor: '#fff',
      title: 'Anasayfa',
    },
  }
);
const AboutTab = createStackNavigator({
  About: About,
},
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#0091EA',
      },
      headerTintColor: '#fff',
      title: 'Hakkımızda',
    },
  }
);


const Tabs = createBottomTabNavigator({

  'TabsScreen': {
    screen: BlogTab,
    headerMode: 'none',
    headerShown: false,
    navigationOptions: {
      tabBarLabel: 'Anasayfa',
      tabBarIcon: ({ focused }) => {
        if (focused) {
          return (
            <Icon ios="ios-home" android="md-home" color="#0091EA" style={{ color: '#0091EA' }} />
          );
        }
        return (
          <Icon ios="ios-home" android="md-home" color={'gray'} style={{ color: 'gray' }} />
        )
      },
      tabBarOptions: {
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }, 
      style: {
        padding: 10
      },
    },
  },
 
  'ProfileTab': {
    screen: ProfileTab,
    
    headerMode: 'none',
    headerShown: false,
    navigationOptions: {
      tabBarLabel: 'Profilim',
      title: 'Profilim',
      tabBarIcon: ({ focused }) => {
        if (focused) {
          return (
            <Icon ios="ios-contact" android="md-contact" style={{ color: '#0091EA' }} color="#0091EA" />
          );
        }
        return (
          <Icon ios="ios-contact" android="md-contact" style={{ color: 'gray' }} color={'gray'} />
        )
      },
      tabBarOptions: {
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      },
    },
  },

  'AboutTab': {
    screen: AboutTab,
    headerMode: 'none',
    headerShown: false,
    navigationOptions: {
      tabBarLabel: 'Hakkında',
      title: 'Profile',
      tabBarIcon: ({ focused }) => {
        if (focused) {
          return (
            <Icon ios="ios-information-circle" android="md-information-circle" color="#0091EA" style={{ color: '#0091EA' }} />
          );
        }
        return (
          <Icon ios="ios-information-circle" android="md-information-circle" color={'gray'} style={{ color: 'gray' }} />
        )
      },
      tabBarOptions: {
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      },
    },
  },

}
);

export default Tabs;

