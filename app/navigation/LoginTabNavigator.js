import { createStackNavigator } from 'react-navigation-stack'


import Login from './../screens/login/Login'


const LoginTabNavigator = createStackNavigator({
  LoginTab: {
    screen: Login,
    navigationOptions: ({ navigation }) => ({
        tabBarVisible: false,
        headerShown: false
    })
},
},
)
export default LoginTabNavigator;

