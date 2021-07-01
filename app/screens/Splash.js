import React from 'react';
import { View,  Image } from 'react-native';
import { connect } from 'react-redux';
import { firstToken } from './../redux/reducer';
import { deviceStorage, _retrieveData } from './../services/deviceStorage';
import { clientConfig, BaseConfig } from './../constants/clientConfig';
import {  StyleSheet } from 'react-native';
// import NetInfo from '@react-native-community/netinfo';

// import { performTimeConsumingTask } from './services/fetchService';




class SplashScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      jwt: '',
      loading: true,
    }
    //this.onLoginFail = this.onLoginFail.bind(this)
    // this.deleteJWT = deviceStorage.deleteJWT.bind(this);
    // this.loadJWT = deviceStorage.loadJWT.bind(this);
    // this.loadJWT();
  }


  // TODO: bu async nasıl yapılır öğrenilecek 
  async componentDidMount() {
    // Preload data from an external API
    // Preload data using AsyncStorage

    const data = await this.performTimeConsumingTask();
    if (data !== null) {
      this.props.navigation.navigate('Home');
    }
  }


  performTimeConsumingTask = async () => {
    return new Promise((resolve) =>
      setTimeout(
        () => {
          resolve('result');
          this.fetchTokenData();
        },
        2000
      )
    );
  }

  fetchTokenData = async () => {
    const url = clientConfig.TokenUrl;
    const formData = new FormData();
    formData.append('username', BaseConfig.username);
    formData.append('password', BaseConfig.password);

    fetch(url, {
      method: 'POST',
      header: {
        'Content-Type': 'multipart/form-data',
				'Accept': 'application/json',
      },
      body: formData,
    })
    .then((response) => {
      return response.json();
    })
      .then((responseJson) => {
        // console.log(responseJson.token)
        deviceStorage.saveKey('auth_token', responseJson.token);
        this.props.firstToken(responseJson.token);
      })
      .catch((error) => {
        console.log(error);
        // this.onLoginFail();
      });

  };




  render() {
    const resizeMode = 'cover';
    const text = 'BİYOGÜVENLİK BİLGİLERİ';

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#eee',
        }}>

       
       <View>
<Image source={require('../assets/splash1.png')}  style={{width: '100%', height: '100%'}}
            resizeMode="cover" />
        </View> 
        

      </View>
    );
  }
}



const mapStateToProps = (state) => {
  return {
    isFirstToken: state.isFirstToken,
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    firstToken: (token) => dispatch(firstToken(token))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);




//bunu nasıl kullanabilirim buna bakmak lazıom 
onLoginFail = () => {
  this.setState({
    error: 'Login Failed',
    loading: false
  });
};

const styles = StyleSheet.create({

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