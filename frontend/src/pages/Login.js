/*
    File for rendering and adding functionality to the login page
    Will allow verified users to login with the username and password they signed up with
    Has an option for new users to signup before logging in (user will be routed to Signup.js)
    Once logged in, user will be routed to Home.js
*/


//Importing neccesary libraries for Login.js
import React, { Component } from 'react';
import { AsyncStorage, Image, KeyboardAvoidingView, } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { myRides, theme } from '../pages/Styles';

export default class Login extends Component {

    //Constructor keeping track of state
    constructor(props) {
        console.disableYellowBox = true,
            super(props);
        this.state = {
            username: '',
            password: ''
        };
    }

    //Rendering Login Page
    render() {
        return (
            <React.Fragment>
                <KeyboardAvoidingView style={myRides.container}
                    //This view prevents the keyboard from blocking the react components
                    behavior="padding">


                    <Image
                        //adding HitchHike logo
                        style={{
                            height: '35%',
                            width: '70%'
                        }}
                        source={require('../../assets/HitchHike.png')}
                        resizeMode="contain" />


                    <TextInput style={myRides.inputBox}
                        //text input for username
                        dense={true}
                        theme={theme}
                        mode={'outlined'}
                        value={this.state.username}
                        label={'Username'}
                        onChangeText={(username) => this.setState({ username })}
                        keyboardType="default"
                        autoCapitalize="none"
                    />

                    <TextInput style={myRides.inputBox}
                        //text input for password
                        dense={true}
                        theme={theme}
                        mode={'outlined'}
                        value={this.state.password}
                        label={'Password'}
                        onChangeText={(password) => this.setState({ password })}
                        secureTextEntry={true}
                        autoCapitalize="none"
                    />

                    <Button
                        //button for logging in
                        mode="contained"
                        style={myRides.inputBox}
                        loading={this.state.loading}
                        theme={{
                            colors: {
                                primary: '#ff8700',
                                text: "#000000"
                            },
                            dark: false
                        }
                        }
                        title={"Log In"}

                        /*
                            backend request for logging in
                            utilizes the fetch API to send username and password to the backend
                            verification also takes place in the backend to check if the username and password are valid
                            Async storage library also utilized when valid user signs in to the app in order to preserve state
                            upon clicking, if valid user credentials, page routes to ViewRides.js
                        */

                        onPress={() => {
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

                                if (!response.success) {
                                    alert("Invalid username or password! Please try again.");
                                } else {
                                    //stringify user object
                                    AsyncStorage.setItem('user', JSON.stringify(response));
                                    this.props.navigation.navigate('HomeRoute')
                                }
                            });
                        }
                        }>
                        {label = "Log In"}
                    </Button>

                    <Button onPress={() => this.props.navigation.navigate('SignupRoute')}
                        //button for signing up, will route user to Signup.js
                        mode="contained"
                        style={myRides.inputBox}
                        loading={this.state.loading}
                        theme={{
                            colors: {
                                primary: '#ff8700'
                            }
                        }
                        }
                        title={"Sign up"}>
                        {label = "Sign up"}
                    </Button>
                </KeyboardAvoidingView>
            </React.Fragment>
        );
    }
}
