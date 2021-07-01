import React, { Component } from 'react';
import { Text, View, Image ,KeyboardAvoidingView, TouchableOpacity, TextInput,ScrollView } from 'react-native';
import { clientConfig } from './../../constants/clientConfig';
import {  userProfilInformation } from './../../redux/reducer';
import { WSnackBar } from 'react-native-smart-tip'
import { connect } from 'react-redux';
import styles from './styles';

import KeyboardSpacer from 'react-native-keyboard-spacer';

class Login extends Component {

	static navigationOptions = ({ navigation }) => ({
		title: 'Üye Girişi',
	});

	constructor(props) {
		super(props)
		this.state = { 
			msjNotice: null,
			userToken: '',
			userName: '',
			userPassword: '',
			showToast: false,
			err: true,
		}

	}


	_login = () => {
		this.loginApiRequest();
	}



	wSnackBarShow = (msg) => {
		const snackBarOpts = {
			data: msg,
			position: WSnackBar.position.TOP, // 1.TOP 2.CENTER 3.BOTTOM
			duration: WSnackBar.duration.SHORT, //1.SHORT 2.LONG 3.INDEFINITE
			textColor: '#ff490b',
			backgroundColor: '#050405',
			actionText: 'Tamam',
			actionTextColor: '#ff490b',
			actionClick: () => {
				// Click Action
			},
		}

		WSnackBar.show(snackBarOpts)
	}

	loginApiRequest = () => {
		let { userName, userPassword } = this.state;
	
		const routerName = this.props.navigation.getParam('routerName', '');
		const pid = this.props.navigation.getParam('pid', '');
		const title = this.props.navigation.getParam('title', '');
		const likeEvent = this.props.navigation.getParam('likeEvent', false);
		const LoginUrl = clientConfig.LoginUrl;
		if (userName == "") {
			this.setState({ msjNotice: 'Lütfen kullanıcı adınızı giriniz' });
		
			this.wSnackBarShow( 'Lütfen kullanıcı adınızı giriniz');
			// this.setState({ msjNotice: 'Please enter Email address' })
		}
		else if (userPassword == "") {
			// this.setState({ msjNotice: 'Please enter password' })
			this.setState({ msjNotice: 'Lütfen şifrenizi giriniz' });
		
			this.wSnackBarShow('Lütfen şifrenizi giriniz');
		}

		else {
			this.setState({ msjNotice: '' });
	
			const formData = new FormData();
			formData.append('username', userName);
			formData.append('password', userPassword);
			fetch(LoginUrl, {
				method: 'POST',
				header: {
					'Content-Type': 'multipart/form-data',
					'Accept': 'application/json',
				},
				body: formData,
			})
				.then((responseJson) => responseJson.json())
				.then((responseJson) => {
					if (responseJson.token != undefined) {
						this.setState({ userToken: responseJson.token });
			
						// TODO: buranın async olmas mı doğru olur bak 
					
								setTimeout(

									function () {
										this.props.userProfilInformation(responseJson.user_id, responseJson.user_email, responseJson.description, responseJson.registered_date, responseJson.user_nicename, responseJson.webSite, responseJson.user_display_name, responseJson.avatar120);
					
										

									}.bind(this),

									300
								);

						this.setState({ msjNotice: "Giriş yapıldı" });
						this.wSnackBarShow();
						this.props.navigation.navigate(routerName, { postId: pid,'title':title,'likeEvent':likeEvent})
					}
					else {
						this.setState({ msjNotice: "Kullanıcı adı veya şifreniz yanlıştır" });
						this.wSnackBarShow();

					}
				})
				.catch((error) => {
					console.error(error);
				});
		}
	};


	render() {

		return (
			<ScrollView style={styles.container}>
				<View style={styles.logoContainer}>
					<Image style={styles.logo} source={require("../../assets/images/avatar.png")} />
					<Text style={styles.title}>Üye Girişi</Text>
				</View>

				<View style={styles.formContainer}>

					<KeyboardAvoidingView behavior="padding" enabled>

						<View style={styles.container2}>

							<Text style={{ padding: 5,  color: 'red' }}>{this.state.msjNotice}</Text>

							<Text style={{ padding: 5, color: 'white' }}>Kullanıcı adı</Text>

							<TextInput underlineColorAndroid="transparent" returnKeyType="next" autoCorrect={false} autoCapitalize='none' placeholder="Kullanıcı adınız" style={styles.input}
								onChangeText={userName1 => this.setState({ userName: userName1 })}
								value={this.state.userName}
								 onSubmitEditing={() => this.passwordInput.focus()} />

							<Text style={{ padding: 5, color: 'white' }}>Şifre</Text>
							<TextInput underlineColorAndroid="transparent" returnKeyType="go" autoCorrect={false} autoCapitalize='none' placeholder="Şifreniz" style={styles.input}
								secureTextEntry ref={(input) => this.passwordInput = input}
								value={this.state.userPassword}
								onChangeText={userPassword1 => this.setState({ userPassword: userPassword1 })} />

			

							<TouchableOpacity style={styles.buttonContainer} onPress={() => { this._login() }}>
								{/* <TouchableOpacity style={styles.buttonContainer} onPress={()=>{  this.login2()}}> */}
								<Text style={styles.buttonText}>Giriş Yap</Text>
							</TouchableOpacity>

							<TouchableOpacity style={[styles.buttonContainer, styles.buttonExtra]}
								onPress={() => this.props.navigation.navigate('Register', { firstToken: this.state.firstToken })}>
								<Text style={styles.buttonText}>Üye Ol</Text>
							</TouchableOpacity>

							{Platform.OS === 'ios' ?  <KeyboardSpacer />  : <View></View>   }

						</View>
					</KeyboardAvoidingView>


				</View>
			</ScrollView>
		);
	}
}



const mapStateToProps = (state) => {
	return {
		isFirstToken: state.isFirstToken,
		isLoginSuccess: state.isLoginSuccess,
	};
}




const mapDispatchToProps = (dispatch) => {
	return {

		userProfilInformation: (userID, email, userDescription, userRegisteredDate, userNickname, userWebSite, userNameLastname, avatar) => dispatch(userProfilInformation(userID, email, userDescription, userRegisteredDate, userNickname, userWebSite, userNameLastname, avatar))

	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
