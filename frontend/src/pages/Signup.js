/*
    This file renders the signup page and allows users to input and submit their information
    Users will be routed to Verify.js upon clicking Sign Up!
    Users have the option to login if they have already been verified (they can be routed to Login.js)
*/

//importing necessary libraries
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView
} from 'react-native';
import {login_signup} from '../../src/components';
// import Form from '../components/Form.js'
// import { Actions } from 'react-native-router-flux';


//creating Signup class
export default class Signup extends Component {
    //function to load previous page on a stack
    // goBack() {
    //     Actions.pop();
    // }

    constructor(props) {
        super(props);

        this.state = {
            fName: '',
            lName: '',
            username: '',
            DOB: '',
            phone: '',
            email: '',
            password: '',
            confirmPassword: ''
        };
    }

    // postSignupData() {
    //     console.log('hello');
    //     fetch('http://ec2-13-59-36-193.us-east-2.compute.amazonaws.com:8000/signup', {
    //         method: 'POST',
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             fName: this.state.fName,
    //             lName: this.state.lName,
    //             username: this.state.username,
    //             DOB: this.state.DOB,
    //             email: this.state.email,
    //             password: this.state.password
    //         }),
    //     });
    // }

    //renders form component with signup argument, creates a text and button
    render() {
        // console.log(this.state.fName);
        // console.log(this.state.lName);
        // console.log(this.state.username);
        // console.log(this.state.DOB);
        // console.log(this.state.email);
        // console.log(this.state.password);
        return (
            <React.Fragment>
                <View style={login_signup.formContainer}>
                    <KeyboardAvoidingView style={login_signup.formContainer}>
                        <Text style={login_signup.container}>Sign up for HitchHike!</Text>
                        <TextInput
                            style={login_signup.inputBox} //creating first name text input
                            onChangeText={fName => this.setState({ fName })}
                            underlineColorAndroid="rgba(0,0,0,0)"
                            placeholder="First Name"
                            placeholderTextColor="#ff8700"
                            selectionColor="#fff"
                            keyboardType="default"
                        // onSubmitEditing={(event) => this.updateText(event.nativeEvent.text)}
                        />
                        <TextInput
                            style={login_signup.inputBox} //creating last name text input
                            onChangeText={lName => this.setState({ lName })}
                            underlineColorAndroid="rgba(0,0,0,0)"
                            placeholder="Last Name"
                            placeholderTextColor="#ff8700"
                            selectionColor="#fff"
                            keyboardType="default"
                        // onSubmitEditing={() => this.lName.focus()}
                        />
                        <TextInput
                            style={login_signup.inputBox} //creating username text input
                            onChangeText={username => this.setState({ username })}
                            underlineColorAndroid="rgba(0,0,0,0)"
                            placeholder="Username"
                            placeholderTextColor="#ff8700"
                            selectionColor="#fff"
                            keyboardType="default"
                        // onSubmitEditing={() => this.username.focus()}
                        />
                        <TextInput
                            style={login_signup.inputBox} //creating birthday text input
                            onChangeText={DOB => this.setState({ DOB })}
                            underlineColorAndroid="rgba(0,0,0,0)"
                            placeholder="Birthday: MM/DD/YYYY"
                            placeholderTextColor="#ff8700"
                            selectionColor="#fff"
                            keyboardType="default"
                        // onSubmitEditing={() => this.DOB.focus()}
                        />
                        <TextInput
                            style={login_signup.inputBox} //creating Phone number text input
                            onChangeText={phone => this.setState({ phone })}
                            underlineColorAndroid="rgba(0,0,0,0)"
                            placeholder="Phone Number (Ex:1234567890)"
                            placeholderTextColor="#ff8700"
                            selectionColor="#fff"
                            keyboardType="default"
                        // onSubmitEditing={() => this.username.focus()}
                        />
                        <TextInput
                            style={login_signup.inputBox} //creating email text input
                            onChangeText={email => this.setState({ email })}
                            underlineColorAndroid="rgba(0,0,0,0)"
                            placeholder="Email"
                            placeholderTextColor="#ff8700"
                            selectionColor="#fff"
                            keyboardType="email-address"
                        // onSubmitEditing={() => this.password.focus()}
                        />
                        <TextInput
                            style={login_signup.inputBox} //creating password text input
                            onChangeText={password => this.setState({ password })}
                            underlineColorAndroid="rgba(0,0,0,0)"
                            placeholder="Password"
                            secureTextEntry={true}
                            placeholderTextColor="#ff8700"
                        // ref={input => (this.password = input)}
                        />
                        <TextInput
                            style={login_signup.inputBox} //creating confirm password text input
                            onChangeText={confirmPassword => this.setState({ confirmPassword })}
                            underlineColorAndroid="rgba(0,0,0,0)"
                            placeholder="Confirm Password"
                            placeholderTextColor="#ff8700"
                            secureTextEntry={true}
                        // ref={input => (this.password = input)}
                        />
                    </KeyboardAvoidingView>
                    <TouchableOpacity style={login_signup.button}>
                        <Text style={login_signup.buttonText} onPress={() => {
                            console.log('Signing up');
                            fetch('http://ec2-13-59-36-193.us-east-2.compute.amazonaws.com:8000/signup', {
                                method: 'POST',
                                headers: {
                                    Accept: 'application/json',
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    fName: this.state.fName,
                                    lName: this.state.lName,
                                    username: this.state.username,
                                    DOB: this.state.DOB,
                                    email: this.state.email,
                                    password: this.state.password
                                }),
                            });
                            this.props.navigation.navigate('VerifyRoute')
                        }

                        }>
                            {' '}
                            Sign Up{' '}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={login_signup.signupTextCont}>
                    <Text style={login_signup.signupText}> Already have an account? </Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('LoginRoute')}>
                        <Text style={login_signup.signupButton}> Sign in! </Text>
                    </TouchableOpacity>
                </View>
            </React.Fragment>
        );
    }
}

//adding CSS
// const login_signup = StyleSheet.create({
//     container: {
//         // flex: 1,
//         justifyContent: 'center',
//         textAlign: 'center',
//         backgroundColor: 'white',
//         color: '#ff8700',
//         padding: 10,
//         fontSize: 30,
//     },

//     signupTextCont: {
//         flexGrow: 1,
//         justifyContent: 'center',
//         alignItems: 'flex-end',
//         paddingVertical: 16,
//         flexDirection: 'row',
//     },

//     signupText: {
//         color: '#ff8700',
//         fontSize: 16,
//     },

//     signupButton: {
//         color: '#ff8700',
//         fontSize: 16,
//         fontWeight: '500',
//     },
//     formContainer: {
//         justifyContent: 'center', //centers flex objects
//         alignItems: 'center',
//     },

//     inputBox: {
//         width: 200,
//         height: 30,
//         backgroundColor: '#eeeeee',
//         borderRadius: 25,
//         paddingHorizontal: 16,
//         fontSize: 16,
//         color: '#002f6c',
//         marginVertical: 10,
//     },

//     button: {
//         width: 300,
//         backgroundColor: '#ff8700',
//         borderRadius: 25,
//         marginVertical: 10,
//         paddingVertical: 12,
//     },

//     buttonText: {
//         fontSize: 16,
//         fontWeight: '500',
//         color: '#ffffff',
//         textAlign: 'center',
//     },
// });
