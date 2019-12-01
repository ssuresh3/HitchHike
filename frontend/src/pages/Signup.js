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
    KeyboardAvoidingView
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import Form from '../components/Form.js'
// import { Actions } from 'react-native-router-flux';
import { TextInput, Button } from 'react-native-paper';
import {myRides, theme, login_signup} from '../pages/Styles';
//creating Signup class
export default class Signup extends Component {
    //constructor
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
                {/* <View style={styles.formContainer}> */}
                <KeyboardAwareScrollView
                    contentContainerStyle={myRides.container}
                >
                {/* <KeyboardAvoidingView style={styles.container}
                    behavior="padding"> */}
                    <Text style={myRides.containerTwo}>Sign up for HitchHike!</Text>
                    <TextInput
                        style={myRides.inputBox} //creating first name text input
                        onChangeText={fName => this.setState({ fName })}
                        underlineColorAndroid="rgba(0,0,0,0)"
                        placeholder="First Name"
                        placeholderTextColor="#ff8700"
                        selectionColor="#fff"
                        keyboardType="default"
                    // onSubmitEditing={(event) => this.updateText(event.nativeEvent.text)}
                    />
                    <TextInput
                        style={myRides.inputBox} //creating last name text input
                        onChangeText={lName => this.setState({ lName })}
                        underlineColorAndroid="rgba(0,0,0,0)"
                        placeholder="Last Name"
                        placeholderTextColor="#ff8700"
                        selectionColor="#fff"
                        keyboardType="default"
                    // onSubmitEditing={() => this.lName.focus()}
                    />
                    <TextInput
                        style={myRides.inputBox} //creating username text input
                        onChangeText={username => this.setState({ username })}
                        underlineColorAndroid="rgba(0,0,0,0)"
                        placeholder="Username"
                        placeholderTextColor="#ff8700"
                        selectionColor="#fff"
                        autoCapitalize="none"
                        keyboardType="default"
                    // onSubmitEditing={() => this.username.focus()}
                    />
                    <TextInput
                        style={myRides.inputBox} //creating birthday text input
                        onChangeText={DOB => this.setState({ DOB })}
                        underlineColorAndroid="rgba(0,0,0,0)"
                        placeholder="Birthday: MM/DD/YYYY"
                        placeholderTextColor="#ff8700"
                        selectionColor="#fff"
                        keyboardType="default"
                    // onSubmitEditing={() => this.DOB.focus()}
                    />
                    <TextInput
                        style={myRides.inputBox} //creating Phone number text input
                        onChangeText={phone => this.setState({ phone })}
                        underlineColorAndroid="rgba(0,0,0,0)"
                        placeholder="Phone Number (Ex:1234567890)"
                        placeholderTextColor="#ff8700"
                        selectionColor="#fff"
                        keyboardType="numeric"
                    // onSubmitEditing={() => this.username.focus()}
                    />
                    <TextInput
                        style={myRides.inputBox} //creating email text input
                        onChangeText={email => this.setState({ email })}
                        underlineColorAndroid="rgba(0,0,0,0)"
                        placeholder="Email"
                        placeholderTextColor="#ff8700"
                        selectionColor="#fff"
                        autoCapitalize="none"
                        keyboardType="email-address"
                    // onSubmitEditing={() => this.password.focus()}
                    />
                    <TextInput
                        style={myRides.inputBox} //creating password text input
                        onChangeText={password => this.setState({ password })}
                        underlineColorAndroid="rgba(0,0,0,0)"
                        placeholder="Password"
                        secureTextEntry={true}
                        autoCapitalize="none"
                        placeholderTextColor="#ff8700"
                    // ref={input => (this.password = input)}
                    />
                    <TextInput
                        style={myRides.inputBox} //creating confirm password text input
                        onChangeText={confirmPassword => this.setState({ confirmPassword })}
                        underlineColorAndroid="rgba(0,0,0,0)"
                        placeholder="Confirm Password"
                        placeholderTextColor="#ff8700"
                        autoCapitalize="none"
                        secureTextEntry={true}
                    // ref={input => (this.password = input)}
                    />
                    {/* </KeyboardAvoidingView> */}
                    {/* <TouchableOpacity style={myRides.button}> */}
                        <Button style={myRides.inputBox} onPress={() => {
                            if(this.state.fName.length == 0){
                                alert("Enter your first name!");
                            } else if(this.state.lName.length == 0){
                                alert("Enter your last name!");
                            } else if(this.state.username.length < 5){
                                alert("Username too short! Please try again.");
                            } else if(this.state.DOB.length != 10){
                                alert("DOB is incorrect format! Please try again."); 
                            } else if(this.state.phone.length != 10){
                                alert("Phone number is incorrect format! Please try again.");    
                            } else if(!this.state.email.includes("ucsc")){
                                alert("Please enter a ucsc email!");
                            } else if(this.state.password.length == 0){
                                alert("Please enter a password!");
                            } else if (this.state.password != this.state.confirmPassword) {
                                // console.log(alert)
                                alert("Passwords don't match! Please try again.");
                            } else {
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
                        }
                        }
                        mode="contained"
                        style={myRides.inputBox}
                        loading={this.state.loading}
                        theme= {{
                            colors: {
                                primary: '#ff8700'
                            }
                        }
                    }
                        >
                            {label = "Sign Up"}
                        </Button>
                    {/* </TouchableOpacity> */}
                    <Button style={myRides.inputBox} 
                        onPress={() => this.props.navigation.navigate('LoginRoute')}
                        mode="contained"
                        style={myRides.inputBox}
                        loading={this.state.loading}
                        theme= {{
                            colors: {
                                primary: '#ff8700'
                            }
                        }
                    }
                        >
                            {label = "Sign In"}
                        </Button>
                </KeyboardAwareScrollView>
            </React.Fragment>
        );
    }
}
//adding CSS
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