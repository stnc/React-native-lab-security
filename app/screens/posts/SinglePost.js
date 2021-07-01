import React, { Component } from 'react';
import {
  View,
  ActivityIndicator,
   Platform
} from 'react-native';

// import BlogListComponentFORFlatList from './components/BlogListComponentFORFlatList';
import BlogListComponent from './components/BlogListComponent';
import { clientConfig } from './../../constants/clientConfig';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
class SinglePost extends Component {




  static navigationOptions = ({ navigation }) => {
    let fontSize;
    if (Platform.OS === 'android') {
      fontSize = 16;
    }

    return {
      title: `${navigation.state.params.title}`,
      // title: `İçerik Detayı`,
      tabBarVisible: true,
      headerStyle: { backgroundColor: '#03A9F4' },
      headerTintColor: '#fff',
      headerTitleStyle: { fontWeight: 'bold', fontSize: fontSize },
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      data: [],
      refreshing: true,
      siteTitle: "",
      error: '',
      isFirstToken: '',
      //userID: this.props.userID === undefined ? "async" : this.props.userID,
      //isLoginSuccess: this.props.isLoginSuccess === undefined ? "0" : this.props.isLoginSuccess,

    };

    const { navigation } = this.props;

    this.postId = navigation.getParam('postId', 0);
    this.title = navigation.getParam('title', "Biyo güvenlik");
    this.likeEvent = this.props.navigation.getParam('likeEvent', false);
  }


  componentDidMount = () => {

    AsyncStorage.getItem('isLogin').then((value) => this.setState({ 'isLoginSuccess': value }));
    AsyncStorage.getItem('userID').then((value) => this.setState({ 'userID': value }));
    // this.fetchData();


    setTimeout(
      function () {
        this.fetchData();
      }.bind(this),
      200
    );
  }


  //invali,d token duruömunda ne olur? 
  fetchData = () => {
    // console.log( this.isFirstToken)

    let userId = "";

    if (this.props.isLoginSuccess) {
      // console.log("usr ıd alanı")
      // console.log(this.props.userID)
      userId = '&userID=' + this.props.userID
    }

    const PostUrl = clientConfig.PostUrl;
    const url = PostUrl + '/' + this.postId + `?_embed` + userId;
    // console.log(url)

    this.setState({ loading: true });

    const headers = {
      'Authorization': "Bearer " + this.props.isFirstToken,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    fetch(url, {
      method: 'GET',
      headers: headers,
      mode: 'cors',
      cache: 'default'
    }).then((response) => {
      return response.json();
    }).then(response => {

      this.setState({
        data: response,
        loading: false
      });
    }).catch(error => {
      this.setState({ loading: false });
    });
  };



  render() {
    if (this.state.loading) {
      return (
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <ActivityIndicator color='#000' size={'large'} />
        </View>
      )
    }

    // console.log(this.state.data)
    return (

      <BlogListComponent posts={this.state.data} navigation={this.props.navigation} likeEvent={this.likeEvent} />

    );
  }
}

const mapStateToProps = (state) => {
  return {
    isFirstToken: state.isFirstToken,
    isLoginSuccess: state.isLoginSuccess,
    singlePostTitle: state.singlePostTitle,
    userID: state.userID
  };
}


export default connect(mapStateToProps, null)(SinglePost);

