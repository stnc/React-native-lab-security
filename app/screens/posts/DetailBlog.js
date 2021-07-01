import React, { Component } from 'react';
import { Dimensions,   StyleSheet, SafeAreaView,  View, YellowBox,  } from 'react-native';
import { Container, Footer, FooterTab, Icon, Content, Badge, Text, Button as ButtonN } from 'native-base';


import {  Divider, Block, Text as TextStnc } from './../../components/elements';
import { theme } from './../../constants';
import HTML from 'react-native-render-html';
import { fetchMediaInfo, authorInfo, commentList } from './postFunc';
import { commentCount, likeCount } from './postFunc';
const { width, height } = Dimensions.get('window');
import AuthorActivityDetailComponent from './components/AuthorActivityDetailComponent';
import moment from 'moment';
import Image from 'react-native-image-progress';
import { connect } from 'react-redux';

// import Login from './../login/Login';
// import CommentsCompenent from './components/CommentsCompenent';
// import CommentAdd from './components/CommentAdd';
// import GalleryComponent from './components/GalleryComponent';
// import { connect } from 'react-redux';
class DetailBlog extends Component {
    static navigationOptions = ({ navigation }) => {
         return {
             headerTitle: 'İçerik Detayı',
            /* 
            headerRight: (
                 <Button
                     onPress={() => alert('This is a button!')}
                     title="Info"
                     color="#fff"
                 />
             )
             */
         }
     }
    constructor(props) {
        super(props);
        const post = props.navigation.getParam('post', 'NO-ID');
        this.state = {
            text: undefined, // user's input
            replies: commentList(post),
            fabActive: false
        }
    }

    _onPress = () => {
        // this.props.navigation.replace('Home');
        // this.props.navigation.navigate('Home');
        this.props.navigation.goBack(null)
    };


    // Update state when input changes
    onChangeText = (text) => this.setState({ text });

    // Handle return press on the keyboard
    // NOTE: You don't really need it for this example, because
    // we're using a keyboard without return button, but I left it here
    // in case you'd want to switch to a different keyboard
    onSubmitEditing = (
        { nativeEvent: { text } }) =>
        this.setState({ text },
            this.submit);

    // Call this.props.onSubmit handler and pass the comment
    submit = () => {
        const { text } = this.state;
        if (text) {
            this.setState({ text: undefined }, () => this.props.onSubmit(text));
        } else {
            alert('Please enter your comment first');
        }
    };


    render() {
        const { navigation } = this.props;

        const post = navigation.getParam('post', 'empty');

     
        const time = moment(post.date || moment.now()).fromNow();

        let commentCtrl = commentCount(post);


        let authorInfo_ = authorInfo(post);


        if (typeof commentCtrl === "undefined") {
            commentCtrl = 0;
        } else {
            commentCtrl = commentCtrl;
        }






//eğer login kontrolu olcaksa bu açık olacak 
/*
      
        if (!this.props.isLoginSuccess) {
            return (
                <Login navigation={this.props.navigation} />
                // this.props.navigation.navigate('Login',{ post: this.props.posts })
            )
        }
        */
        return (
            <Container>
                <Content>
                    <SafeAreaView showsVerticalScrollIndicator={false}>

                  

<Image 
  indicatorProps={{
    size: 80,
    borderWidth: 0,
    color: 'rgba(150, 150, 150, 1)',
    unfilledColor: 'rgba(200, 200, 200, 0.2)'
  }} source={{ uri: fetchMediaInfo(post) }} style={{ height: height / 3.9, width: null, flex: 1 }} />


                        <Block style={styles.product}>
                            <TextStnc h2 bold>{post.title.rendered}</TextStnc>
                            {/* 
                            ///tag özelliği ilerde eklencek 
                            <Block flex={false} row margin={[theme.sizes.base, 0]}> */}
                            {/* {product.tags.map(tag => (
              <TextStnc key={`tag-${tag}`} caption gray style={styles.tag}>
                {tag}
              </TextStnc>
            ))} */}
                            {/* <TextStnc key="sd" caption gray style={styles.tag}>
                                    hasan
                                 </TextStnc>

                                <TextStnc key="swd" caption gray style={styles.tag}>
                                    ali veli
                               </TextStnc> */}

                            {/* </Block> */}
                            {/* <TextStnc gray light height={22}>{post.content.rendered}</TextStnc> */}
                            {/* <TextStnc gray light height={22}>{post.content.rendered.replace(/(<([^>]+)>)/g, "")}</TextStnc> */}

                            <HTML html={post.content.rendered} imagesMaxWidth={Dimensions.get('window').width} />
                       
                            <Divider margin={[theme.sizes.padding * 0.9, 0]} />

                            <View style={{ alignItems: 'center', flex: 1, flexDirection: 'row' }}>
                                <AuthorActivityDetailComponent time={time} authorInfo_={authorInfo_} />
                            </View>

                            <Divider margin={[theme.sizes.padding * 0.9, 0]} />

                            {/* <GalleryComponent post={post} /> */}

                        </Block>


                        {/* TODO: yorumlar geçiçi olarak kapatılacak hepsiburada uygulamasının yorumlarına bakılacak */}
                        {/*   <View style={{ alignItems: 'center', flex: 1, flexDirection: 'row' }}>
                                <CommentAdd />
                         </View>


                       <FlatList
                            data={this.state.replies}
                            renderItem={({ item }) => <CommentsCompenent time={post.date} repliesList={item} />}
                            keyExtractor={item => `step-${item.id}`}
                            onEndReachedThreshold={50}
                        /> */}

                    </SafeAreaView>
                </Content>

                <Footer>
                    <FooterTab  style={styles.footerContainer}>
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


        )
    }
}





const styles = StyleSheet.create({
    product: {
        paddingHorizontal: theme.sizes.base * 1,
        paddingVertical: theme.sizes.padding,
        borderWidth:1.5,
        borderColor:'#ddd',
        shadowRadius:1,
        shadowColor:"#ddd",
        margin:5
    },
    tag: {
        borderColor: theme.colors.gray2,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: theme.sizes.base,
        paddingHorizontal: theme.sizes.base,
        paddingVertical: theme.sizes.base / 2.5,
        marginRight: theme.sizes.base * 0.625,
    },
    image: {
        width: width / 3.26,
        height: width / 3.26,
        marginRight: theme.sizes.base,
    },
    more: {
        width: 55,
        height: 55,
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
})




YellowBox.ignoreWarnings([
    'Warning: componentWillMount is deprecated',
    'Warning: componentWillReceiveProps is deprecated',
    'Module RCTImageLoader requires',
]);




const mapStateToProps = (state) => {
	return {
    /*	
    isFirstToken: state.isFirstToken,
		loginError: state.loginError,
		isLoginPending: state.isLoginPending,
		isLoginSuccess: state.isLoginSuccess,
		isEmail: state.isEmail,
		userID: state.userID,
		userToken: state.userToken,
		userDescription: state.userDescription,
		userRegisteredDate: state.userRegisteredDate,
		userNickname: state.userNickname,
		userWebSite: state.userWebSite,
		userNameLastname: state.userNameLastname,
        userAvatar: state.userAvatar,
        */
        isPostCounter: state.isPostCounter
	};
}


const mapDispatchToProps = (dispatch) => {
    return {
        setPostCounter: (totalLike) => dispatch(setPostCounter(totalLike)),

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailBlog);

// export default DetailBlog;