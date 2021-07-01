import React from 'react';
import { View, TouchableHighlight, Dimensions, Alert } from 'react-native';
import moment from 'moment';
import { Container, Content, Card, CardItem, Text, Button, Icon, Body, Button as ButtonN, Badge, Footer, FooterTab } from 'native-base';
import Image from 'react-native-image-progress';

// import AsyncStorage from '@react-native-community/async-storage';

const { height } = Dimensions.get('window');
import AuthorActivityComponent from './AuthorActivityComponent';
import { fetchMediaInfo, commentCount, authorInfo } from './../postFunc';
// import Divider from './../../components/elements/Divider';
// import HTML from 'react-native-render-html';
import { connect } from 'react-redux';
import { setPostCounter } from './../../../redux/reducer';
class BlogListComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            data: [],
            page: 1,
            refreshing: true,
            siteTitle: '',
            error: '',
            isFirstToken: '',
            title: this.props.posts.title ? this.props.posts.title.rendered : "",
            propsidata: null,

            isLoginSuccess: this.props.isLoginSuccess
            // totalLike: this.props.posts.totalLike,
        };

        this.props.setPostCounter(this.props.posts.totalLike)
    };




    _onPress = () => {
        // this.props.navigation.replace('Home');
        // this.props.navigation.navigate('Home');
        this.props.navigation.goBack(null)
    };

    isUserLoginAlert = (routerName, propsName) => {

        let propsData = { post: this.props.posts, routerName: "" };

        if (routerName == "VideoTab") {
            propsData = { videoLink: propsName };
        }

        if (this.props.isLoginSuccess == null || this.props.isLoginSuccess == "0") {
            Alert.alert(
                'Uyarı',
                'Bu işlem sonucu sertifika alacaksınız, lütfen üye olunuz yada giriş yapınız',
                [
                    {
                        text: 'Vazgeç', onPress: () =>
                            "vazgeçildi"
                    },
                    {
                        text: 'Giriş Yap', onPress: () =>
                            this.props.navigation.navigate(routerName, propsData),
                    },
                ]
            );
        } else {
            this.props.navigation.navigate(routerName, propsData)
        }

    };

    listOkuOgren(props) {
        let quiz_id = props.quiz_id ? props.quiz_id : false;
        let youtubeLink = props.youtubeLink ? props.youtubeLink : false;


        const oku = (

            <Button onPress={() => this.props.navigation.navigate('DetailBlog', { post: this.props.posts })} bordered info style={[styles.videoContainerBtn]}>
                <Icon name="book" />
                <Text style={[styles.videoContainerText]}>Oku</Text>
            </Button>
        );


        let exportQuiz = (
            <View>
            </View>
        );

        if (quiz_id != "") {
            exportQuiz =
                <Button onPress={() => this.isUserLoginAlert("QuizTab")} bordered warning style={[styles.videoContainerBtn]}>
                    <Icon name="logo-codepen" />

                    <Text style={[styles.videoContainerText]}>Çöz</Text>
                </Button>
        }

        let exportYoutube = (
            <View>
            </View>
        );

        if (youtubeLink != "") {
            exportYoutube =
                <Button onPress={() => this.isUserLoginAlert("VideoTab", youtubeLink)} bordered success style={[styles.videoContainerBtn]}>
                    <Icon name="play" />
                    <Text style={[styles.videoContainerText]}>İzle</Text>
                </Button>
        }

        return (
            <View style={styles.OkuVideoQuiz}>
                {oku}
                {exportQuiz}
                {exportYoutube}
            </View>
        );
    }

    _onPress = () => {
        this.props.navigation.replace('Home');
        this.props.navigation.navigate('Home');
        // this.props.navigation.goBack(null)
    };

    render() {
        // console.log( this.props.posts._embedded )
        // console.log(typeof  this.props.posts._embedded );
        const { date, id } = this.props.posts;


        const commentCtrl = commentCount(this.props.posts);

        // const likeCtrl = likeCount(this.props.posts);

        const authorInfo_ = authorInfo(this.props.posts);

        const time = moment(date || moment.now()).fromNow();

        let newTitle;

        newTitle = this.props.posts.title ? this.props.posts.title.rendered : "";

        if (((newTitle).trim() != "") && ((newTitle).trim() != "Copy")) {
            newTitle = this.props.posts.title.rendered;
        }

        let newExcerpt;
        newExcerpt = this.props.posts.excerpt ? this.props.posts.excerpt.rendered : "";
        if (((newExcerpt).trim() != "") && ((newExcerpt).trim() != "Copy")) {
            newExcerpt = newExcerpt.replace(/\n/g, "");
            newExcerpt = newExcerpt.replace(/(<([^>]+)>)/g, "");
            newExcerpt = newExcerpt.substr(0, 250) + ' ...';

        } else {
            newExcerpt = "  ";
        }

        // console.log(this.props.posts);
        // console.log(title.rendered);
        // console.log(this.props.posts.content.rendered);
        return (
            <Container >
                <Content style={{ padding: 5, backgroundColor: "#F0F1F5" }}>
                    <TouchableHighlight useForeground onPress={() => this.props.navigation.navigate('DetailBlog', { post: this.props.posts })} >
                        <Card >
                            <CardItem>

                                <Body style={styles.BlogTitleBody}>
                                    <Text style={styles.BlogTitle}>{newTitle}</Text>
                                </Body>

                            </CardItem>


                            <CardItem cardBody>
                                <Image
                                    indicatorProps={{
                                        size: 80,
                                        borderWidth: 0,
                                        color: 'rgba(150, 150, 150, 1)',
                                        unfilledColor: 'rgba(200, 200, 200, 0.2)'
                                    }} source={{ uri: fetchMediaInfo(this.props.posts) }} style={{ height: height / 3.9, width: null, flex: 1 }} />
                            </CardItem>


                            <CardItem>
                                <Body>
                                   
                                        <Text style={styles.excerptStyle}>{newExcerpt}</Text>
                                   
                                </Body>
                            </CardItem>

                            <CardItem >
                                <Body >
                                    {this.listOkuOgren(this.props.posts)}
                                </Body>
                            </CardItem>

                            <CardItem>
                                <AuthorActivityComponent key="x438PvfEH" id={id} title={newTitle} time={time} commentCtrl={commentCtrl} likeEvent={this.props.likeEvent}
                                authorInfo_={authorInfo_} likeTotalCount={this.props.posts.totalLike} meLike={this.props.posts.meLike} navigation={this.props.navigation} />
                            </CardItem>

                        </Card>
                    </TouchableHighlight>
                </Content>

                <Footer>
                    <FooterTab style={styles.footerContainer}>
                        <ButtonN badge vertical>
                            <Badge><Text>{commentCtrl} </Text></Badge>
                            <Icon style={styles.footerICON} name="text" />
                            <Text style={styles.footerICONtext} >Yorumlar</Text>
                        </ButtonN>

                        <ButtonN badge vertical>
                            <Badge><Text>{this.props.isPostCounter} </Text></Badge>
                            <Icon style={styles.footerICON} name="heart" />
                            <Text style={styles.footerICONtext} >Beğeniler</Text>
                        </ButtonN>


                        <ButtonN vertical onPress={() => this._onPress()}  >
                            <Icon style={styles.footerICON} name="arrow-back" />
                            <Text style={styles.footerICONtext}>Geri dön</Text>
                        </ButtonN>
                    </FooterTab>
                </Footer>

            </Container>
        );
    }
}


const styles = {
    container: {
        flex: 1,
        // flexDirection: "row",
        borderRadius: 12,
        // overflow: 'hidden',
        margin: 5
        // width: Dimensions.get('window').width - 50,
    },


    BlogTitleBody: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",

    },
    BlogTitle: {
        fontFamily: 'opensans-bold',
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 2,
        marginBottom: 2,
    },


    OkuVideoQuiz: {
        flex: 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'


    },

    videoContainerBtn: {
        margin: 3,
        padding: 3,
        // width:50,
        // height:50,
        // overflow:'hidden',
        flex: 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
        // justifyContent:'space-between'

    },


    excerptStyle: {
        color: "#000",
        marginBottom: 8,
        fontFamily: 'opensans-semibold',
        fontWeight: 'normal',
        fontSize: 14
    },

    // htmlViewContainer: {
    //     flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    //     width: Dimensions.get('window').width - 50,
    //     fontFamily: 'opensans-semibold',
    //     fontWeight: 'normal',
    //     marginTop: 5,
    //     marginBottom: 5,
    //     color: "red"
    // },
    cardStyle: {
        flex: 1,
        padding: 10,

    },
    timeStyle: {
        margin: 5,
        fontStyle: 'italic',
        color: '#b2bec3',
        fontSize: 10
    },

    footerContainer: {
        width: '100%',
        ...Platform.select({
            android: {
                backgroundColor: "#fff",
                borderTopColor: '#ddd',
                borderTopWidth: 1.2,
                shadowColor: 'black',
                shadowOffset: { height: 1, width: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 4,

            },
        })
    },
    
    footerICON: {
        ...Platform.select({
            android: {

                color: "#9fa0a5",

            },
        })
    }, 

    footerICONtext: {
        ...Platform.select({
            android: {

                color: "#000",
                textTransform: 'capitalize',
                fontSize: 13
            },
        })
    }


};


//	this.props.loginCtrl(responseJson.user_email, responseJson.user_display_name, responseJson.user_nicename, responseJson.token, responseJson.user_id);;


const mapStateToProps = (state) => {
    return {
        isEmail: state.isEmail,
        isDisplayname: state.isDisplayname,
        isNicename: state.isNicename,
        isToken: state.isToken,
        isFirstToken: state.isFirstToken,
        loginError: state.loginError,
        isLoginPending: state.isLoginPending,
        isLoginSuccess: state.isLoginSuccess,
        userName: state.userName,
        userID: state.userID,
        isPostCounter: state.isPostCounter
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setPostCounter: (totalLike) => dispatch(setPostCounter(totalLike)),

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogListComponent);