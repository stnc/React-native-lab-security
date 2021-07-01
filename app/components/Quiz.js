import React, { Component } from 'react';
//https://stackoverflow.com/questions/36716207/react-native-accessing-refs-in-a-custom-component
import {
    StyleSheet,
    Text,
    View,r

    Dimensions,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import { Icon, Card, CardItem } from 'native-base';
import { Left, Right, Button } from 'native-base';
import * as Animatable from 'react-native-animatable';
import * as Progress from 'react-native-progress';

const { width, height } = Dimensions.get('window')

const jsonData = [
    {
        "title": "bakalım laboratuar güvenliği konusunda ne öğrendik",
        "questions": [
            {

                "question": "en kötü atık nedir",
                "img": "",
                "id": "{{ID}}",
                "answers": {
                    "answers3": "oksijen",
                    "answers0": "paspas",
                    "answers1": "tırnak",
                    "answers2": "bor"
                },
                "correctOption": "answers0"

            },
            {

                "question": "temizlik yaparken hangi bezi kullanıyorsun",
                "img": "",
                "id": "1eb6f88a-3bed-4b8c-b9fa-807a124018ff",
                "answers": {
                    "answers2": "kirli atlet",
                    "answers1": "yırtık atlet",
                    "answers0": "atlet",
                    "answers3": "temiz atlet"
                },
                "correctOption": "answers0"

            },
            {

                "question": "en iyi atık nedir",
                "img": "",
                "id": "4d2bc12b-610b-400c-adbb-6bb138796821",
                "answers": {
                    "answers1": "ateş",
                    "answers3": "civa",
                    "answers2": "hava",
                    "answers0": "su"
                },
                "correctOption": "answers0"

            },
            {

                "question": "sence yerleri ne ile temizlemeliyiz",
                "img": "",
                "id": "d0d33d2a-1b32-4be5-9607-0324c6ce6ca2",
                "answers": {
                    "answers1": "tıbbı su",
                    "answers3": "bulanık su ",
                    "answers2": "saf su",
                    "answers0": "su"
                },
                "correctOption": "answers0"

            },
            {

                "question": "soru son yedek sence yerleri ne ile temizlemeliyiz",
                "img": "",
                "id": "d0d33d2a-1b32-4be5-9607-0324c6ce6ca2",
                "answers": {
                    "answers1": "tıbbı su",
                    "answers3": "bulanık su ",
                    "answers2": "saf su",
                    "answers0": "su"
                },
                "correctOption": "answers0"

            }
        ],
        "quiz_results": [
            {
                "title": "0 puan tüh sana yazıklar olsun ",
                "desc": "<p>sana hediye olarak 3 ün birini verdik</p>",
                "img": "http://wp.test/wp-content/uploads/2019/09/parmak.jpeg",
                "min": 0,
                "max": 0,
                "url": null,
                "tags": "",
                "groups": []
            },
            {
                "title": "1 puan ",
                "desc": "<p>sana hediye olarak bu ayıcığı verdik&nbsp;</p>",
                "img": "http://wp.test/wp-content/uploads/2019/09/ayicik-240x300.jpeg",
                "min": 1,
                "max": 1,
                "url": null,
                "tags": "",
                "groups": []
            },
            {
                "title": "2 puan",
                "desc": "<p>ikide idare eder işte sana gümüş verdik&nbsp;</p>",
                "img": "http://wp.test/wp-content/uploads/2019/09/gumus-nedir-670x365-300x163.jpg",
                "min": 2,
                "max": 2,
                "url": null,
                "tags": "",
                "groups": []
            },
            {
                "title": "3 puan",
                "desc": "<p>sana broz verdik&nbsp;</p>",
                "img": "http://wp.test/wp-content/uploads/2019/09/bronz-300x300.jpg",
                "min": 3,
                "max": 3,
                "url": null,
                "tags": "",
                "groups": []
            },
            {
                "title": "hepsini bildin ",
                "desc": "<p>bunu hakketin artık erit erit harca kerata&nbsp;</p>",
                "img": "http://wp.test/wp-content/uploads/2019/09/altin-kelebek-odul-toreni-basladi-iste-finalistler-1512928852-300x169.jpg",
                "min": 4,
                "max": 4,
                "url": null,
                "tags": "",
                "groups": []
            }
        ],
        "quiz_settings": {
            "hide_answers": "",
            "result_mode": "",
            "quiz_type": ""
        }
    }
];

export default class Quiz extends Component {

    render() {
        return (
            <ScrollView style={[styles.containerCard]}>

            {/* quizResult componenet */}
            <Card style={[styles.quizResult]} >
              <CardItem style={[styles.quizResultCardItem]} >
                <Left>
                  <Icon style={[styles.quizResultIcon]} name='sad' />
                  <Text style={[styles.quizResultGoodText]}>Tebrikler Bildiniz</Text>
                </Left>
    
                <Right>
                  <Button primary large>
                    <Icon style={[styles.quizResultBtnIcon]} name='arrow-forward' />
                    <Text style={[styles.quizResultBtnText]}>sonraki soru</Text>
                  </Button>
                </Right>
              </CardItem>
            </Card>
    
            {/* quizResult quiz componmenet */}
            <Card>
              <View>
                <Text style={[styles.quizText]}>
                  Biyogüvenlik, biyoteknoloji kapsamında yapılan tüm çalışmaların çevre ve insan yaşamını negatif yönde etkilememesi
                  için yasal denetim altına alınması işlemine denir.
                            </Text>
              </View>
            </Card>
    
            {/* sorular componmenet */}

            <TouchableOpacity>
              <Animatable.View style={[styles.GeneralBtnStyle]}>
                <Icon style={[styles.btnIconGeneral, styles.showNullBoxBtn]} ios='ios-radio-button-off' android="md-radio-button-off" />
                <Text style={[styles.btnTextGeneral]}>soru son yedek sence yerleri ne ile temizlemeliyiztemizlemeliyiztemizlemeliyiztemizlemeliyizv temizlemeliyiztemizlemeliyiz temizlemeliyiz temizlemeliyiztemizlemeliyiz</Text>
              </Animatable.View>
            </TouchableOpacity>

            <TouchableOpacity>
              <Animatable.View style={[styles.GeneralBtnStyle, styles.showRightBoxBtn]}>
                <Icon style={[styles.btnIconGeneral]} ios='ios-checkmark-circle' android="md-checkmark-circle" />
                <Text style={[styles.btnTextGeneral]}>soru son yedek sence yerleri ne ile temizlemeliyiztemizlemeliyiztemizlemeliyiztemizlemeliyizv temizlemeliyiztemizlemeliyiz temizlemeliyiz temizlemeliyiztemizlemeliyiz</Text>
              </Animatable.View>
            </TouchableOpacity>
    
    
            <TouchableOpacity>
              <Animatable.View style={[[styles.GeneralBtnStyle, styles.showWrongBoxBtn]]}>
                <Icon style={[styles.btnIconGeneral]} ios='ios-close-circle' android="md-close-circle" />
                <Text style={[styles.btnTextGeneral]}>soru son yedek sence yerleri ne ile temizlemeliyiztemizlemeliyiztemizlemeliyiztemizlemeliyizv temizlemeliyiztemizlemeliyiz temizlemeliyiz temizlemeliyiztemizlemeliyiz</Text>
              </Animatable.View>
            </TouchableOpacity>
   

            {/* progress componmenet */}
            <Card style={styles.quizProgress} noShadow={true} transparent={true}>
              <CardItem style={{ margin: 0, padding: 0 }} >
                <Button light small style={[styles.quizProgressBtnGeneral, styles.quizProgressBtnBack]}>
                  <Icon style={[styles.quizProgressBtnIcon]} name='arrow-back' />
                </Button>
                <Text>Soru 8/10</Text>
                <Button light small style={[styles.quizProgressBtnGeneral, styles.quizProgressBtnForward]}>
                  <Icon style={[styles.quizProgressBtnIcon]} name='arrow-forward' />
                </Button>
    
                <Progress.Bar progress={0.20} width={100} style={styles.quizProgressBar} />
                <Text>% 100</Text>
              </CardItem>
            </Card>
    
          </ScrollView>
        );
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
        margin: 5
    },
    quizProgressBtnBack: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    quizProgressBtnForward: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },

    quizProgressBtnIcon: {
        color: '#7DB6DE'
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
    },
    oval: {
        width: width * 90 / 100,
        borderRadius: 20,
        backgroundColor: 'green'
    },
    container: {
        flex: 1,
        alignItems: 'center'
    },
    welcome: {
        fontSize: 20,
        margin: 15,
        color: "white"
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    GeneralBtnStyle: {
        padding: 10,
        backgroundColor: 'white',
        borderColor: '#DDDDDD',
        borderWidth: 1.5,
        borderRadius: 8,
        alignItems: 'center',
        flexDirection: 'row',
        overflow: 'visible',
        marginBottom: 10
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
        margin: 3
    },
    btnTextGeneral: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 5,
        overflow: 'scroll'
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
        fontSize: 50,
        color: '#FAD93B'
    },
    quizResultGoodText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'red',
        paddingLeft: 10
    },
    quizResultBtnIcon: {
        color: '#7DB6DE'
    },
    quizResultBtnText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
        paddingRight: 10
    }
});