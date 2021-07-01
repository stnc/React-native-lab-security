import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,Dimensions,
  Alert
} from 'react-native';
import { Icon, Card, CardItem, Content, ListItem, Body } from 'native-base';
import { Left, Right, Button, Container } from 'native-base';
import * as Animatable from 'react-native-animatable';
import * as Progress from 'react-native-progress';
// import { clientConfig } from './constants/clientConfig';
// import publicIP from 'react-native-public-ip';
import { connect } from 'react-redux';
import Image from 'react-native-image-progress';
const { width, height } = Dimensions.get('window');

class QuizComponent extends Component {
  state = {
    question: null,
    questionImg: null,
    answers: null,
    correctOption: null, // api den bulunan doğru cevap hangisi olduğu bilgisi 
    correctOK: false,// cevapı doğru mu işaretledi 
    correctShowHide: false,// cevapı vedikten sonra doğru cevap gorunecek mi sanırım bunun amacı geri yaptığında değiştirme imkanı olmasın diye olabilir
    totalQuestion: 0,
    nextQuestion: 0,
    countCheck: 0,
    progress: 0,
    indeterminate: true,
  };

  constructor(props) {
    super(props);

    const { navigation } = this.props;
    this.post = navigation.getParam('post', 'no data');

    this.qno = 0;//bu gelen array dizisi için gerekli
    this.qnoQuestion = 1;//burada amaç array dizisine bağlı kalmadan birden başlatabilmek 
    this.score = 0;
    this.dogruCevapSayisi = 0;
    this.questionsData = null;//array dizisinde temp olarak gezeceğimiz gelecek soru burada tutulur

    // console.log("construct");
    // console.log(this.state);
    // console.log(this.props);

    // console.log(this.post);
    //  console.log( JSON.stringify(navigation.getParam('post', 'default value')));
    // console.log(this.post.id);
    this.postId = this.post.id;
    this.quizId = this.props.quizId;
    // console.log('quiz id si '+this.props.quizId);
    // this.quizTitle = this.props.quizData.title;
    this.quizTitle = null;  // TODO: render da kullanılmıyor eklenebilir
  }



  getSnapshotBeforeUpdate = (prevProps) => {
    if (prevProps.quizData !== this.props.quizData) {
      return true;
    }
    return false;
  };


  componentDidUpdate = (prevProps, prevState, snapshot) => {
    if (snapshot) {

      // console.log(this.props.quizData.questions);

      this.questionsData = this.props.quizData.questions;
      this.quizTitle = this.props.quizData.title;
      /*
            console.log('QuizComponent componentDidUpdate den gelir ');
            console.log(this.props.quizData);
            console.log(this.quizTitle);
      */
      let state = {
        question: this.questionsData[this.qno].question,
        questionImg: this.questionsData[this.qno].img,
        answers: this.questionsData[this.qno].answers,
        correctOption: this.questionsData[this.qno].correctOption,
        totalQuestion: this.questionsData.length,
      };
      this.setState(state);

      for (let a = 0; a < this.questionsData.length; a++) {
        for (let i = 0; i < Object.keys(this.questionsData[a].answers).length; i++) {
          this.setState({ ['group' + a + '_' + 'answers' + i + 'Style']: 'GeneralBtnEmptyStyle' })
          this.setState({ ['group' + a + '_' + 'answers' + i + 'IconStyle']: 'radio-button-off' })
          this.setState({ ['group' + a + '_' + 'answers' + i + 'Disable']: false })
          this.setState({ ['group' + a + '_Selected']: false })
        }
      }

    }
  };

  prev() {
    if (this.qno > 0) {
      this.qno--
      this.qnoQuestion--
      this.setState({
        question: this.questionsData[this.qno].question,
        answers: this.questionsData[this.qno].answers,
        questionImg: this.questionsData[this.qno].img,
        correctOption: this.questionsData[this.qno].correctOption,
        correctOK: false,
        correctShowHide: false,
      })
    }
  }


  next() {
    if (!this.state['group' + this.qno + '_Selected']) {
      Alert.alert(
        'Uyarı',
        'Diğer soruya geçmek için lütfen cevaplayınız',
        [
          {
            text: 'Tamam'
          },

        ]
      );
      return false;
    }

    if (this.qno < this.questionsData.length - 1) {
      this.qno++
      this.qnoQuestion++
      this.setState({
        countCheck: 0,
        question: this.questionsData[this.qno].question,
        questionImg: this.questionsData[this.qno].img,
        answers: this.questionsData[this.qno].answers,
        correctOption: this.questionsData[this.qno].correctOption,
        correctOK: false,
        correctShowHide: false
      })
    } else {
      const score = this.score * 100 / this.state.totalQuestion;

      const sendData = {
        quiz_id: this.quizId,
        user_id: this.props.userID,
        post_id: this.postId,
        quiz_name: this.quizTitle,
        point_score: 0, // değişmez 0 
        correct_score: score,
        correct: this.score,
        total: this.state.totalQuestion,
        quiz_results: "",
      };
      this.props.navigation.navigate('QuizResult', { quizResultSendData: sendData })
    }
  }


  _answer(status, ans) {
    this.setState({ ['group' + this.qno + '_answers0Style']: 'showRightBoxBtn' });
    this.setState({ ['group' + this.qno + '_answers0IconStyle']: 'checkmark-circle' })

    this.setState({ 'correctShowHide': true })


    if (status == true) {
      {/* hatalı olursa swing / rubberBand doğru ise  */ }
      this.refs.view.bounce(800);


      // TODO: bu ne işe yarar ?
      const count = this.state.countCheck + 1
      this.setState({ countCheck: count })
      this.setState({ correctOK: true })
      this.dogruCevapSayisi = this.dogruCevapSayisi + 1;
      // this.setState({ dogruCevapSayisi: this.dogruCevapSayisi + 1 })
      this.setState({ ['group' + this.qno + '_' + ans + 'Style']: 'showRightBoxBtn' });
      this.setState({ ['group' + this.qno + '_' + ans + 'IconStyle']: 'checkmark-circle' })
      if (ans == this.state.correctOption) {
        this.score += 1
      }
    } else {
      this.refs[ans + '_name'].swing(800);
      this.setState({ ['group' + this.qno + '_' + ans + 'Style']: 'showWrongBoxBtn' });
      this.setState({ ['group' + this.qno + '_' + ans + 'IconStyle']: 'close-circle' })
      // TODO: bu ne işe yarar ?
      const count = this.state.countCheck - 1
      this.setState({ countCheck: count })
      if (this.state.countCheck < 1 || ans == this.state.correctOption) {
        this.score -= 1
      }
    }
    // all group disable
    for (let i = 0; i < Object.keys(this.questionsData[this.qno].answers).length; i++) {
      this.setState({ ['group' + this.qno + '_' + 'answers' + i + 'Disable']: true })
    }

    this.setState({ ['group' + this.qno + '_Selected']: true })

  }


  displayCorrectMessage() {
    let correctOK = this.state.correctOK;
    let correctShowHide = this.state.correctShowHide;
    if (correctShowHide) {
      if (correctOK) {
        return <Card style={[styles.quizResult]} >
          <CardItem style={[styles.quizResultCardItem]} >
            <Left>
              <Icon style={[styles.quizResultIcon]} name='happy' />
              <Text style={[styles.quizResultGoodText]}>Doğru</Text>
            </Left>

            <Right>
              <Button success small onPress={() => this.next()}>
                <Icon style={[styles.quizResultBtnIcon]} name='arrow-forward' />
                <Text style={[styles.quizResultBtnText]}>Sonraki</Text>
              </Button>
            </Right>
          </CardItem>
        </Card>
      } else {
        return <Card style={[styles.quizResult]} >
          <CardItem style={[styles.quizResultCardItem]} >
            <Left>
              <Icon style={[styles.quizResultIcon]} name='sad' />
              <Text style={[styles.quizResultGoodText]}>Yanlış</Text>
            </Left>

            <Right>
              <Button danger small onPress={() => this.next()}>
                <Icon style={[styles.quizResultBtnIcon]} name='arrow-forward' />
                <Text style={[styles.quizResultBtnText]}>Sonraki</Text>
              </Button>
            </Right>
          </CardItem>
        </Card>
      };
    }
  }

  displayQuestionImage() {
    let questionImg = this.state.questionImg;
   
 
 
    if (questionImg) {
      return  <CardItem cardBody style={{margin:0,padding:0}}>
<Image indicatorProps={{
        size: 80,
        borderWidth: 0,
        color: 'rgba(150, 150, 150, 1)',
        unfilledColor: 'rgba(200, 200, 200, 0.2)'
      }}  style={{width:width,height:height*0.3}}
      
        source={{ uri: questionImg }}
      />
       </CardItem>
    }

  }

  render() {

    // console.log(this.state);
    //TODO merge oncesi
    // sırf buradaki datayı vermek için neler öğrendim 
    // async 
    //https://medium.com/swlh/fetching-fetched-and-fetch-error-is-not-enough-916e6ca512ee 
    //https://blog.logrocket.com/patterns-for-data-fetching-in-react-981ced7e5c56/
    //https://www.valentinog.com/blog/await-react/
    //https://stackoverflow.com/questions/42147733/doing-a-timeout-error-with-fetch-react-native
    //https://dev.to/stereobooster/fetch-with-a-timeout-3d6

    // çözüm https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html
    if (this.props.quizData === null) {
      return (
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
          paddingVertical: 10,
        }}>
          <View style={styles.circles}>

            <Progress.Bar
              style={styles.progress}
              progress={this.state.progress}
              indeterminate={this.state.indeterminate}
            />
            <Text>Yükleniyor</Text>
          </View>

        </View>


      )
    } else {

      let _this = this
      //sürekli değişir 
      // nested state konusu
      //https://stackoverflow.com/questions/43040721/how-to-update-nested-state-properties-in-react
      //https://stackoverflow.com/questions/54445040/whats-the-best-alternative-to-update-nested-react-state-property-with-setstate
      //https://stackoverflow.com/questions/34956479/how-do-i-setstate-for-nested-object
      const currentOptions = { ...this.state.answers }


      let createAnswers = Object.keys(currentOptions).map((k) => {
        return (<View  style={{ }} style={{ padding: 0, marginBottom: 0 }} key={k}>
          {k == 'answers0' ? (

            <View icon style={{flex: 0,  borderWidth: 0 }}>
                <TouchableOpacity  disabled={this.state['group' + this.qno + '_' + k + 'Disable']} onPress={() => _this._answer(true, k)}>
                  <Animatable.View ref="view" style={[styles.GeneralBtnStyle, styles[this.state['group' + this.qno + '_' + k + 'Style']]]}>
                    <Icon style={[styles.btnIconGeneral, styles.showNullBoxBtn]} ios={"ios-" + this.state['group' + this.qno + '_' + k + 'IconStyle']} android={"md-" + this.state['group' + this.qno + '_' + k + 'IconStyle']} />
                    <Text  numberOfLines={5}  style={[styles.btnTextGeneral]}>{currentOptions[k]}</Text>
                  </Animatable.View>
                </TouchableOpacity>
            </View>


          ) : (


            <View icon style={{flex: 0,  borderWidth: 0 }}>
                  <TouchableOpacity   disabled={this.state['group' + this.qno + '_' + k + 'Disable']} onPress={() => _this._answer(false, k)}>
                    <Animatable.View ref={k + '_name'} style={[styles.GeneralBtnStyle, styles[this.state['group' + this.qno + '_' + k + 'Style']]]}>
                      <Icon style={[styles.btnIconGeneral, styles.showNullBoxBtn]} ios={"ios-" + this.state['group' + this.qno + '_' + k + 'IconStyle']} android={"md-" + this.state['group' + this.qno + '_' + k + 'IconStyle']} />
                      <Text  numberOfLines={5}  style={[styles.btnTextGeneral]}>{currentOptions[k]}</Text>
                    </Animatable.View>
                  </TouchableOpacity>
               
              </View>


            )}
        </View>)
      });


      return (




        <Container>

          <Content style={[styles.containerCard]}>

           {this.displayCorrectMessage()}

            <Card style={{ flex: 0 }}>
              <CardItem style={{margin:0,padding:0}}>
                <Left>
             
                    <Text style={[styles.quizText]}>
                      {this.state.question}
                    </Text>
               
                </Left>
              </CardItem>

             
                {this.displayQuestionImage()}
         

              <View style={{ marginBottom: 5 }}>
                {createAnswers}
              </View>

            </Card>

            <Card style={styles.quizProgress}>
              <CardItem>
                <Left>
                  <Button light small style={[styles.quizProgressBtnGeneral, styles.quizProgressBtnBack]} onPress={() => this.prev()} >
                    <Icon style={[styles.quizProgressBtnIcon]} name='arrow-back' />
                  </Button>

                  <Text style={{ margin: 5 }}>Quiz {this.qnoQuestion}/{this.state.totalQuestion}</Text>

                  <Button light small style={[styles.quizProgressBtnGeneral, styles.quizProgressBtnForward]} onPress={() => this.next()}>
                    <Icon style={[styles.quizProgressBtnIcon]} name='arrow-forward' />
                  </Button>
                </Left>

                <Right>
                  <Progress.Bar progress={this.qnoQuestion / this.state.totalQuestion} width={100} style={styles.quizProgressBar} />
                  <Text style={{ paddingRight: 5 }}>% {Math.round(this.qnoQuestion / this.state.totalQuestion * 100)}</Text>
                </Right>
              </CardItem>
            </Card>
          </Content>
        </Container>
      );
    }
  }


}

const styles = StyleSheet.create({

  quizProgress: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    margin: 0,
    padding: 0
  },
  quizProgressBar: {
    margin: 5
  },
  quizProgressBtnGeneral: {
    borderWidth: 1,
    borderColor: '#B1D0E9',
    margin: 0,
    padding: 0
  },
  /*
  quizProgressBtnBack: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  quizProgressBtnForward: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
*/
  quizProgressBtnIcon: {
    color: '#7DB6DE',
    margin: 0,
    padding: 0,
  },

  containerCard: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    margin: 10
  },

  quizText: {
    color: "#000",
    fontFamily: 'opensans-semibold',
    fontWeight: 'bold',
    textTransform: 'capitalize'
  },

  // oval: {
  //     width: width * 90 / 100,
  //     borderRadius: 20,

  container: {
    flex: 1,
    alignItems: 'center'
  },

  GeneralBtnStyle: {
    borderColor: '#dfdfdf',
    borderWidth: 1.5,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    overflow: 'visible',
    padding: 7,
margin:4

    
    
  },

  GeneralBtnEmptyStyle: {
    backgroundColor: '#fff',
  },

  showWrongBoxBtn: {
    backgroundColor: '#f35f5d',
  },

  showRightBoxBtn: {
    backgroundColor: '#6ece53',
  },

  showNullBoxBtn: {
    color: '#DDDDDD',
    overflow: 'visible'
  },
  btnIconGeneral: {
    fontSize: 25,
    justifyContent: 'center',
    color: '#fff',
    alignItems: 'center',
    margin: 3,
    paddingRight: 5,
  },
  btnTextGeneral: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 15,
    // overflow: 'hidden',
    
   
 
  },
  quizResult: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    margin: 0,
    padding: 0
  },
  quizResultCardItem: {
    margin: 0,
    padding: 0,
    backgroundColor: '#EEEEEE'
  },
  quizResultIcon: {
    fontSize: 30,
    color: '#FAD93B'
  },
  quizResultGoodText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'red',
    paddingLeft: 7
  },
  quizResultBtnIcon: {
    // color: '#7DB6DE'
    color: '#fff'
  },
  quizResultBtnText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    paddingRight: 7
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



export default connect(mapStateToProps, null)(QuizComponent);


// export default QuizComponent;