import React, { Component } from 'react';
import moment from 'moment';
import 'moment/locale/tr';
import AsyncStorage from '@react-native-community/async-storage';
import { logoutCtrl } from './../redux/reducer';
import { Container, Content, Button, ListItem, Text, Icon, Thumbnail, Left, Body, Right, Card, CardItem } from 'native-base';
import { connect } from 'react-redux';
import Login from './login/Login';
// import { clientConfig } from './constants/clientConfig';
moment.locale('tr');

class Profile extends Component {

	static navigationOptions = ({ navigation }) => ({
		title: 'Profil Bilgilerim',
	});



	constructor(props) {
		super(props)
		this.state = {
			msjNotice: '',
			isFirstToken: '',
			userToken: '',
			hasToken: '',
		}


	}






// static getDerivedStateFromProps(props, state){
//     if( props.isLoginSuccess  === "1" ){
//       return {
//         ...state,
// 		isLoginSuccess: props.isLoginSuccess,
// 		isEmail:props.isEmail
//       }
//     }else{
//       return null
//     }
//   }
	_signOutAsync = async () => {

	

		const asyncStorageKeys = await AsyncStorage.getAllKeys();
		if (asyncStorageKeys.length > 0) {
			await AsyncStorage.clear();
		}

		this.props.logoutCtrl();
		this.props.navigation.navigate('Home');

		
	};

	displayUserDescription() {
		const showHide = this.props.userDescription
		if (showHide != "" && (typeof showHide != "undefined")) {
			return <Card>
				<CardItem>
					<Body>
						<Text>
							{this.props.userDescription}
						</Text>
					</Body>
				</CardItem>
			</Card>
		}
	}
	displayThumbnail() {
		const showHide = this.state.userAvatar
		if (showHide != "" && (typeof showHide != "undefined")) {
			return <Card>
				<CardItem>
					<Body style={{
						justifyContent: "center",
						alignItems: "center",
					}}>
						<Thumbnail large source={{ uri: showHide }} />
					</Body>
				</CardItem>
			</Card>
		}
	}
	render() {

		if (this.props.isLoginSuccess == null || this.props.isLoginSuccess == '0') {
			return (
				<Login navigation={this.props.navigation}/>
			)
		}
		return (
			<Container>
				{/* {this.displayThumbnail()} */}
				<Card>
					<CardItem>
						<Body style={{
							justifyContent: "center",
							alignItems: "center",
						}}>
							<Thumbnail large source={{ uri: this.props.userAvatar }} />
						</Body>
					</CardItem>
				</Card>


				{this.displayUserDescription()}
				<Content>

					<ListItem icon>
						<Left>
							<Button style={{ backgroundColor: "#FF9501" }}>
								<Icon active name="person" />
							</Button>
						</Left>
						<Body>
							<Text>Ad Soyad</Text>
						</Body>
						<Right>
							<Text>{this.props.userNameLastname}</Text>
						</Right>
					</ListItem>

					<ListItem icon>
						<Left>
							<Button style={{ backgroundColor: "#007AFF" }}>
								<Icon active name="mail" />
							</Button>
						</Left>
						<Body>
							<Text>Mail</Text>
						</Body>
						<Right>
							<Text>{this.props.userEmail}</Text>
						</Right>
					</ListItem>

					<ListItem icon>
						<Left>
							<Button style={{ backgroundColor: "#222222" }}>
								<Icon active name="link" />
							</Button>
						</Left>
						<Body>
							<Text>Site</Text>
						</Body>
						<Right>
							<Text>{this.props.userWebSite}</Text>
						</Right>
					</ListItem>

					<ListItem icon>
						<Left>
							<Button style={{ backgroundColor: "#94182B" }}>
								<Icon active name="people" />
							</Button>
						</Left>
						<Body>
							<Text>Kullanıcı adı</Text>
						</Body>
						<Right>
							<Text>{this.props.userNickname}</Text>
						</Right>
					</ListItem>

					<ListItem icon>
						<Left>
							<Button style={{ backgroundColor: "#0B7F3F" }}>
								<Icon active name="calendar" />
							</Button>
						</Left>
						<Body>
							<Text>Üyelik Tarihi</Text>
						</Body>
						<Right>
							{/* <Text>{moment('2019-10-07T20:00:49+00:00').format('MMM Do YY')}</Text> */}
							<Text>{moment(this.props.userRegisteredDate).format('Do MMMM YYYY')}</Text>
						</Right>
					</ListItem>

					<ListItem style={{ marginTop: 20 }} icon>
						<Button style={{padding: 5 }} onPress={() => this._signOutAsync()} full danger>
							<Icon style={{padding: 0,margin:0 }}  active name="close" />
							<Text style={{padding: 0,margin:0 }} >	Çıkış</Text>
						</Button>

						{/* <Button style={{ marginTop: 20 }} onPress={() =>	this.props.navigation.navigate('Home') } full large danger>
							<Icon active name="close" />
							<Text>	home</Text>
						</Button> */}
					</ListItem>

				</Content>
			</Container>


		);
	}
}


const mapStateToProps = (state) => {
	return {
		isFirstToken: state.isFirstToken,
		loginError: state.loginError,
		isLoginPending: state.isLoginPending,
		isLoginSuccess: state.isLoginSuccess,
		userEmail: state.userEmail,
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

const mapDispatchToProps = (dispatch) => {
	return {
		logoutCtrl: () => dispatch(logoutCtrl()),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);



