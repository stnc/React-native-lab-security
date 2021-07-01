import React, { Component } from 'react';
import {
  View, 
  FlatList,
  ActivityIndicator,
  StyleSheet
} from 'react-native';


import { clientConfig } from './../../../constants/clientConfig';
import AsyncStorage from '@react-native-community/async-storage';
import HomeAccordionListComponent from './HomeAccordionListComponent';

export default class HomeAccordion extends Component {
  static navigationOptions = {
    tabBarVisible: true,
    title: 'İçerikler',
    headerStyle: {
      backgroundColor: '#03A9F4',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: [],
      page: 1,
      refreshing: true,
      siteTitle: '',
      error: '',
      isFirstToken: ''
    };
  }


          // console.log(this.state.siteToken);
        //bu ksımda token validate edecek oradan donen duruma göre eğer validate değilse 
        //yeni token iste
        //validate ise -> data fetch et 
        //soru şu validate i hep mi çalışırmak gerek 
        
  componentDidMount() {
    this._bootstrapAsync();
    setTimeout(
      () => {

        this.fetchData();
      },
      500
    )
  }


  _bootstrapAsync = async () => {
    AsyncStorage.getItem("auth_token").then((value) => {
      this.setState({ "isFirstToken": value });
    })
      .then(res => {
        //do something else
      });
  };

  //invali,d token duruömunda ne olur? 
  fetchData = () => {
    const { page } = this.state;
    const CatPostUrl = clientConfig.CatPostUrl;
    this.setState({ loading: true });

    const headers = {
      'Authorization': "Bearer " + this.state.isFirstToken,
      'Content-Type': 'application/json',
    };
    fetch(CatPostUrl, {
      method: 'GET',
      headers: headers,
      mode: 'cors',
      cache: 'default'
    })
      .then((response) => {
        return response.json();
      }
      )
      .then(response => {
     
        const arrayData = [...this.state.data, ...response]
        this.setState({
          data: page === 1 ? response : arrayData,
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        // console.log('hata ' + error);
        this.setState({ loading: false, refreshing: false });
      });
  };

  renderFooter = () => {
    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating={this.state.refreshing} size="large" />
      </View>
    );
  };


  handleRefresh = () => {
    this.setState(
      {
        page: 1,
        refreshing: true
      },
      () => {
        this.fetchData();
      }
    );
  };

  handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1
      },
      () => {
        this.fetchData();
      }
    );
  };

  render() {

    return (
     
      <View style={styles.container}>
        {/* <Text>{this.state.siteToken}</Text> */}
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => <HomeAccordionListComponent data={item} navigation={this.props.navigation} />}
          keyExtractor={item => item.catTitle}
          ListFooterComponent={this.renderFooter}
          onRefresh={this.handleRefresh.bind(this)}
          refreshing={this.state.refreshing}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={50}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});





