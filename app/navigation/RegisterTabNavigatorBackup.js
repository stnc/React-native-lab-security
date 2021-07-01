import { createStackNavigator } from 'react-navigation-stack'

import Register from './screens/login/Register';

import Login from './screens/login/Login'

const LoginregisterTabNavigator = createStackNavigator({
  LoginTab: Login,
  Register: Register,
},

  {
    defaultNavigationOptions: {
      headerShown: false,  
      headerStyle: {
        backgroundColor: '#0091EA',
      },
      headerTintColor: '#fff'
    },
  }
  
);


export default LoginregisterTabNavigator;
