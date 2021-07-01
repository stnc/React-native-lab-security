import React from 'react';
import { View, TouchableHighlight, Text, Dimensions, Image, Alert } from 'react-native';
import moment from 'moment';
import { Button, Card, Icon } from 'native-base';

import AuthorActivityComponent from './AuthorActivityComponent';
import { fetchMediaInfo, commentCount, likeCount, authorInfo } from './postFunc';
import Divider from './../../components/elements/Divider';
import { connect } from 'react-redux';
// import HTML from 'react-native-render-html';

class BlogListComponentFORFlatList extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: "İçerik Detay",
            headerLeft: (
                <Button
                    title="< Back"
                    onPress={() => navigation.navigate('Book')}
                />
            ),
        }
    }

    isUserLoginAlert = (routerName, propsName) => {
        let propsData = { post: this.props.posts };
        if (routerName == "VideoTab") {
            propsData = { videoLink: propsName };
        }

        if (!this.props.isLoginSuccess) {
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
            <View style={[styles.videoContainer]}>
                {oku}
                {exportQuiz}
                {exportYoutube}
            </View>
        );
    }



    render() {
        // console.log( this.props.posts._embedded )
        // console.log(typeof  this.props.posts._embedded );
        const { date, id } = this.props.posts;

        const { BlogTitle } = styles;

        const commentCtrl = commentCount(this.props.posts);

        const likeCtrl = likeCount(this.props.posts);

        const authorInfo_ = authorInfo(this.props.posts);

        const time = moment(date || moment.now()).fromNow();

        let newTitle;

        newTitle = this.props.posts.title ? this.props.posts.title.rendered : "";
        /*
                if (((newTitle).trim() != "") && ((newTitle).trim() != "Copy")) {
                    newTitle = title.rendered;
                } 
        */
        let newExcerpt;
        newExcerpt = this.props.posts.excerpt ? this.props.posts.excerpt.rendered : "";
        if (((newExcerpt).trim() != "") && ((newExcerpt).trim() != "Copy")) {
            newExcerpt = newExcerpt.replace(/\n/g, "");
            newExcerpt = newExcerpt.replace(/(<([^>]+)>)/g, "");
            newExcerpt = newExcerpt.substr(0, 150) + ' ...';

        } else {
            newExcerpt = "  ";
        }

        // console.log(this.props.posts);
        // console.log(title.rendered);
        // console.log(this.props.posts.content.rendered);
        return (

            <View style={styles.container}>
                <TouchableHighlight useForeground onPress={() => this.props.navigation.navigate('DetailBlog', { post: this.props.posts })} >
                    <Card>
                        <Image source={{ uri: fetchMediaInfo(this.props.posts) }} style={{ height: 200, width: null, flex: 1 }} />
                        <View style={styles.cardStyle}>
                            {/* <Text style={BlogTitle}>{newTitle.toUpperCase()}  </Text>   */}
                            <Text style={BlogTitle}>{newTitle}  </Text>
                            <Divider style={{ height: 1, backgroundColor: '#e1e8ee', shadowColor: "rgba(0,0,0,.2)" }} />

                            <View style={[styles.htmlViewContainer]}>
                                {/* <HTML html={newExcerpt} imagesMaxWidth={Dimensions.get('window').width} /> */}
                                <Text style={{ color: "#9DA3B4", marginBottom: 8 }}>{newExcerpt}</Text>
                            </View>
                            <Divider style={{ height: 1, backgroundColor: '#e1e8ee', shadowColor: "rgba(0,0,0,.2)" }} />

                            {this.listOkuOgren(this.props.posts)}

                            <Divider style={{ height: 1, backgroundColor: "#e1e8ee" }} />
                            <AuthorActivityComponent key="x438PvfEH" id={id} time={time} commentCtrl={commentCtrl} authorInfo_={authorInfo_} likeTotalCount={likeCtrl} navigation={this.props.navigation} />
                        </View>
                    </Card>
                </TouchableHighlight>
            </View>
        );
    }
}


const styles = {
    container: {
        flex: 1,
        borderRadius: 12,
        overflow: 'hidden',
        margin: 5
        // width: Dimensions.get('window').width - 50,
    },


    BlogTitle: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
        fontFamily: 'opensans-bold',
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 5,
        marginBottom: 5,
    },
    htmlViewContainer: {
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
        width: Dimensions.get('window').width - 50,

        fontFamily: 'opensans-semibold',
        fontWeight: 'normal',
        marginTop: 5,
        marginBottom: 5,
        color: "red"
    },
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
    videoContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    videoContainerBtn: {
        margin: 3
    },
    videoContainerText: {
        paddingRight: 8,
        color: '#000'
    },


};



const mapStateToProps = (state) => {
    return {
        isEmail: state.isEmail,
        isDisplayname: state.isDisplayname,
        isNicename: state.isNicename,
        isToken: state.isToken,
        loginError: state.loginError,
        isLoginPending: state.isLoginPending,
        isLoginSuccess: state.isLoginSuccess,
        userName: state.userName
    };
}



export default connect(mapStateToProps, null)(BlogListComponentFORFlatList);