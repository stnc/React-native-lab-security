// BUG: buraya şifre girerken şifre iki defa girilmeli tek olursa doğrulama olmaz
// BUG: çok ciddi buglar var üye olurken bazı kontrolleri atlatabiliyor satır 63 
// FIX: inline css ??? 
import React, { Component } from 'react';
import { Image, Text, KeyboardAvoidingView, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { clientConfig } from './../../constants/clientConfig';
import { connect } from 'react-redux';
import { userProfilInformation } from './../../redux/reducer';
import styles from './styles';
// import Profile from './Profile';
import { WSnackBar } from 'react-native-smart-tip'



	import KeyboardSpacer from 'react-native-keyboard-spacer';
  

class Register extends Component {
	static navigationOptions = ({ navigation }) => ({
		title: 'Üye Ol',
		// headerRight:
		// 	<TouchableOpacity
		// 		onPress={() => navigation.navigate('Home')}
		// 		style={{ margin: 5, backgroundColor: '#000', padding: 5 }}>
		// 		<Text style={{ color: '#ffffff',fontSize:9 }}>Anasayfa</Text>
		// 	</TouchableOpacity>

	});

	constructor(props) {
		super(props)
		this.state = {
			msjNotice: null,
			err: true,
			userName: '',
			userEmail: "",
			userPassword: "",
			passwordInputRepeat:"",
			firstName: "",
			lastName: "",
			isINLoginSuccess: false,
			userNameStep: false,
			userEmailStep: false,
			userBtn: false


		}
	}

	//kullancı login olmuş mu daha önceden onun içindir 
	getSnapshotBeforeUpdate = (prevProps) => {
		// return { notifyRequired: prevProps.text !== this.props.text };
		if (prevProps.isLoginSuccess !== this.props.isLoginSuccess) {
			return true;
		}
		return false;
	};



	componentDidUpdate = (prevProps, prevState, snapshot) => {
		if (snapshot) {
			//    console.log("quiz componentDidUpdate run")
			// this.props.navigation.replace('Register');
			// this.props.navigation.navigate('ProfileTab');
			this.props.navigation.navigate('Home');

		}
	};

	_register = () => {
		this.userRegister();

		// setTimeout(
		// 	function () {
		// 		this.userRegister();
		// 	}.bind(this),
		// 	300
		// );
	
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


	validateEmail = (email) => {
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	}


	validateUserEmail = (email) => {
		this.setState({ 'userEmail': email })
		if (!this.validateEmail(email)) {
			this.setState({ msjNotice: 'Lütfen geçerli bir email adresi giriniz' });
			this.setState({ err: true });
			this.wSnackBarShow('Lütfen geçerli bir email adresi giriniz');
		}
	}



	validateUsername = () => {
		let str = this.state.userName;
		this.setState({ userName: str.trim() });
		var error = "";
		var illegalChars = /\W/; // allow letters, numbers, and underscores
		if ((str.length < 5) || (str.length > 15)) {
			// error = "Username must have 5-15 characters";
			error = "Kullanıcı adınız 5 ile 15 karakter arasında olmalıdır ve  Kullanıcı adınızda türkçe karakter ve uygunsuz karakter olmamalıdır";
		} else if (illegalChars.test(str)) {
			//   error = "Please enter valid Username. Use only numbers and alphabets";
			error = "Kullanıcı adınızda türkçe karakter ve değişik karakter olmamalıdır";
		} else {
			error = "";
		}
		return error;
	}

	// BUG: çok ciddi buglar var üye olurken bazı kontrolleri atlatabiliyor
	userRegister = () => {
		const { firstName } = this.state;
		const { lastName } = this.state;
		const { userName } = this.state;
		const { userEmail } = this.state;
		const { userPassword } = this.state;
		const { passwordInputRepeat } = this.state;

		const RegisterUrl = clientConfig.RegisterUrl;

		if (firstName === "") {
			this.setState({ msjNotice: 'Lütfen  adınızı giriniz' });
			this.setState({ err: true });
			this.wSnackBarShow('Lütfen  adınızı giriniz');
		}

		else if (lastName === "" && this.state.err) {
			this.setState({ msjNotice: 'Lütfen soyadınızı giriniz' });
			this.setState({ err: true });
			this.wSnackBarShow('Lütfen soyadınızı giriniz');
		}


		else if (userName === "" && this.state.err) {
			this.setState({ msjNotice: 'Lütfen kullanıcı adınızı giriniz' });
			this.setState({ err: true });
			this.setState({ userNameStep: true });
			this.wSnackBarShow('Lütfen kullanıcı adınızı giriniz');
		}


		else if (this.state.userNameStep && this.state.err) {
			if (this.validateUsername() != "") {
				this.setState({ msjNotice: this.validateUsername() });
				this.setState({ err: true });
				this.setState({ userNameStep: true });
				this.wSnackBarShow(this.validateUsername());
			} else {
				this.setState({ userNameStep: false });
			}
		}


		else if (userEmail === "" && this.state.err) {
			this.setState({ msjNotice: 'Lütfen email adresinizi giriniz' });
			this.setState({ err: true });
			this.setState({ userEmailStep: true });
			this.wSnackBarShow('Lütfen email adresinizi giriniz');
		}

		else if (this.state.userEmailStep && this.state.err) {
			if (!this.validateEmail(userEmail)) {
				this.setState({ msjNotice: 'Lütfen geçerli bir email adresi giriniz' });
				this.setState({ err: true });
				this.setState({ userEmailStep: true });
				this.wSnackBarShow('Lütfen geçerli bir email adresi giriniz');
			} else {
				this.setState({ userEmailStep: false });
			}
		}

		//demo@hotmail.com

		else if (userPassword === "" && this.state.err) {
			this.setState({ msjNotice: 'Lütfen şifrenizi giriniz' });
			this.setState({ err: true });
			this.wSnackBarShow('Lütfen şifrenizi giriniz');
		}
		
		else if (userPassword != passwordInputRepeat && this.state.err) {
			this.setState({ msjNotice: 'Şifreleniz eşleşmiyor kontrol ediniz' });
			this.setState({ err: true });
			this.wSnackBarShow('Şifreleniz eşleşmiyor kontrol ediniz');
		}

		else {
			this.setState({ msjNotice: '' });
			this.setState({ err: false });

			// this.setState({ userBtn: true });
// alert ("top")
		
			const formData = new FormData();
			formData.append('username', userName);
			formData.append('password', userPassword);
			formData.append('email', userEmail);
			formData.append('first_name', firstName);
			formData.append('last_name', lastName);

			const headers = {
				'Authorization': "Bearer " + this.props.isFirstToken,
			//  'Content-Type': 'application/x-www-form-urlencoded',
				'Content-Type': 'multipart/form-data',
				'Accept': 'application/json',
			//	'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
			};
// console.log(headers)
			const data = {
				method: 'POST',
				headers: headers,
				mode: 'cors',
				cache: 'default',
				body: formData,
			};
			// console.log(data)
			fetch(RegisterUrl, data)
			.then((response) => {
                return response.json();
              })
			.then((responseJson) => {
				console.log("istek gidiyor")
				console.log(responseJson)
				if (responseJson.code) {
					if (responseJson.message == "Invalid parameter(s): email") {
						this.setState({ msjNotice: 'Email adresiniz geçersizdir' });
					}
					if (responseJson.message == "Sorry, that username already exists!") {
						this.setState({ msjNotice: 'Böyle bir kullancı adınız zaten vardır' });
					}
					if (responseJson.message == "Sorry, that email address is already used!") {
						this.setState({ msjNotice: 'Böyle bir email adresi zaten vardır' });
					}
					if (responseJson.message == "Invalid parameter(s): username") {
						this.setState({ msjNotice: 'Kullanıcı adınız geçersiz' });
					}
				}
			//  else if (responseJson.id) {
				else {
			
		



					setTimeout(
						function () {
							this.props.userProfilInformation(responseJson.id, responseJson.email, responseJson.description, responseJson.registered_date, responseJson.nickname, responseJson.url, responseJson.name, responseJson.avatar_urls[48]);

						}.bind(this),
						300
					);

					// this.props.navigation.navigate("ProfileTab")

					// this.setState({ userBtn: false });

					this.setState({ msjNotice: 'Üyelik yapıldı' });
					this.wSnackBarShow('Üyelik yapıldı');
					this.setState({ isINLoginSuccess: true });

					this.props.navigation.navigate('Home');


				}
			})
				.catch(error => {
					this.setState({ loading: false, refreshing: false });
				});

		}
	}


	render() {

		return (
			<ScrollView style={styles.container}>

				<View style={styles.logoContainer}>
					<Image style={styles.logo} source={require("../../assets/images/avatar.png")} />
					<Text style={styles.title}>Üye OL</Text>
				</View>

				<View style={styles.formContainer}>
					<KeyboardAvoidingView behavior="padding" enabled>
						<View style={styles.container2}>
							<Text style={{ padding: 5, color: 'red' }}>{this.state.msjNotice}</Text>

							<Text style={styles.inputText}>Adınız </Text>
							<TextInput
								placeholder="Adınızı giriniz" style={styles.input} autoCorrect={false} autoCapitalize='none'
								underlineColorAndroid="transparent" returnKeyType="next" onSubmitEditing={() => this.lastNameInput.focus()}
								value={this.state.firstName}
								onChangeText={firstName => this.setState({ firstName })}
							/>

							<Text style={styles.inputText}>Soyadınız</Text>
							<TextInput
								placeholder="Soyadınızı giriniz" style={styles.input} autoCorrect={false} autoCapitalize='none'
								underlineColorAndroid="transparent" returnKeyType="next" ref={(input) => this.lastNameInput = input} onSubmitEditing={() => this.userNameInput.focus()}
								value={this.state.lastName} onChangeText={lastName => this.setState({ lastName })}
							/>

							<Text style={styles.inputText}>Kullanıcı adı</Text>
							<TextInput
								placeholder="Kullanıcı adınızı giriniz" style={styles.input} autoCorrect={false} autoCapitalize='none' ref={(input) => this.userNameInput = input}
								underlineColorAndroid="transparent" returnKeyType="next" onSubmitEditing={() => this.emailInput.focus()}
								value={this.state.userName}
								onChangeText={userName => this.setState({ userName })}
							/>


							<Text style={styles.inputText}>Email adresiniz</Text>
							<TextInput underlineColorAndroid="transparent" returnKeyType="next" autoCapitalize='none' autoCorrect={false} placeholder="Email adresiniz" style={styles.input}
								ref={(input) => this.emailInput = input}
								value={this.state.userEmail}

								onChangeText={userEmail => this.setState({ userEmail })}
								onSubmitEditing={() => this.passwordInput.focus()} />


							<Text style={styles.inputText}>Şifreniz</Text>
							<TextInput underlineColorAndroid="transparent" returnKeyType="go" autoCapitalize='none' autoCorrect={false} placeholder="Şifreniz"
								style={styles.input} secureTextEntry ref={(input) => this.passwordInput = input}
								value={this.state.userPassword}  onSubmitEditing={() => this.passwordInputRepeat.focus()}
								onChangeText={userPassword => this.setState({ userPassword })} />

			                   <Text style={styles.inputText}>Şifre Tekrarı</Text>
							<TextInput underlineColorAndroid="transparent" returnKeyType="go" autoCapitalize='none' autoCorrect={false} placeholder="Şifreniz Tekrar"
								style={styles.input} secureTextEntry ref={(input) => this.passwordInputRepeat = input}
								value={this.state.passwordInputRepeat}
								onChangeText={passwordInputRepeat => this.setState({ passwordInputRepeat })} />



  				


							<TouchableOpacity disabled={this.state.userBtn} style={styles.buttonContainer} onPress={() => this._register()}>
								<Text style={styles.buttonText}>Üye Ol</Text>
							</TouchableOpacity>
							{Platform.OS=== "ios" ?  <KeyboardSpacer />  : <View></View>    }
				

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
		// loginError: state.loginError,
		// isLoginPending: state.isLoginPending,
		isLoginSuccess: state.isLoginSuccess,
	};
}
//  console.log(userName)

const mapDispatchToProps = (dispatch) => {
	return {
		userProfilInformation: (userID, email, userDescription, userRegisteredDate, userNickname, userWebSite, userNameLastname, avatar) =>
			dispatch(userProfilInformation(userID, email, userDescription, userRegisteredDate, userNickname, userWebSite, userNameLastname, avatar))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);