import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Button } from 'react-native';
import Util from './Utils'
import Video from 'react-native-video';
import Login from './login/Login';
import { connect } from 'react-redux';

class VideoScreen extends Component {
	constructor(props) {
		super(props);
		this.onLayout = this.onLayout.bind(this);

		const { navigation } = this.props;
		this.videoLink = navigation.getParam('videoLink', 'no data');
		console.log(this.videoLink)
		console.log(this.props)
	}

	
	// BUG: b fonksyon iptal edilecek 
	//componentDidMount
	UNSAFE_componentWillMount() {
		this.resizeVideoPlayer();
	}

	render() {

		if (!this.props.isLoginSuccess) {
            return (
                <Login navigation={this.props.navigation} />
                // this.props.navigation.navigate('Login',{ post: this.props.posts })
            )
        }
		return <View style={{ flex: 1 }}
			onLayout={this.onLayout}
			style={styles.container}>
			<Video
				ref={p => { this.videoPlayer = p; }}
				source={{ uri: this.videoLink[0] }}
				style={{ width: this.state.orientationWidth, height: this.state.orientationHeight }}
				controls={true}
			/>
			<Button title="full screen" onPress={this.onPress.bind(this)}></Button>
		</View>
	}
	onPress() {
		if (this.videoPlayer != null)
			this.videoPlayer.presentFullscreenPlayer();
	}
	resizeVideoPlayer() {
		// Always in 16 /9 aspect ratio
		let { width, height } = Dimensions.get('window');
		if (Util.isPortrait()) {
			this.setState({
				orientationWidth: width * 0.8,
				orientationHeight: width * 0.8 * 0.56,
			});
		} else {
			this.setState({
				orientationHeight: height * 0.8,
				orientationWidth: height * 0.8 * 1.77
			});
		}
	}
	onLayout(e) {
		this.resizeVideoPlayer();
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#000',
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
});


const mapStateToProps = (state) => {
	return {
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
	};
}


export default connect(mapStateToProps, null)(VideoScreen);
