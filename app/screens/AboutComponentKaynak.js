import React, { Component } from 'react';

import { View, Text, Dimensions, SafeAreaView, ScrollView ,Linking} from 'react-native';
import { Card } from 'native-base';
// import produce from 'immer';

// constructor()
// render
// componentDidMount()

export default  class AboutComponentKaynak extends Component {


	render() {
		// console.log(this.state)
		const { BlogTitle } = styles;
		// console.log("render")
		return (

			<SafeAreaView style={styles.containerTop}>
				<ScrollView style={styles.scrollView}>
					<Card>
						<Text style={BlogTitle}> Laboratuvar Güvenliği Kaynaklar </Text>
	
						<View style={[styles.htmlViewContainer]}>
							<SafeAreaView showsVerticalScrollIndicator={true}>
							<Text
						style={{color: 'red'}}
						onPress={() => {Linking.openURL('https://hsgm.saglik.gov.tr/tr/tghsldb-yayinlar/laboratuvar-g%C3%BCvenli%C4%9Fi-rehberi.html')}}
					>
					Bu bilgiler Sağlık Bakanlığı tarafından hazırlanan kitaptan alınmıştır.
					{"\n"}
					 Kitaba aşağıdaki linkden ulaşabilirsiniz.		
					{"\n"}
				
					</Text>
												<Text
						style={{color: 'blue'}}
						onPress={() => {Linking.openURL('https://hsgm.saglik.gov.tr/tr/tghsldb-yayinlar/laboratuvar-g%C3%BCvenli%C4%9Fi-rehberi.html')}}
					>
				
			
					https://hsgm.saglik.gov.tr/tr/tghsldb-yayinlar/laboratuvar-g%C3%BCvenli%C4%9Fi-rehberi.html
				
					</Text>
					<Text>	Versiyon: 1.1.4 </Text>
							</SafeAreaView>
						</View>
					</Card>
				</ScrollView>
			</SafeAreaView>








		)
	}
}




const styles = {
	containerTop: {
		flex: 1,
		margin: 10,
		borderRadius: 12,
		overflow: 'hidden',
	},


	BlogTitle: {
		padding: 10,
		justifyContent: "center",
		alignItems: "center",
		fontFamily: 'opensans-bold',
		fontWeight: 'bold',
		fontSize: 18,
		// marginTop: 5,
		// marginBottom: 5,
	},
	htmlViewContainer: {
		padding: 10,
		width: Dimensions.get('window').width - 50,
		fontFamily: 'opensans-semibold',
		fontWeight: 'normal',

		color: "red"
	},
};
