import React from 'react';
import { View, Text } from 'react-native';

import { Button as ButtonN, Icon, Badge, Footer, FooterTab ,Container} from 'native-base';

export default class BlogListFooter extends React.Component {
    render() {
        const { likeCtrl, commentCtrl } = this.props;
        return (
           
    
             <FooterTab>

<ButtonN badge vertical>
                        <Badge><Text>{commentCtrl} </Text></Badge>
                        <Icon style={styles.title} name="text" />
                        <Text style={styles.title} >Yorumlar</Text>
                    </ButtonN>

                    <ButtonN badge vertical>
                        <Badge><Text>{likeCtrl} </Text></Badge>
                        <Icon style={styles.title} name="heart" />
                        <Text style={styles.title} >Beğeniler</Text>
                    </ButtonN>

                    <ButtonN vertical onPress={this.props.onPress}  >
                        <Icon name="arrow-back" />
                        <Text style={styles.title}>Geri dön</Text>
                    </ButtonN>

     
             </FooterTab>



        );
    }
}



const styles = {
    title: { 
        color: "#fff" 
    },
}