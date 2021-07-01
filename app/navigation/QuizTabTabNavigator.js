import { createStackNavigator } from 'react-navigation-stack'

import Quiz from './../screens/Quiz';

const QuizTab = createStackNavigator({
  QuizTab: {
    screen: Quiz,
    navigationOptions: ({ navigation }) => ({
        tabBarVisible: false,
        headerShown: false,

    })
},
},
/*  {
      defaultNavigationOptions: {
          headerStyle: {
              backgroundColor: '#0091EA',
          },
          headerTintColor: '#fff',
          title: 'detail news',
      },
  }*/
);

export default QuizTab;
