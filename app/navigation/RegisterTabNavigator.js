import { createStackNavigator } from 'react-navigation-stack'

import Register from './../screens/login/Register';



const RegisterTabNavigator = createStackNavigator({
  Register: {
    screen: Register,
    navigationOptions: ({ navigation }) => ({
        tabBarVisible: false,
        headerShown: false
    })
},
},
)
export default RegisterTabNavigator;
