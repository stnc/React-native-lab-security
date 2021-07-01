import React, { Component } from 'react';
import {  TextInput, View,  KeyboardAvoidingView } from 'react-native';
import {  Icon,  Text  } from 'native-base';


import { Button,  Block  } from './../../../components/elements';



export default class CommentAdd extends Component {
    render() {
        return ( <Block>
            <View style={cStyles.inputContainer}>
                <Text style={[cStyles.inputLabel, cStyles.inputSpace]}> Yorumlar </Text>
                {/* <TextInput
        style={[cStyles.inputSpace,  {backgroundColor:"#EDF1F7",height:100,padding:8}]}
        textStyle={{
            paragraph: {
                fontFamily: 'opensans-regular',
                fontWeight: 'normal',
            }
        }}
        placeholder='Write your comment'
  
    /> */}

                <KeyboardAvoidingView behavior='position'>
                    <View style={[cStyles.container, { backgroundColor: "#EDF1F7", height: 100, padding: 8 }]}>

                        <TextInput
                            placeholder="Add a comment..."
                            // keyboardType="twitter" // keyboard with no return button
                            autoFocus={true} // focus and show the keyboard
                            style={[cStyles.input, cStyles.inputSpace]}
                            value=""
                            // onBlur={Keyboard.dismiss}//Dismiss the keyboard when text input loses focus


                            onChangeText={this.onChangeText} // handle input changes
                            onSubmitEditing={this.onSubmitEditing} // handle submit event
                        />

                        <Button onPress={this.submit} iconLeft large dark>
                            <Icon name='arrow-back' />
                            <Text>Gönder</Text>
                        </Button>

                    </View>
                </KeyboardAvoidingView>
            </View>
        </Block>
        )
    }
}




//not used --- delete
const cStyles = {
    container: {
        backgroundColor: '#FFF',
        flexDirection: 'row',
        borderTopWidth: 1,
        borderColor: '#EEE',
        alignItems: 'center',
        paddingLeft: 15,
    },
    containerNotUSED: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        margin: 0,
        padding: 0,
        marginHorizontal: 0,
    },
    authorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 0,
    },
    activityContainer: {
        marginTop: 24,
    },
    activityAuthoring: {
        flex: 1,
    },
    commentLabel: {

        fontFamily: 'opensans-semibold',
        fontWeight: 'normal',
        color: '#b2bec3',

    },
    commentLabelContainer: {
        marginLeft: 8,
        marginRight: 32,
        marginTop: 14,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: 10
    },
    moreIcon: {
        width: 18,
        height: 18,
        // tintColor: theme['text-hint-color'],
    },
    repliesList: {
        alignSelf: 'stretch',
        marginTop: 24,
    },
    inputSpace: {
        marginHorizontal: 24,

    },
    inputContainer: {
        marginTop: 5,
        marginBottom: 20,
        marginLeft: 15,
        marginRight: 15
    },
    inputLabel: {
        marginBottom: 8,
        fontFamily: 'opensans-semibold',
        fontWeight: 'normal',
    },
    input: {
        flex: 1,
        fontSize: 15,
    },
};
