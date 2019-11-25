/*
    File for rendering and adding functionality to the login page
    Will allow verified users to login with the username and password they signed up with
    Has an option for new users to signup before logging in (user will be routed to Signup.js)
    Once logged in, user will be routed to Home.js
*/

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    AsyncStorage,
    Keyboard,
    Button,
    Image,
    KeyboardAvoidingView,
    ScrollView,
    SafeAreaView
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { FlatList } from 'react-native-gesture-handler';
// import { ScrollView } from 'react-native-gesture-handler';
// import {createAppContainer} from 'react-navigation'; import
// {createStackNavigator} from 'react-navigation-stack'; import { Actions } from
// 'react-native-router-flux'; import Signup from '../pages/Signup'; import
// Form from '../components/Form';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }

    render() {
        return (
            <React.Fragment>
                {/* <SafeAreaView>
                    <FlatList> */}
                        {/* KeyboardAwareScrollView messes with the logo rendering */}
                        <KeyboardAvoidingView style={styles.container}
                            behavior="padding">

                            {/* <KeyboardAwareScrollView
                    contentContainerStyle={styles.container}
                    resetScrollToCoords={{ x: 0, y: 0 }}
                    scrollEnabled={true}> */}
                            {/* <View style={styles.container}> */}
                            <Image
                                style={{
                                    height: '35%',
                                    width: '70%'
                                }}
                                source={require('../../assets/HitchHike.png')}
                                resizeMode="contain" />
                            <Text style={styles.containerTwo}>Log in to HitchHike!</Text>
                            <TextInput style={styles.inputBox} //creating email text input
                                onChangeText={(username) => this.setState({ username })}
                                underlineColorAndroid='rgba(0,0,0,0)'
                                placeholder="Username"
                                placeholderTextColor="#ff8700"
                                selectionColor="#fff"
                                keyboardType="default"
                                autoCapitalize="none"
                                onSubmitEditing={() => this.password.focus()} />
                            <TextInput style={styles.inputBox} //creating password text input
                                onChangeText={(password) => this.setState({ password })}
                                underlineColorAndroid='rgba(0,0,0,0)'
                                placeholder="Password"
                                secureTextEntry={true}
                                placeholderTextColor="#ff8700"
                                autoCapitalize="none"
                                ref={(input) => this.password = input}
                            />

                            <TouchableOpacity style={styles.button}>
                                <Text
                                    style={styles.buttonText}
                                    onPress={() => {
                                        console.log('login');
                                        fetch('http://ec2-13-59-36-193.us-east-2.compute.amazonaws.com:8000/login', {
                                            method: 'POST',
                                            headers: {
                                                Accept: 'application/json',
                                                'Content-Type': 'application/json'
                                            },
                                            body: JSON.stringify({
                                                username: this.state.username,
                                                password: this.state.password
                                            }),
                                        }).then(response => response.json()).then(response => {
                                            console.log(response)
                                            // console.log("test")
                                            if (!response.success) {
                                                console.log("enter if false")
                                                alert("Invalid username or password! Please try again.");
                                                // console.log("Kailas is smart");
                                            } else {
                                                console.log("enter if true")
                                                //stringify user object
                                                AsyncStorage.setItem('user', JSON.stringify(response));
                                                // AsyncStorage.setItem(this.username, response);
                                                this.props.navigation.navigate('HomeRoute')
                                            }
                                        });
                                    }
                                    }>
                                    Login
                        </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('SignupRoute')}>
                                <Text style={styles.buttonText}> Sign Up </Text>
                            </TouchableOpacity>
                            {/* <Button
                        style={styles.button1}
                        title="Sign Up!"
                        onPress={() => this.props.navigation.navigate('SignupRoute')}
                    /> */}
                            {/* </View> */}
                            {/* </KeyboardAwareScrollView> */}

                        </KeyboardAvoidingView>
                    {/* </FlatList>
                </SafeAreaView> */}
            </React.Fragment>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },

    containerTwo: {
        // flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: 'white',
        color: 'black',
        padding: 40,
        fontSize: 30
    },

    inputBox: {
        width: 300,
        backgroundColor: '#eeeeee',
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
