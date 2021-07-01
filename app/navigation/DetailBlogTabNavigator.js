import { createStackNavigator } from 'react-navigation-stack'

import DetailBlog from './../screens/posts/DetailBlog';

const DetailBlogTab = createStackNavigator({
  DetailBlog: DetailBlog,
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


export default DetailBlogTab;
