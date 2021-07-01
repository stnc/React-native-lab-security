

import "react-native-gesture-handler";
import React, { Component } from 'react';

import { AppRegistry, YellowBox } from 'react-native';

import { name as appName } from './app.json';

import { Provider } from 'react-redux';

import store from './app/redux/store';

import AppNavigator from './app/navigation/AppNavigator';

// import NetInfo from '@react-native-community/netinfo'; //https://github.com/react-native-community/react-native-netinfo

import { Dimensions, StyleSheet } from 'react-native';

import { View, Text } from 'react-native';

const { width } = Dimensions.get('window');

//https://gist.github.com/jvandenaardweg/58ed91e3c33de0b75a15d38853b23d7d
//https://medium.com/dailyjs/offline-notice-in-react-native-28a8d01e8cd0
function MiniOfflineSign() {

  return (
    <View style={styles.offlineContainer}>
      <Text style={styles.offlineText}>İnternet Bağlantısı Bulunamadı</Text>
      {/* <Text style={styles.offlineText}>No Internet Connection</Text> */}
    </View>
  );
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      jwt: '',
      loading: true,
      isConnected:true
    }
  }



  render() {
    if (!this.state.isConnected) {
      return <MiniOfflineSign />;
    } else {
      return (
        <Provider store={store}>
          <AppNavigator />
        </Provider>
      );
    }
  }
}

AppRegistry.registerComponent(appName, () => App);

// const Root = () => (
//   <Provider store={store}>
//     <AppNavigator />
//   </Provider>
// )
// AppRegistry.registerComponent(appName, () => Root);


YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: `-[RCTRootView cancelTouches]`',
  'Warning: componentWillReceiveProps is deprecated',
  'Warning: DatePickerAndroid', // will be fixed with https://github.com/mmazzarolo/react-native-modal-datetime-picker/pull/262
  'Require cycle: app/screens/login/Login.js -> app/screens/Quiz.js -> app/screens/login/Login.js',
  'Require cycle: app/screens/Profile.js -> app/screens/login/Login.js -> app/screens/Profile.js',
  'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead.', // BUG: bu hataya bakılcak detail blog sayfasında var 
  'Sending `onAnimatedValueUpdate` with no listeners registered.',
]);

YellowBox.ignoreWarnings([
  //'Warning: Async Storage has been extracted',
  'Battery state',
  'Module RCTImageLoader requires',
  'componentWillMount',
  'componentWillUpdate',
  'componentWillReceiveProps',
  '[location] ERROR - 0',
  'RCTRootView cancelTouches', // https://github.com/kmagiera/react-native-gesture-handler/issues/746
]);

// HACK: bu hata logout olunca gelior profile sayfasında avatar resim tetikliyor 
YellowBox.ignoreWarnings([
'source.uri should not be an empty string'
]);

// HACK: bunu react-native-keyboard-spacer eklentisi yapıyor 
YellowBox.ignoreWarnings([
'Warning: Overriding previous layout animation with new one before the first began:'
]);


// YellowBox.ignoreWarnings([
//   'VirtualizedLists should never be nested', // TODO: Remove when fixed
// ])

const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: '#b52424',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width,
    position: 'absolute',
    top: 30
  },
  offlineText: { color: '#fff' },
  viewStyles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange'
  },
  textStyles: {
    color: 'yellow',
    fontSize: 40,
    fontWeight: 'bold'
  }
});

// export ANDROID_SDK=/Users/stnc/Library/Android/sdk
// export PATH=/Users/stnc/Library/Android/sdk/platform-tools:$PATH