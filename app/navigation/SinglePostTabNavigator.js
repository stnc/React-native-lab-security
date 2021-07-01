import { createStackNavigator } from 'react-navigation-stack'

import SinglePost from './../screens/posts/SinglePost';

const SinglePostTab = createStackNavigator({
  SinglePostTab: SinglePost,
},
  {
    defaultNavigationOptions: {
      // headerShown: false,
      headerStyle: {
        backgroundColor: '#0091EA',
      },
      headerTintColor: '#fff',

    },
  }
);


export default SinglePostTab;
