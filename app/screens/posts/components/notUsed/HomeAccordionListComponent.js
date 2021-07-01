import React, { Component } from 'react';
import {
  View,
  StyleSheet
} from 'react-native';



import { Container, Content, Icon, Accordion, Text } from "native-base";


const dataArray = [
  {
    "catid": 1,
    "catTitle": "Uncategorized",
    "posts": [
      {
        "postId": 10534,
        "title": "1.2. Elektrik Şoklarında İlk Yardım"
      },
      {
        "postId": 10546,
        "title": "1.3. Patlamalar ve Yangınlarda İlk Yardım"
      }
    ]
  },
  {
    "catid": 208,
    "catTitle": "Giriş",
    "posts": [
      {
        "postId": 1774,
        "title": "dummy data"
      }
    ]
  },
  {
    "catid": 209,
    "catTitle": "LABORATUVAR KAZALARI ve İLK YARDIM",
    "posts": [
      {
        "postId": 10504,
        "title": "1. LABORATUVAR KAZALARI ve İLK YARDIM"
      },
      {
        "postId": 10522,
        "title": "1.1. Fiziksel Şoklarda İlk Yardım"
      }
    ]
  },
  {
    "catid": 210,
    "catTitle": "RİSK YÖNETİMİ",
    "posts": [
      {
        "postId": 10582,
        "title": "RİSK YÖNETİMİ giriş"
      },
      {
        "postId": 10604,
        "title": "2.1. Risk Yönetimi"
      }
    ]
  }
];

export default class HomeAccordionListComponent extends Component {


  static navigationOptions = {
    tabBarVisible: true,
    title: 'İçerikler',
    headerStyle: {
      backgroundColor: '#03A9F4',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  constructor(props) {
    super(props);

  }



  _renderHeader(item, expanded) {
    return (
      <View style={{
        flexDirection: "row",
        padding: 10,
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#A9DAD6"
      }}>
        <Text style={{ fontWeight: "600" }}>
          {" "}{item.catTitle}
        </Text>
        {expanded
          ? <Icon style={{ fontSize: 18 }} name="remove-circle" />
          : <Icon style={{ fontSize: 18 }} name="add-circle" />}
      </View>
    );
  }
  _renderContent(items) {
    let i = 0;
    var rows = [];
    items.posts.forEach(function (item) {
      rows.push(

        <Text key={i++}
          style={{
            backgroundColor: "#e3f1f1",
            padding: 10,
            fontStyle: "italic",
          }}
        >{item.title}</Text>

      );
    })

    return <View>{rows}</View>;
  }



  render() {


console.log (this.props.data)
 
    return (
      <Container>

        <Content padder style={{ backgroundColor: "white" }}>
          <Accordion
            dataArray={this.props.data}
            animation={true}
            expanded={true}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
          />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});





