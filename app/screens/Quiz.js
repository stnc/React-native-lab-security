import React, { Component } from 'react';

import { clientConfig } from './../constants/clientConfig';
import QuizComponent from './QuizComponent';
import MsgBoxStnc from './../components/MsgBoxStnc';
import Login from './login/Login';
import { connect } from 'react-redux';
import { Alert } from 'react-native';

class Quiz extends React.Component {

  static navigationOptions = ({ navigation }) => {

    return {
      title: `${navigation.state.params.title}`,
      // title: `İçerik Detayı`,
      tabBarVisible: true,
      headerStyle: { backgroundColor: '#03A9F4' },
      headerTintColor: '#fff',
      headerTitleStyle: { fontWeight: 'bold' },
    };
  };

  //https://www.robinwieruch.de/react-warning-cant-call-setstate-on-an-unmounted-component 
  state = {
    quizData: null,
    quizFinish: false,
    score: 0,
    waiting: false,
    quizInfo: true,
    isLoginSuccess: this.props.isLoginSuccess 

  };


  constructor(props) {
    super(props);
    this.qno = 0;
    this.qnoQuestion = 1;
    this.score = 0;
    const { navigation } = this.props;
    this.post = navigation.getParam('post', 'no data');


    // console.log('this.props quiz');
    // console.log(this.props);
    // console.log('thi post quiz');
    // console.log(this.post);
    // console.log(this.post);
    //  console.log( JSON.stringify(navigation.getParam('post', 'default value')));
    //  console.log(this.post.id);
    //  console.log(this.props.userToken);
    this.postId = this.post.id;
    this.quizId = this.post.quiz_id;
  }

  async componentDidMount() {
    // console.log("com did okur")
    // console.log(this.props.userToken)
    this.performTimeConsumingTask();

  }

//not used 
  //kullancı login olmuş mu daha önceden onun içindir 
  getSnapshotBeforeUpdate__OLD = (prevProps) => {
    if (prevProps.userToken !== this.props.userToken) {
      return true;
    }
    return false;
  };


    //kullanıcı giriş yapmışsa ve userID oluşmuşsa video like tetiklenecek
    getSnapshotBeforeUpdate = (prevProps) => {
      if (prevProps.userID !== this.props.userID) {
          return true;
      }
      return false;
  };



  componentDidUpdate = (prevProps, prevState, snapshot) => {
    if (snapshot) {
      // console.log("quiz componentDidUpdate run")
      this.performTimeConsumingTask();

    }
  };


  performTimeConsumingTask = async () => {
    return new Promise((resolve) =>
      setTimeout(
        () => {
          resolve('result');
          this.quizFetchData();
        },
        500
      )
    );
  }




  quizFetchData = async () => {

    const quizUrl = clientConfig.QuizRequestUrl + '/' + this.quizId;
    // console.log(quizUrl);
    const headers = {
      'Authorization': "Bearer " + this.props.userToken,
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    const data = {
      method: 'GET',
      // headers: headers,
      mode: 'cors',
      cache: 'default',
    };

    /*
        try {
          //Assign the promise unresolved first then get the data using the json method. 
          const apiCall = await fetch(QuizUrl, data);
          const responseJson =await apiCall.json();
          const arrayData = [...responseJson];
          this.setState({
            data: arrayData[0],
          });
        } catch (err) {
       //   console.log("Error fetching data-----------", err);
        }
    */

    fetch(quizUrl, data)
      .then((response) => {
        return response.json();
      }
      )
      .then(response => {
        let status = response["0"] ? response["0"].status : "";
        if (status == 'not_url_find') {

          this.setState({
            quizInfo: false,
          });
          Alert.alert(
            'Uyarı',
            'Quiz Bulunamadı',
            [
              {
                text: 'Tamam', onPress: () =>
                  this.props.navigation.navigate('Home'),
              },
            ]
          );
        }

        const arrayData = [...response];
 
        // console.log('fetch data run');
        // console.log(arrayData);

        this.setState({
          quizData: arrayData[0],
        });

      })
      .catch(error => {
        // console.log('hata ' + error);
        this.setState({ loading: false, refreshing: false });
      });
  }







  render() {
		if (this.props.isLoginSuccess == null || this.props.isLoginSuccess == '0') {
      // if (this.props.isLoginSuccess) {
        return (
          <Login navigation={this.props.navigation} quizFinish={(action) => this._quizFinish(action)}/>
  
        )
      }

    if (this.state.quizInfo) {
      return (
        <QuizComponent quizData={this.state.quizData} quizId={this.quizId} navigation={this.props.navigation} />
      );
    } else {
      return (          
        <MsgBoxStnc msgTitle="Url Bulunamadı" msg=""/>   
      )
  }
  }
}


const mapStateToProps = (state) => {
  return {
    isLoginPending: state.isLoginPending,
    isLoginSuccess: state.isLoginSuccess,
    loginError: state.loginError,
    isFirstToken: state.isFirstToken,
    userToken: state.userToken,
    userID: state.userID
  };
}
export default connect(mapStateToProps, null)(Quiz);


