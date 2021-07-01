import { createStackNavigator } from 'react-navigation-stack'

import QuizResult from './../screens/QuizResult';

const QuizResultTabNavigator = createStackNavigator({

  QuizResultTab: {
    screen: QuizResult,
    navigationOptions: ({ navigation }) => ({

      tabBarVisible: false,
      headerShown: false

    })
  },
},
);


export default QuizResultTabNavigator;
