//Your part Harshitha
import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage, Keyboard, Button } from 'react-native';
// import {createAppContainer} from 'react-navigation';
// import {createStackNavigator} from 'react-navigation-stack';
import {Actions} from 'react-native-router-flux';

//import Form from '../components/Form';

export default class Login extends Component {

    signup() {
        Actions.signup()
    }
    constructor(props) {
        super(props);
        this.state = { user: '' };
        this.state = { pass: '' };
    }
    render() {

        return (
            <React.Fragment>
                <View style={styles.container}>
                    <TextInput style={styles.inputBox} //creating email text input
                        onChangeText={(email) => this.setState({ email })}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        placeholder="Username"
                        placeholderTextColor="#ff8700"
                        selectionColor="#fff"
                        keyboardType="Username"
                        onSubmitEditing={() => this.password.focus()} />
                    <TextInput style={styles.inputBox} //creating password text input
                        onChangeText={(password) => this.setState({ password })}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        placeholder="Password"
                        secureTextEntry={true}
                        placeholderTextColor="#ff8700"
                        ref={(input) => this.password = input}
                    />
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText} onPress={this.saveData}> Login {this.props.type} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('SignupRoute')}>
                        <Text style={styles.buttonText}> Sign Up! {this.props.type} </Text>
                    </TouchableOpacity>
                    {/* <Button
                        style={styles.button1} 
                        title="Sign Up!"
                        onPress={() => this.props.navigation.navigate('SignupRoute')}
                    /> */}
                </View>
            </React.Fragment>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },

    inputBox: {
        width: 300,
        backgroundColor: '#fffdd0',
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#002f6c',
        marginVertical: 10,
        textAlign: 'center'
    },

    button: {
        width: 300,
        backgroundColor: '#ff8700',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 12
    },
    button1: {
        width: 300,
        backgroundColor: '#fffdd0',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 12
    },

    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    },
    buttonText1: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ff8700',
        textAlign: 'center'
    }
});
