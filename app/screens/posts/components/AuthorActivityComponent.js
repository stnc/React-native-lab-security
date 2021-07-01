import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { List, ListItem, Left, Right, Thumbnail } from 'native-base';
import { Icon } from 'native-base';
import { connect } from 'react-redux';
import { setPostCounter } from './../../../redux/reducer';
import { clientConfig } from './../../../constants/clientConfig';

class AuthorActivityComponent extends React.Component {

    constructor(props) {
        super(props);
        let likeStateIcon, likeColor
        const { likeTotalCount, meLike } = this.props;
        if (meLike == 'unlike') {
            likeStateIcon = "ios-heart-empty"
            likeColor = "#b2bec3"
        } else {
            likeStateIcon = "ios-heart"
            likeColor = "red"
        }
// console.log(likeTotalCount)
// console.log(this.props.id)
        this.state = {
            isLoginSuccess: false, // user's input
            isToken: null, //token
            likeCountState: likeTotalCount,
            likeStateIcon: likeStateIcon,
            likeColor: likeColor,
        
            isLoginSuccess: this.props.isLoginSuccess
        }


    }
/*
    //kullanıcı giriş yapmışsa ve userID oluşmuşsa video like tetiklenecek
    getSnapshotBeforeUpdate = (prevProps) => {
        if (prevProps.userID !== this.props.userID) {
            return true;
        }
        return false;
    };



    componentDidUpdate = (prevProps, prevState, snapshot) => {
        if (snapshot) {
            const { id } = this.props;
            const likeEvent = this.props.navigation.getParam('likeEvent', false);
            if (likeEvent) {
                this.likeEvent(id)
            }
        }
    };
*/

    componentDidMount = () => {
  
        if (this.props.likeEvent) {
            this.likeEvent( this.props.id)
        }
    }

    likeBtn = () => {
        const { id, title } = this.props;
        //  alert("tetikle 1")
        if (this.props.isLoginSuccess == null || this.props.isLoginSuccess == "0") {

            Alert.alert(
                'Uyarı',
                'Beğeni yapabilmek için lütfen üye olunuz yada giriş yapınız',
                [
                    {
                        text: 'Vazgeç', onPress: () =>
                            "vazgeçildi"
                    },
                    {
                        text: 'Giriş Yap', onPress: () =>
                            this.props.navigation.navigate('LoginTab', { pid: id, 'title': title, 'routerName': 'SinglePostTab', 'likeEvent': true })
                    },
                ]
            );
        } else {




        this.likeEvent(id);




        }
    };

    likeEvent = (id) => {
        // console.log(this.props)
       // if (this.props.isLoginSuccess != null || this.props.isLoginSuccess != '0') {

            const headers = {
                'Authorization': "Bearer " + this.props.isFirstToken,
                // 'Content-Type': 'application/json',
                'Content-Type': 'multipart/form-data'
            };
           
            const formData = new FormData();

            formData.append('user_id', this.props.userID);
            formData.append('post_id', id);

            const url = clientConfig.LikeSet;

            const data = {
                method: 'POST',
                headers: headers,
                mode: 'cors',
                cache: 'default',
                body: formData,
            };

            fetch(url,data)
            .then((response) => {
                return response.json();
              })
                .then((responseJson) => {
                  
                    if (responseJson.status == "like") {
                        Alert.alert(
                            'Bilgi',
                            'Beğendiğiniz için teşekkür ederiz.',
                            [
                                {
                                    text: 'Tamam', onPress: () =>
                                        "vazgeçildi"
                                },
                            ]
                        );
                        this.setState({ likeStateIcon: "ios-heart" });
                        this.setState({ likeColor: "red" });
                        this.props.setPostCounter(responseJson.total);
                    }
                    else if (responseJson.status == "unlike") {
                        // Alert.alert(
                        //     'Bilgi',
                        //     'Teşekkür ederiz.',
                        //     [
                        //         {
                        //             text: 'Tamam', onPress: () =>
                        //                 "vazgeçildi"
                        //         },
                        //     ]
                        // );
                        this.setState({ likeStateIcon: "ios-heart-empty" });
                        this.setState({ likeColor: "#b2bec3" });
                        this.props.setPostCounter(responseJson.total);

                    }
                    else {
                        alert("Beklenmeyen bir hata oluştu");
                        return;
                    };
                    this.setState({ likeCountState: responseJson.total });



                })
                .catch(error => {
                    this.setState({ loading: false, refreshing: false });
                });
      //  }
    }


    _commentSize = (data) => {
        if (data === 0 || typeof data === "undefined") {
            return <Icon ios="ios-text" android="md-text" style={{ color: '#b2bec3' }} />
        }
        return <Icon ios="ios-text" android="md-text" style={{ color: '#0091EA' }} />
    }

    render() {

        const { id, time, commentCtrl,  authorInfo_ } = this.props;

        const { timeStyle } = styles2;

        let authorInfo = this.props.authorInfo_ ? this.props.authorInfo_.avatar_urls[48] : "";

        return (
            <View style={{ alignItems: 'center', flex: 1, flexDirection: 'row' }}>

                <List>
                    <ListItem avatar>
                        <Left>
                            <Thumbnail source={{ uri: authorInfo }} />
                        </Left>

                        <Right style={{ marginTop: 7 }}>
                            <Text style={styles2.authorNameLabel}>{authorInfo_.name}</Text>
                            <Text note style={[timeStyle, styles2.dateLabel]}>{time}</Text>
                        </Right>

                    </ListItem>
                </List>

                <View style={{ flex: 2, flexDirection: 'row-reverse', marginTop: 15 }}>

                    <TouchableOpacity style={[styles2.touchableContainer, styles2.touchableContainerFirst]}>
                        {this._commentSize(commentCtrl)}
                        <Text style={[styles2.valueLabel]}> {commentCtrl}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles2.touchableContainer]}>

                        <Icon ios={this.state.likeStateIcon} onPress={this.likeBtn} android={this.state.likeStateIcon} style={{ color: this.state.likeColor }} />
                        <Text onPress={this.likeBtn} style={[styles2.valueLabel]}> {this.state.likeCountState} </Text>
                    </TouchableOpacity>

                </View>
            </View>
        );
    }
}


const styles2 = {
    p: {
        fontWeight: '300',//
        color: '#FF3366', // pink links
    },
    touchableContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',

    },
    touchableContainerFirst: {

        paddingLeft: 15
    },
    //   icon: {
    //       width: 24,
    //       height: 24,
    //       tintColor: "red",
    //       padding: 0,
    //       margin: 0
    //   },
    valueLabel: {

        fontFamily: 'opensans-semibold',
        fontWeight: 'normal',
        color: '#000',
        //   color: '#b2bec3',
        fontSize: 14,
        marginTop: 4,
        marginHorizontal: 4
    },
    CommentText: {

        fontFamily: 'opensans-semibold',
        fontWeight: 'normal',
        color: '#000',
        //   color: '#b2bec3',
        fontSize: 14,
        marginTop: 15,
        marginBottom: 15,
        paddingLeft: 15,
        paddingRight: 10
    },


    timeStyle: {
        margin: 5,
        fontStyle: 'italic',
        color: '#b2bec3',
        fontSize: 10
    },

    authorInfoContainer: {
        marginLeft: 16,
    },
    authorPhoto: {
        margin: 0,
    },
    authorNameLabel: {
        fontFamily: 'opensans-semibold',
        fontWeight: 'normal',
        marginLeft: 15
    },

    dateLabel: {
        fontFamily: 'opensans-semibold',
        fontWeight: 'normal',
    },
};


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
        userID: state.userID
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setPostCounter: (totalLike) => dispatch(setPostCounter(totalLike)),
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(AuthorActivityComponent);

