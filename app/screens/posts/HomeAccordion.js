import React, { Component } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ScrollView, Image,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';

import { getLoginSuccess, getAsyncUserInfo } from './../../redux/reducer';

import { clientConfig } from './../../constants/clientConfig';
import AsyncStorage from '@react-native-community/async-storage';

import { Container, Content, Icon, Accordion, Text, Header } from "native-base";

const { width, height } = Dimensions.get('window')

class HomeAccordion extends Component {
  static navigationOptions = {
    tabBarVisible: true,
    title: 'Laboratuvar Güvenliği',
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
      error: '',
      isFirstToken: '',
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

  async componentDidMount() {

    // const data = await this.performTimeConsumingTask();
    // if (data !== null) {
    //   this._bootstrapAsync();
    // }
  }


  performTimeConsumingTask = async () => {
    return new Promise((resolve) =>
      setTimeout(
        () => {
          resolve('result');
          this.fetchData();
        },
        2000
      )
    );
  }

  //kullancı login olmuş mu daha önceden onun içindir 
  getSnapshotBeforeUpdate = (prevProps) => {
    // return { notifyRequired: prevProps.text !== this.props.text };
    if (prevProps.isFirstToken !== this.props.isFirstToken) {
      return true;
    }
    return false;
  };



  componentDidUpdate = async (prevProps, prevState, snapshot) => {
    if (snapshot) {
      const data = await this.performTimeConsumingTask();
      if (data !== null) {
        this._bootstrapAsync();
      }

    }
  };

  _bootstrapAsync = async () => {
    this.props.getLoginSuccess()
    this.props.getAsyncUserInfo()
  };

  fetchData = async () => {
    console.log("uğrar")
    const CatPostUrl = clientConfig.CatPostUrl + '/?uncategorized=0';
    this.setState({ loading: true });

    const headers = {
      'Authorization': "Bearer " + this.props.isFirstToken,
      'Content-Type': 'application/json',
    };
    // console.log(CatPostUrl)
    // console.log(headers)
    if (this.props.isFirstToken != "") {
      fetch(CatPostUrl, {
        method: 'GET',
        headers: headers,
        mode: 'cors',
        cache: 'default'
      })
        .then((response) => {
          return response.json();
        })
        .then(response => {
          const arrayData = [...this.state.data, ...response]
          this.setState({
            data: arrayData,
            loading: false,
          });
        })
        .catch(error => {
          console.log('hata ' + error);
          this.setState({ loading: false });
        });
    }

  };

  _renderHeader(item, expanded) {
    return (
      <View style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#b7daf8",
      }}>
        <Text style={styles.title}>
          {" "} {item.catTitle}
        </Text>
        {expanded
          ? <Icon style={styles.dugme} name="remove-circle" />
          : <Icon style={styles.dugme} name="add-circle" />}
      </View>
    );
  }



  _renderContent = (items) => {
    const list = items.posts.map((item, index) => {
      return (
        <TouchableOpacity key={'st' + index} onPress={() => this.props.navigation.navigate('SinglePostTab', { postId: item.postId, title: item.title })}>
          <Text style={styles.renderText}>{item.title}</Text>
        </TouchableOpacity>
      );
    });
    return <View>{list}</View>;
  }


  /**
   * NOT USED 
   */
  _renderContent_notused(items) {
    let i = 0;
    var rows = [];
    items.posts.forEach(function (item) {
      i++;
      rows.push(
        <TouchableOpacity key={'st' + i} onPress={() => this.props.navigation.navigate('SinglePost', { postId: item.postId, title: item.title })}>
          <Text style={styles.renderText}>{item.title}</Text>
        </TouchableOpacity>
      );
    })
    return <View>{rows}</View>;
  }

  setCurrentReadOffset = (event) => {
    let itemHeight = 600;
    let currentOffset = Math.floor(event.nativeEvent.contentOffset.y);
    let currentItemIndex = Math.ceil(currentOffset / itemHeight);
    this.state.dataset.setReadOffset(currentItemIndex);
  }

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
    return (
      <FlatList
        data={this.state.data}
        keyExtractor={item => item.key}
        ListHeaderComponent={
          <Container>
            <View>

              <Image source={require('../../assets/header.png')} style={{ width: '100%', height: 175 }}
                resizeMode="cover" />
            </View>
            <Content padder style={{ backgroundColor: "#ddecf8" }} >

              <Accordion
                dataArray={this.state.data}
                animation={true}
                expanded={true}
                renderHeader={this._renderHeader}
                renderContent={this._renderContent}
                headerStyle={{ backgroundColor: "#b7daf8" }}
                contentStyle={{ backgroundColor: "#ddecf8" }}
              />

            </Content>
          </Container>
        }
      />
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
    fontSize: 15,
    ...Platform.select({
      android: {
        fontSize: 13,
        padding: 5
      },
    }),
    textAlign: 'center',

    padding: 10,
  },
  renderText: {
    ...Platform.select({
      android: {
        fontSize: 13,
      },
    }),
    borderWidth: 0.2,
    borderColor: '#fff',
    padding: 10,
    fontStyle: "italic",
    fontSize: 14,
  },

  dugme: {
    ...Platform.select({
      android: {
        fontSize: 15,
      },
    }),
    fontSize: 18,
    paddingRight: 10
  }


});





const mapStateToProps = state => ({
  isFirstToken: state.isFirstToken,
});


const mapDispatchToProps = dispatch => ({
  getLoginSuccess: () => dispatch(getLoginSuccess()),
  getAsyncUserInfo: () => dispatch(getAsyncUserInfo()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeAccordion);