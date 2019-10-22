//importing necessary libraries
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import Form from '../components/Form.js'
import { Actions } from 'react-native-router-flux';

//creating Signup class
export default class Signup extends Component {
    //function to load previous page on a stack
    goBack() {
        Actions.pop()
    }

    //renders form component with signup argument, creates a text and button
    render() {
        return (
            <View style={styles.container}>
                <Text>{'\n'}</Text>
                <Text>{'\n'}</Text>
                <Form type="Signup" />
                <View style={styles.signupTextCont}>
                    <Text style={styles.signupText}> Already have an account? </Text>
                    <TouchableOpacity onPress={this.goBack}><Text style={styles.signupButton}> Sign in! </Text></TouchableOpacity>
                </View>
            </View>

        )
    }
}

//adding CSS
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },

    signupTextCont: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingVertical: 16,
        flexDirection: 'row'
    },

    signupText: {
        color: '#12799f',
        fontSize: 16
    },

    signupButton: {
        color: '#12799f',
        fontSize: 16,
        fontWeight: '500'
    }
})

