import React, { Component } from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  View,
  Text
} from 'react-native';
import { Button, Text as Ntext, Icon } from 'native-base';
import { clientConfig } from './../constants/clientConfig';
import { connect } from 'react-redux';
import { WToast } from 'react-native-smart-tip'

class QuizResult extends Component {

  //https://www.robinwieruch.de/react-warning-cant-call-setstate-on-an-unmounted-component 
  state = {
    data: null,
    score: 0,
    loading: true,
    publicIP: '127.0.0.1',
  };


  constructor(props) {
    super(props);

    const { navigation } = this.props;
    this.quizResultSendData = navigation.getParam('quizResultSendData', 'no data');
    // alert ("gelir")
   console.log(this.quizResultSendData)
  }

  componentDidMount() {
    // console.log("com did okur")
    // console.log(this.props.userToken)
    this.performTimeConsumingTask();
    // this.publicIPrequest();

  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.loading !== this.state.loading) {
      return true;
    }
    return false;
  };



  performTimeConsumingTask = async () => {
    return new Promise((resolve) =>
      setTimeout(
        () => {
          resolve('result');
          this.quizResultFetchData();
        },
        500
      )
    );
  }

  publicIPrequest() {
    publicIP()
      .then(ip => {
        this.setState({ 'publicIP': ip });
        // console.log('ip adresim');
        // console.log(ip);
      })
      .catch(error => {
        console.log(error);
        // 'Unable to get IP address.'
      });
  }


  wToastShow = () => {
    const toastOpts = {
      data: 'Yükleniyor',
      textColor: '#fff',
      backgroundColor: '#444444',
      position: WToast.position.CENTER,
      duration: WToast.duration.LONG,
      icon: <ActivityIndicator color='#fff' size={'large'} />
    }

    if (this.state.loading) {
      WToast.show(toastOpts);
    } else {
      WToast.hide();
    }
  }

  quizResultFetchData = async () => {
    // console.log('gelen data this.quizResultSendData')
    // console.log(this.quizResultSendData)
    const quiz_id = this.quizResultSendData.quiz_id[0];
    const user_id = this.quizResultSendData.user_id;
    const post_id = this.quizResultSendData.post_id;
    const quiz_name = this.quizResultSendData.quiz_name;
    const point_score = 0; //always 0 
    const correct_score = this.quizResultSendData.correct_score;
    const correct = this.quizResultSendData.correct;
    const total = this.quizResultSendData.total;
    const user_ip = this.state.publicIP;
    const quiz_results = this.quizResultSendData.quiz_results;

    const formData = new FormData();
    formData.append('quiz_id', quiz_id);
    formData.append('user_id', user_id);
    formData.append('post_id', post_id);
    formData.append('quiz_name', quiz_name);
    formData.append('point_score', point_score);
    formData.append('correct_score', correct_score);
    formData.append('correct', correct);
    formData.append('total', total);
    formData.append('user_ip', user_ip);
    formData.append('quiz_results', quiz_results);

    const headers = {
      'Authorization': "Bearer " + this.props.isFirstToken,
      // 'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Type': 'multipart/form-data',
      'Accept': 'application/json',
    };

    const data = {
      method: 'POST',
      headers: headers,
      mode: 'cors',
      cache: 'default',
      body: formData,
    };


    fetch(clientConfig.QuizResultPostUrl, data)
      .then((responseJson) => responseJson.json())
      .then((responseJson) => {
        console.log("sonuç gonderiliyor")
        console.log((responseJson))
        if (responseJson.status === "ok"  )  {
          // this.setState({ msjNotice: responseJson.msg });
          this.setState({ msjNotice: "Sonuçlar başarı ile kaydedildi" });
          this.setState({ loading: false });
          // this.wSnackBarShow();

        } 
        else if ( responseJson.status === "duplicate" )  {
          // this.setState({ msjNotice: responseJson.msg });
          this.setState({ msjNotice: "Soruları daha önce çözdünüz" });
          this.setState({ loading: false });
          // this.wSnackBarShow();

        } else {
          // this.setState({ msjNotice: responseJson.msg });
          this.setState({ msjNotice: "Sunucuda bir sorun oluştu" });
          this.setState({ loading: true });
           alert("Beklenmeyen bir sorun oluştu")
          // console.log('quiz sonucu gondermede hata elseden-- ');
          console.log(JSON.stringify(responseJson))
        }

      })
      .catch(error => {

        // console.log('quiz sonucu gondermede hata ' + JSON.stringify(error));
        // console.log(JSON.stringify(error));
        this.setState({ loading: true });

      });
  }






  _scoreMessage(_score) {

    let score = Math.round(_score);
    if (score <= 30) {
      return (<View style={styles.innerContainer} >
        <View style={{ flexDirection: "row" }} >
          <Icon name="trophy" size={30} color="white" />
        </View>
        {/* <Text style={styles.score}>Daha fazla çalışmanız gerekiyor</Text> */}
        <Text style={styles.score}>Skorunuz {score}%</Text>
        <Text style={styles.score}>{this.state.msjNotice}</Text>

      </View>)
    } else if (score > 30 && score < 60) {
      return (<View style={styles.innerContainer} >
        <View style={{ flexDirection: "row" }} >
          <Icon name="trophy" size={30} color="white" />
          <Icon name="trophy" size={30} color="white" />
        </View>
        {/* <Text style={styles.score}>You are good</Text> */}
        {/* <Text style={styles.score}>Congrats you scored {score}% </Text> */}
        <Text style={styles.score}>Skorunuz {score}%</Text>
        <Text style={styles.score}>{this.state.msjNotice}</Text>

      </View>)
    } else if (score >= 60) {
      return (<View style={styles.innerContainer}>
        <View style={{ flexDirection: "row" }} >
          <Icon name="trophy" size={30} color="white" />
          <Icon name="trophy" size={30} color="white" />
          <Icon name="trophy" size={30} color="white" />
        </View>
        <Text style={styles.score}>Çok başarılısınız</Text>
        <Text style={styles.score}>{this.state.msjNotice}</Text>
        <Text style={styles.score}>Skorunuz {score}%</Text>
        {/* <Text style={styles.score}>Congrats you scored {score}% </Text> */}
      </View>)
    }

  }

  _onPress = () => {
    this.props.navigation.replace('Home');
    this.props.navigation.navigate('Home');
    
    // this.props.navigation.goBack(null);

    // const post_id = this.quizResultSendData.post_id;
    // const quiz_name = this.quizResultSendData.quiz_name;
    // this.props.navigation.navigate('SinglePostTab', { postId: post_id,'title':quiz_name,'likeEvent':false})


};


  render() {
    if (this.state.loading) {
      return (
        <View style={{
          flex: 1, justifyContent: 'center',
          alignItems: 'center'
        }}>
          <ActivityIndicator color='#000' size={'large'} />
        </View>
      )
    }
    return (
      <View style={{ flex: 1 }}>
        {/* <StatusBar barStyle="light-content" /> */}

        <View style={styles.container}>
          <View style={styles.circle}>

            {this._scoreMessage(this.quizResultSendData.correct_score)}

          </View>
          <View>
            <Button style={{ marginTop: 20 }} onPress={() => this._onPress()} full small danger>
              <Icon active name="close" />
              <Ntext>Anasayfa </Ntext>
            </Button>
          </View>
        </View>


      </View>
    );
  }


}



const scoreCircleSize = 300
const styles = StyleSheet.create({
  score: {
    color: "white",
    fontSize: 20,
    fontStyle: 'italic'
  },
  circle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: scoreCircleSize,
    height: scoreCircleSize,
    borderRadius: scoreCircleSize / 2,
    backgroundColor: "green"
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  //  progress componmenet
  circles: {
    flexDirection: 'row',
    alignItems: 'center',
  }, progress: {
    margin: 5,
  },
});


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
export default connect(mapStateToProps, null)(QuizResult);


// export default  Quiz;