import React, { Component } from 'react';
import { View, Text, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import { Card } from 'native-base';
// import produce from 'immer';

// constructor()
// render
// componentDidMount()

export default  class AboutComponentGiris extends Component {


	render() {
		// console.log(this.state)
		const { BlogTitle } = styles;
		// console.log("render")
		return (

			<SafeAreaView style={styles.containerTop}>
				<ScrollView style={styles.scrollView}>
					<Card>
						<Text style={BlogTitle}> Laboratuvar Güvenliği  Hakkında </Text>
	
						<View style={[styles.htmlViewContainer]}>
							<SafeAreaView showsVerticalScrollIndicator={true}>
								<Text style={{ color: "#000", }}> 		
								Bu uygulama ülkemizde laboratuvarda çalışan araştırmacıların laboratuvar güvenliği konusunda gerekli bilgiye sahip olmaları amacıyla hazırlanmıştır. 
								Ülkemizdeki üniversitelerde ve hastanelerde bulunan laboratuvarlarda çok sayıda araştırmacı çalışmakta olup gerekli laboratuvar kurallarının bu araştırmacılar 
								tarafından bilinmesi ve uygulanması zorunludur. 
								Fakat bazı kurumlarda laboratuvar güvenliği eğitimi verilmemektedir ya da verilen güvenlik eğitimleri yeterli/etkili olmadığı durumlar söz konusudur.
								{"\n"}
								 {"\n"}
								 Yılda sadece 1 kez verilen laboratuvar güvenliği eğitimleri de yeterli değildir. 
								 Ara dönemlerde laboratuvarlara araştırmacı olarak gelen kişilerin de çalışmalarına başlamadan önce bu eğitimi alması ve çalışmalarını güvenlik kuralları 
								 dâhilinde gerçekleştirmesi gerekmektedir. 
								 Bu uygulama sayesinde gerekli görülen her dönemde eğitimlere kolay ulaşım sağlanmış olacaktır.
								 {"\n"}
								 {"\n"}
Laboratuvar güvenliği eğitimleri; araştırmacının, araştırma sırasında laboratuvarda bulunan diğer kişilerin, araştırma yapılan kurumun, 
aynı zamanda da çalışmanın güvenliğini sağlamak açısından çok önemlidir. Bu uygulamada gerekli laboratuvar güvenliği kurallarını yazılı ve 
video olarak 7 farklı bölüme ayrılmış şekilde bulabilirsiniz.
{"\n"}
{"\n"}
Uygulamada yer alan laboratuvar güvenliği konuları hakkında sağlanmış olan metin ve video içerikleri incelendikten sonra 
kullanıcılara kendilerini test etme imkânı sağlamak için quiz soruları hazırlanmıştır. Araştırmacıların öğrendiklerini 
değerlendirmesi ve bilgilerini pekiştirmesi amaçlanmıştır. Soruların doğru cevapları soruya yanıt verildiği anda ekranda belirecektir. 
İstenilirse metin/video içerikleri okunmadan/izlenmeden de quiz soruları çözülebilir. 
Bu sayede araştırmacı eksik olduğu konuyu tespit edip sadece o konu ile ilgili içerikleri inceleyebilir.
{"\n"}
{"\n"}
Uygulama içerisinde bulunan yazılı metinler 2019 yılında T.C.Sağlık Bakanlığı Halk Sağlığı Müdürlüğü tarafından hazırlanan “Laboratuvar Güvenliği El Kitabı”ndan alınmıştır. 
Videolar ise biyogüvenlik uzmanları tarafından konu ile alakalı verilen eğitimlerdir. Her bölümün sonunda yer alan quiz soruları yine uzmanlarca hazırlanmıştır.



								</Text>
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
