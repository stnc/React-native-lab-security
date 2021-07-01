import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  Tab, Tabs, Container } from 'native-base';
import AboutComponentGiris from './AboutComponentGiris';
import AboutComponentOnsoz from './AboutComponentOnsoz';
import AboutComponentKaynak from './AboutComponentKaynak';

class About extends Component {
	static navigationOptions = ({ navigation }) => ({
		title: 'Laboratuvar Güvenliği',
	});

	constructor(props) {
		super(props);

	}

	render() {
		return (
			<Container>
				{/* <Header hasTabs /> */}
				<Tabs tabBarUnderlineStyle={{  borderTopColor: '#0091EA',
                borderTopWidth: 2.5}}>
					<Tab tabStyle={{backgroundColor:'#fff'}} activeTabStyle={{backgroundColor:'#f6f8fa' }}  textStyle={{color:"#9fa0a5"}} activeTextStyle={{color:'#0091EA'}} 	 heading="Hakkında">
						<AboutComponentGiris />
					</Tab>

					<Tab tabStyle={{backgroundColor:'#fff'}} activeTabStyle={{backgroundColor:'#f6f8fa' }}  textStyle={{color:"#9fa0a5"}} activeTextStyle={{color:'#0091EA'}} heading="Önsöz">
						<AboutComponentOnsoz />
			
					</Tab>
					<Tab tabStyle={{backgroundColor:'#fff'}} activeTabStyle={{backgroundColor:'#f6f8fa' }}  textStyle={{color:"#9fa0a5"}} activeTextStyle={{color:'#0091EA'}} heading="Kaynaklar">
							<AboutComponentKaynak />



					</Tab>
				</Tabs>
			</Container>
		)
	}
}


const mapStateToProps = (state) => {
	return {
		isLoginPending: state.isLoginPending,
		isLoginSuccess: state.isLoginSuccess,
		loginError: state.loginError
	};
}


export default connect(mapStateToProps, null)(About);



