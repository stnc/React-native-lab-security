import React, { Component } from 'react';

import { View, Text, Dimensions, SafeAreaView,ScrollView } from 'react-native';
import { Card} from 'native-base';


export default class AboutComponentOnsoz extends Component {
	render() {
	const { BlogTitle } = styles;
	return (
	 <SafeAreaView style={styles.containerTop}>
      <ScrollView style={styles.scrollView}>
				<Card>
					<Text style={BlogTitle}>ÖNSÖZ</Text>
					{/* <Text > {this.state.user.age}</Text>
					<Text> {this.state.group_answers0Style}</Text> */}
					<View style={[styles.htmlViewContainer]}>
						<SafeAreaView showsVerticalScrollIndicator={true}>
							<Text style={{ color: "#000", }}>

								Halk sağlığının korunması ve sürdürülebilmesi için laboratuvar tarafından gerçekleştirilen analiz hizmeti büyük önem taşımaktadır.
{"\n"}
								Analiz hizmeti veren bir laboratuvarın kısa zamanda, doğru ve güvenilir sonuç elde etmesi, kalifiye personel çalıştırması ve yeterliliğinin tanımlanması
								yanında laboratuvar çalışanının ve çevrenin güvenliğinin sağlanması gerekmektedir.
{"\n"}
								Laboratuvar güvenliği; laboratuvar çalışanına, ortamına, diğer kişilere ve çevreye zarar verebilecek fiziksel,
								kimyasal, mikrobiyolojik ve radyoaktif tehlikelerin olumsuz sonuçlara sebep vermemesi için bu tehlikelerden kaynaklanan
risklerin ortadan kaldırılmasını veya en aza indirilmesini sağlayan bir tür risk yönetimi olarak tanımlanabilir. {"\n"}

								Laboratuvardaki risk yönetimi ile insan ve çevre güvenliğinin sağlanması için kontrol önlemleri alınmalıdır.
{"\n"}
								{"\n"}
								Kontrol önlemleri içerisinde mühendislik, kişisel koruyucu donanım ve yönetsel kontroller bulunmalıdır.
{"\n"}
								{"\n"}
								Bu kitap, laboratuvarlarda yürütülen kimyasal ve mikrobiyolojik analiz hizmetleri sırasında insan ve çevrenin her türlü tehlike ve kazalardan korunmasını ve risklerin azaltılmasını sağlamak
{"\n"}
								yanında Tüketici Güvenliği ve Halk Sağlığı Laboratuvarları Dairesi Başkanlığı’nın laboratuvar güvenliği ile ilgili uygulamalarını belirlemek amacıyla tüm personeli kapsayacak şekilde hazırlanmıştır.
{"\n"}{"\n"}

								Bu kitabı hazırlayan yazarlara ve çalışmada emeği geçen herkese teşekkür eder, kitabın okuyanlara yararlı olmasını dilerim.
								{"\n"}{"\n"}
								Prof. Dr. Emine ALP MEŞE
{"\n"}Bakan Yardımcısı
								
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
