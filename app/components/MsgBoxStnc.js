import React, { Component } from 'react';

import { View, Text, StyleSheet } from 'react-native';

class MsgBoxStnc extends React.Component {

    render() {
        return (
            <View style={styles.content}>
                <View style={[styles.messageBox]}>
                    <View>
                        <Text style={styles.messageBoxTitleText}>{this.props.msgTitle}</Text>
                    </View>
                    <View>
                        <Text style={styles.messageBoxBodyText}>{this.props.msg}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

export default MsgBoxStnc;

var styles = StyleSheet.create({

    content: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    messageBox: {
        backgroundColor: '#ef553a',
        width: 300,
        paddingTop: 10,
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 10
    },
    messageBoxTitleText: {
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 10
    },
    messageBoxBodyText: {
        color: '#fff',
        fontSize: 16
    }
});